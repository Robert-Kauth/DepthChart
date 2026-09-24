import os
import random
import subprocess
import sys
from pathlib import Path

import pytest
import sqlalchemy as sa
from faker import Faker

from app.config import database_url
from app.models import Channel, Message, Server, User, User_server, db
from app.socket import sio

ROOT = Path(__file__).resolve().parents[1]


def test_serves_react_app_for_unknown_paths(client):
    for path in ("/", "/servers/1", "/login"):
        res = client.get(path)
        assert res.status_code == 200
        assert b"<div id='root'></div>" in res.data
        res.close()
    res = client.get("/favicon.ico")
    assert res.data == b"icon"
    res.close()


def test_https_redirect_in_production(client, monkeypatch):
    monkeypatch.setenv("FLASK_ENV", "production")
    res = client.get("/api/auth/", headers={"X-Forwarded-Proto": "http"})
    assert res.status_code == 301
    assert res.headers["Location"].startswith("https://")
    assert client.get("/api/auth/", headers={"X-Forwarded-Proto": "https"}).status_code == 200


def test_socketio_chat_broadcast(app):
    first = sio.test_client(app)
    second = sio.test_client(app)
    assert first.is_connected() and second.is_connected()

    first.emit("chat", {"msg": "hello"})
    received = second.get_received()
    assert [(r["name"], r["args"]) for r in received] == [("chat", [{"msg": "hello"}])]
    first.disconnect()
    second.disconnect()


def test_socketio_rooms(app):
    client = sio.test_client(app)
    client.emit("join", {"username": "demo", "room": "lobby"})
    assert client.get_received()[0]["args"] == "demo has entered the room"
    client.emit("leave", {"username": "demo", "room": "lobby"})
    assert client.get_received() == []
    client.disconnect()


def test_seed_all_and_undo(app):
    random.seed(1234)
    Faker.seed(1234)
    runner = app.test_cli_runner()

    result = runner.invoke(args=["seed", "all"])
    assert result.exception is None, result.output
    with app.app_context():
        assert db.session.query(User).count() == 25
        assert db.session.query(Server).count() == 50
        assert db.session.query(User_server).count() == 500
        assert db.session.query(Channel).count() == 300
        assert db.session.query(Message).count() > 0
        demo = db.session.query(User).filter_by(email="demo@aa.io").one()
        assert demo.check_password("password")

    result = runner.invoke(args=["seed", "undo"])
    assert result.exception is None, result.output
    with app.app_context():
        for model in (User, Server, User_server, Channel, Message):
            assert db.session.query(model).count() == 0


@pytest.fixture
def migrate_db_url():
    url = sa.engine.make_url(database_url(os.environ["DATABASE_URL"]))
    name = f"{url.database}_migrations"
    admin = sa.create_engine(url.set(database="postgres"), isolation_level="AUTOCOMMIT")
    with admin.connect() as conn:
        conn.execute(sa.text(f'DROP DATABASE IF EXISTS "{name}"'))
        conn.execute(sa.text(f'CREATE DATABASE "{name}"'))
    yield url.set(database=name)
    with admin.connect() as conn:
        conn.execute(sa.text(f'DROP DATABASE IF EXISTS "{name}" WITH (FORCE)'))
    admin.dispose()


def run_flask(url, *args):
    env = {**os.environ, "DATABASE_URL": url.render_as_string(hide_password=False), "FLASK_APP": "app"}
    result = subprocess.run([sys.executable, "-m", "flask", *args],
                            cwd=ROOT, env=env, capture_output=True, text=True)
    assert result.returncode == 0, result.stderr
    return result


def test_migrations_upgrade_to_head(migrate_db_url):
    # Only upgrade is exercised: an early migration drops an unnamed foreign
    # key, so downgrading all the way to base has never worked.
    run_flask(migrate_db_url, "db", "upgrade")
    engine = sa.create_engine(migrate_db_url)
    tables = set(sa.inspect(engine).get_table_names())
    engine.dispose()
    assert {"users", "servers", "user_servers", "channels", "messages", "chats", "followers"} <= tables
    assert "(head)" in run_flask(migrate_db_url, "db", "current").stdout
