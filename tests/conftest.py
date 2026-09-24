import os

import pytest
from flask.testing import FlaskClient

# The app reads its config from the environment at import time, so these must
# be set before `app` is imported. Point TEST_DATABASE_URL at a disposable
# Postgres database: every test drops and recreates all tables.
os.environ["DATABASE_URL"] = os.environ.get(
    "TEST_DATABASE_URL", "postgresql://postgres@localhost:5432/depthchart_test")
os.environ.setdefault("SECRET_KEY", "test-secret-key")
os.environ.pop("FLASK_ENV", None)

from app import app as flask_app  # noqa: E402
from app.models import db  # noqa: E402


class BrowserClient(FlaskClient):
    """
    Test client that behaves like the frontend's csrfFetch: it echoes the
    csrf_token cookie back in the X-CSRFToken header.
    """

    def open(self, *args, **kwargs):
        cookie = self.get_cookie("csrf_token")
        # Redirects are replayed with an EnvironBuilder; leave those alone
        if cookie is not None and args and isinstance(args[0], str):
            headers = dict(kwargs.pop("headers", None) or {})
            headers.setdefault("X-CSRFToken", cookie.value)
            kwargs["headers"] = headers
        return super().open(*args, **kwargs)


@pytest.fixture
def app(tmp_path):
    # Stand-in for the Vite build that Docker copies into app/static
    (tmp_path / "index.html").write_text("<div id='root'></div>")
    (tmp_path / "favicon.ico").write_bytes(b"icon")
    flask_app.config.update(TESTING=True)
    flask_app.test_client_class = BrowserClient
    flask_app.static_folder = str(tmp_path)

    # Requests push their own app context; holding one open across the test
    # would share flask.g (and Flask-WTF's cached CSRF token) between clients.
    with flask_app.app_context():
        db.drop_all()
        db.create_all()
    yield flask_app
    with flask_app.app_context():
        db.drop_all()


@pytest.fixture
def client(app):
    client = app.test_client()
    # Any response sets the csrf_token cookie the API forms read back
    client.get("/api/auth/")
    return client


def signup(client, username="demo", email="demo@aa.io", password="password", avatar=""):
    return client.post("/api/auth/signup", json={
        "username": username,
        "email": email,
        "password": password,
        "avatar": avatar,
    })


@pytest.fixture
def user(client):
    res = signup(client)
    assert res.status_code == 200
    return res.get_json()


@pytest.fixture
def other_user(app):
    """A second user created in a separate client session."""
    other = app.test_client()
    other.get("/api/auth/")
    res = signup(other, username="marnie", email="marnie@aa.io")
    assert res.status_code == 200
    return res.get_json()


@pytest.fixture
def server(client, user):
    res = client.post("/api/servers/", json={
        "name": "Fantasy League",
        "topic": "All things football",
        "icon": "https://example.com/icon.png",
    })
    assert res.status_code == 200
    return res.get_json()


@pytest.fixture
def channel(client, server):
    res = client.post("/api/channels/", json={
        "name": "Waiver Watch",
        "server_id": server["id"],
        "topic": "Who to pick up",
        "icon": "https://example.com/channel.png",
    })
    assert res.status_code == 200
    return res.get_json()
