def test_list_and_get_users(client, user, other_user):
    users = client.get("/api/users/").get_json()
    assert set(users) == {str(user["id"]), str(other_user["id"])}
    assert users[str(other_user["id"])] == other_user
    assert client.get(f"/api/users/{other_user['id']}").get_json() == other_user


def test_delete_user(client, user, other_user):
    res = client.delete(f"/api/users/{other_user['id']}")
    assert res.status_code == 201
    assert res.get_data(as_text=True) == str(other_user["id"])
    assert set(client.get("/api/users/").get_json()) == {str(user["id"])}


def test_follow_relationship(app, user, other_user):
    from app.models import User, db

    with app.app_context():
        me = db.session.get(User, user["id"])
        them = db.session.get(User, other_user["id"])
        me.follow(them)
        me.follow(them)
        db.session.commit()
        assert me.is_following(them)
        assert me.to_dict()["follows"] == [them.id]
        assert [f.id for f in them.followers] == [me.id]

        me.unfollow(them)
        db.session.commit()
        assert not me.is_following(them)


def test_user_servers(client, user, server):
    res = client.get(f"/api/user_servers/{user['id']}")
    assert res.get_json() == {str(server["id"]): server}

    res = client.delete(f"/api/user_servers/{server['id']}")
    assert res.status_code == 201
    assert client.get(f"/api/user_servers/{user['id']}").get_json() == {}
    assert client.get(f"/api/servers/{server['id']}").get_json()["user_ids"] == []
