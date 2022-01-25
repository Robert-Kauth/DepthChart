from app.models import db, Message
from .defaults import total_messages, total_messages_per_user, total_users, total_messages, total_channels, total_messages_per_channel
from faker import Faker
from random import randint

fake = Faker()
message_ids = []


def seed_user_messages():
    '''
    Seeds user messages
    '''
    for i in range(1, total_users+1):
        senderId = i
        for _ in range(1, total_messages_per_user+1):
            msg_id = randint(1, total_messages)
            if msg_id not in message_ids:
                message_ids.append(msg_id)
                recipientId = randint(1, total_users)
                if recipientId != senderId:
                    user_message = Message(
                        channel_id=None, sender_id=senderId, recipient_id=recipientId, content=fake.sentence(nb_words=12))
            db.session.add(user_message)
    db.session.commit()


def undo_user_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()


def seed_channel_messages():
    '''
    Seeds channel_messages
    '''
    for i in range(1, total_channels+1):
        channelId = i
        for _ in range(1, total_messages_per_channel+1):
            msg_id = randint(1, total_messages)
            if msg_id not in message_ids:
                message_ids.append(msg_id)
                senderId = randint(1, total_users)
                new_channel_message = Message(channel_id=channelId,
                                              sender_id=senderId,
                                              content=fake.sentence(nb_words=12))
            db.session.add(new_channel_message)
    db.session.commit()


def undo_channel_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()
