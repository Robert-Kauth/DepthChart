from app.models import db, Channel_message
from .defaults import total_messages_per_channel, total_channels, total_users, total_messages
from random import randint
from faker import Faker


faker = Faker()


def seed_channel_messages():
    '''
    Seeds channel_messages
    '''
    for i in range(1, total_channels+1):
        message_ids = []
        channelId = i
        for _ in range(1, total_messages_per_channel+1):
            msg_id = randint(1, total_messages)
            if msg_id not in message_ids:
                message_ids.append(msg_id)
                senderId = randint(1, total_users)
                new_channel_message = Channel_message(channel_id=channelId,
                                                      sender_id=senderId,
                                                      message_id=msg_id)
            db.session.add(new_channel_message)
    db.session.commit()


def undo_channel_messages():
    db.session.execute('TRUNCATE channel_messages RESTART IDENTITY CASCADE;')
    db.session.commit()
