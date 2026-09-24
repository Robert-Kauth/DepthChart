import pytest
from flask.testing import FlaskClient

from conftest import signup


@pytest.fixture
def forger(app, client, user):
    """
    A client holding the logged-in user's cookies (as a browser does when
    another site submits a request to this one) that never sends the
    X-CSRFToken header, because another site cannot read the cookie.
    """
    raw = FlaskClient(app, app.response_class, use_cookies=True)
    for name in ("session", "csrf_token"):
        raw.set_cookie(name, client.get_cookie(name).value)
    return raw


def test_csrf_cookie_is_readable_by_the_frontend(app):
    res = app.test_client().get("/api/auth/")
    cookie = res.headers["Set-Cookie"]
    assert cookie.startswith("csrf_token=")
    assert "HttpOnly" not in cookie


def test_csrf_cookie_is_strict_and_secure_in_production(app, monkeypatch):
    monkeypatch.setenv("FLASK_ENV", "production")
    res = app.test_client().get("/api/auth/", headers={"X-Forwarded-Proto": "https"})
    cookie = res.headers["Set-Cookie"]
    assert "Secure" in cookie and "SameSite=Strict" in cookie


def test_request_with_cookies_but_no_header_is_rejected(client, forger, server):
    assert forger.get("/api/auth/").get_json()["username"] == "demo"

    res = forger.delete(f"/api/servers/{server['id']}")
    assert res.status_code == 400
    assert res.get_json() == {"errors": ["csrf_token : The CSRF token is missing."]}

    res = forger.post("/api/servers/", json={"name": "Forged server", "topic": "Forged topic"})
    assert res.status_code == 400
    assert list(client.get("/api/servers/").get_json()) == [str(server["id"])]


def test_forged_token_is_rejected(forger, server):
    res = forger.delete(f"/api/servers/{server['id']}", headers={"X-CSRFToken": "forged"})
    assert res.status_code == 400
    assert res.get_json() == {"errors": ["csrf_token : The CSRF token is invalid."]}


def test_token_from_another_session_is_rejected(app, client, forger, server):
    other = app.test_client()
    other.get("/api/auth/")
    token = other.get_cookie("csrf_token").value

    res = forger.delete(f"/api/servers/{server['id']}", headers={"X-CSRFToken": token})
    assert res.status_code == 400
    assert res.get_json() == {"errors": ["csrf_token : The CSRF tokens do not match."]}


def test_csrf_applies_to_json_routes_without_forms(forger, server):
    res = forger.delete(f"/api/user_servers/{server['id']}")
    assert res.status_code == 400


def test_follow_and_unfollow(client, user, other_user):
    res = client.post(f"/api/users/follow/{other_user['id']}")
    assert res.get_json()[str(other_user["id"])]["id"] == other_user["id"]
    assert client.get(f"/api/users/{user['id']}").get_json()["follows"] == [other_user["id"]]

    res = client.post(f"/api/users/unfollow/{other_user['id']}")
    assert res.get_data(as_text=True) == str(other_user["id"])
    assert client.get(f"/api/users/{user['id']}").get_json()["follows"] == []
