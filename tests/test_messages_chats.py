import pytest


@pytest.fixture
def dm(client, user, other_user):
    res = client.post("/api/messages/", json={
        "sender_id": user["id"], "recipient_id": other_user["id"], "content": "Trade you my WR1"})
    assert res.status_code == 200
    return res.get_json()


def test_direct_message(client, user, other_user, dm):
    assert dm["content"] == "Trade you my WR1"
    assert dm["sender_id"] == user["id"]
    assert dm["recipient_id"] == other_user["id"]
    assert dm["channel_id"] is None
    assert dm["is_channel_message"] is False
    assert dm["sent_at"] and dm["updated_at"]

    assert client.get(f"/api/messages/{dm['id']}").get_json() == dm
    assert client.get(f"/api/messages/users/{user['id']}").get_json() == {str(dm["id"]): dm}
    assert client.get(f"/api/messages/users/{other_user['id']}").get_json() == {str(dm["id"]): dm}
    between = client.get(f"/api/messages/users/DM/{other_user['id']}/{user['id']}").get_json()
    assert between == {str(dm["id"]): dm}


def test_message_validation(client, user):
    res = client.post("/api/messages/", json={"sender_id": user["id"], "content": ""})
    assert res.get_json() == {"errors": ["content : This field is required."]}


def test_channel_message(client, user, channel):
    # The route only stores channel_id when it compares equal to True (i.e. 1)
    assert channel["id"] == 1
    res = client.post("/api/messages/", json={
        "sender_id": user["id"], "channel_id": channel["id"], "content": "Who starts this week?"})
    message = res.get_json()
    assert message["channel_id"] == channel["id"]
    assert message["is_channel_message"] is True
    assert message["recipient_id"] is None

    assert client.get(f"/api/messages/channel/{channel['id']}").get_json() == {str(message["id"]): message}
    assert client.get(f"/api/channels/{channel['id']}").get_json()["channel_messages"] == [message["id"]]
    # Channel messages are excluded from a user's direct messages
    assert client.get(f"/api/messages/users/{user['id']}").get_json() == {}


def test_chats(client, user, other_user):
    res = client.post("/api/chats/new", json={
        "content": "hey", "sender_id": user["id"], "recipient_id": other_user["id"]})
    chat = res.get_json()
    assert chat["content"] == "hey"
    assert chat["sender_id"] == user["id"]
    assert chat["recipient_id"] == other_user["id"]

    assert client.get(f"/api/chats/{chat['id']}").get_json() == chat
    assert client.get(f"/api/chats/users/{user['id']}").get_json() == {str(chat["id"]): chat}
    assert client.get(f"/api/chats/users/{other_user['id']}").get_json() == {str(chat["id"]): chat}

    res = client.delete(f"/api/chats/{chat['id']}")
    assert res.status_code == 201
    assert client.get(f"/api/chats/users/{user['id']}").get_json() == {}
