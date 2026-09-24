from conftest import signup

DEFAULT_AVATAR_PREFIX = "https://fantasydepthchart.s3.us-west-1.amazonaws.com/Avatars/defaults/"


def test_responses_set_csrf_cookie(app):
    client = app.test_client()
    res = client.get("/api/auth/")
    cookie = res.headers.get("Set-Cookie", "")
    assert cookie.startswith("csrf_token=")
    assert "HttpOnly" in cookie


def test_authenticate_when_logged_out(client):
    res = client.get("/api/auth/")
    assert res.status_code == 200
    assert res.get_json() == {"errors": ["Unauthorized"]}


def test_signup_assigns_default_avatar_and_logs_in(client):
    res = signup(client)
    assert res.status_code == 200
    user = res.get_json()
    assert user["username"] == "demo"
    assert user["email"] == "demo@aa.io"
    assert user["avatar"].startswith(DEFAULT_AVATAR_PREFIX)
    assert user["servers"] == [] and user["owned_servers"] == [] and user["follows"] == []

    assert client.get("/api/auth/").get_json() == user


def test_signup_keeps_supplied_avatar(client):
    res = signup(client, avatar="https://example.com/me.png")
    assert res.get_json()["avatar"] == "https://example.com/me.png"


def test_signup_rejects_duplicates_and_bad_email(client, user):
    res = signup(client)
    assert res.status_code == 401
    assert set(res.get_json()["errors"]) == {
        "username : Username is already in use.",
        "email : Email address is already in use.",
    }

    res = signup(client, username="someone", email="not-an-email")
    assert res.status_code == 401
    assert res.get_json()["errors"] == ["email : Invalid email address."]


def test_signup_requires_csrf_cookie(app):
    client = app.test_client()
    # No prior request, so no csrf_token cookie to copy into the form
    res = client.post("/api/auth/signup", json={
        "username": "x", "email": "x@x.io", "password": "pw", "avatar": ""})
    assert res.status_code == 400


def test_login_logout(client, user):
    client.get("/api/auth/logout")
    assert client.get("/api/auth/").get_json() == {"errors": ["Unauthorized"]}

    res = client.post("/api/auth/login", json={"email": "demo@aa.io", "password": "password"})
    assert res.status_code == 200
    assert res.get_json()["id"] == user["id"]
    assert client.get("/api/auth/").get_json()["id"] == user["id"]

    res = client.get("/api/auth/logout")
    assert res.get_json() == {"message": "User logged out"}


def test_login_with_legacy_password_hash(app, client):
    # Hash for "password" as stored by Werkzeug 2.0; newer releases default
    # to scrypt but must keep verifying existing users' pbkdf2 hashes.
    from app.models import User, db

    with app.app_context():
        db.session.add(User(
            username="legacy", email="legacy@aa.io",
            hashed_password="pbkdf2:sha256:260000$DOUU6yznRKIgEsra$"
                            "c71102d7b11a00a471d15cfa0a7febf150506620580a09fc70ec6440af21fe86"))
        db.session.commit()

    res = client.post("/api/auth/login", json={"email": "legacy@aa.io", "password": "password"})
    assert res.status_code == 200
    assert res.get_json()["username"] == "legacy"


def test_login_errors(client, user):
    client.get("/api/auth/logout")
    res = client.post("/api/auth/login", json={"email": "demo@aa.io", "password": "wrong"})
    assert res.status_code == 401
    assert res.get_json()["errors"] == ["password : Password was incorrect."]

    res = client.post("/api/auth/login", json={"email": "nobody@aa.io", "password": "password"})
    assert res.status_code == 401
    assert set(res.get_json()["errors"]) == {
        "email : Email provided not found.",
        "password : No such user exists.",
    }


def test_signup_validation_lookups(client, user):
    assert client.get("/api/auth/validate_signup_email/demo@aa.io").get_json() == {"is_email_unique": False}
    assert client.get("/api/auth/validate_signup_email/new@aa.io").get_json() == {"is_email_unique": "new@aa.io"}
    assert client.get("/api/auth/validate_signup_username/demo").get_json() == {"is_username_unique": False}
    assert client.get("/api/auth/validate_signup_username/newbie").get_json() == {"is_username_unique": "newbie"}


def test_login_validation_lookups(client, user):
    assert client.get("/api/auth/validate_login_email/demo@aa.io").get_json() == {"is_user": "demo@aa.io"}
    assert client.get("/api/auth/validate_login_email/new@aa.io").get_json() == {"is_user": False}
    assert client.get("/api/auth/validate_login_username/demo").get_json() == {"is_user": "demo"}
    assert client.get("/api/auth/validate_login_username/newbie").get_json() == {"is_user": False}


def test_protected_routes_redirect_to_unauthorized(client):
    res = client.get("/api/servers/")
    assert res.status_code == 302
    assert "/api/auth/unauthorized" in res.headers["Location"]

    res = client.get("/api/servers/", follow_redirects=True)
    assert res.status_code == 401
    assert res.get_json() == {"errors": ["Unauthorized"]}
