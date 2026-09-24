def test_create_server_adds_owner_as_member(client, user, server):
    assert server["name"] == "Fantasy League"
    assert server["topic"] == "All things football"
    assert server["icon"] == "https://example.com/icon.png"
    assert server["owner_id"] == user["id"]
    assert server["user_ids"] == [user["id"]]
    assert server["channel_ids"] == []

    me = client.get(f"/api/users/{user['id']}").get_json()
    assert me["servers"] == [server["id"]]
    assert me["owned_servers"] == [server["id"]]


def test_create_server_validation(client, user):
    res = client.post("/api/servers/", json={"name": "abc", "topic": "", "icon": ""})
    assert set(res.get_json()["errors"]) == {
        "name : Field must be at least 5 characters long.",
        "topic : This field is required.",
    }


def test_load_and_edit_server(client, server):
    assert client.get("/api/servers/").get_json() == {str(server["id"]): server}
    assert client.get(f"/api/servers/{server['id']}").get_json() == server

    res = client.put(f"/api/servers/{server['id']}", json={
        "name": "Renamed League", "topic": "New topic here", "icon": ""})
    edited = res.get_json()
    assert edited["name"] == "Renamed League"
    assert edited["topic"] == "New topic here"
    assert edited["icon"] == ""

    res = client.put(f"/api/servers/{server['id']}", json={"name": "x", "topic": "y", "icon": ""})
    assert "errors" in res.get_json()


def test_delete_server_owner_only(app, client, server, other_user):
    other = app.test_client()
    other.get("/api/auth/")
    other.post("/api/auth/login", json={"email": "marnie@aa.io", "password": "password"})
    res = other.delete(f"/api/servers/{server['id']}")
    assert res.get_json() == {"errors": ["Unauthorized"]}

    res = client.delete(f"/api/servers/{server['id']}")
    assert res.status_code == 201
    assert res.get_data(as_text=True) == str(server["id"])
    assert client.get("/api/servers/").get_json() == {}


def test_channel_crud(client, server, channel):
    assert channel["name"] == "Waiver Watch"
    assert channel["server_id"] == server["id"]
    assert channel["channel_messages"] == []

    assert client.get(f"/api/servers/{server['id']}").get_json()["channel_ids"] == [channel["id"]]
    assert client.get("/api/channels/").get_json() == {str(channel["id"]): channel}
    assert client.get(f"/api/channels/{channel['id']}").get_json() == channel

    res = client.put(f"/api/channels/{channel['id']}", json={
        "name": "Injury Watchlist", "server_id": server["id"], "topic": "Who is hurt", "icon": ""})
    assert res.get_json()["name"] == "Injury Watchlist"

    res = client.put(f"/api/channels/{channel['id']}", json={"name": "abc", "server_id": server["id"], "topic": "abc"})
    assert "errors" in res.get_json()

    res = client.delete(f"/api/channels/{channel['id']}")
    assert res.status_code == 201
    assert client.get("/api/channels/").get_json() == {}


def test_channel_validation(client, server):
    res = client.post("/api/channels/", json={"name": "abc", "topic": "Some topic"})
    assert set(res.get_json()["errors"]) == {
        "name : Field must be at least 5 characters long.",
        "server_id : This field is required.",
    }


def test_deleting_server_deletes_channels(client, server, channel):
    client.delete(f"/api/servers/{server['id']}")
    assert client.get("/api/channels/").get_json() == {}
