from app.models import db, Channel_message
from .defaults import total_messages_per_channel, total_channels, total_users, total_messages
from random import randint
from faker import Faker


faker = Faker()


def seed_channel_messages():
    '''
    Seeds channel_messages
    '''
    for _ in range(1, total_messages_per_channel+1):
        channelIds = []
        channelId = randint(1, total_channels)
        if channelId not in channelIds:
            channelIds.append(channelId)
            new_channel_message = Channel_message(channel_id=channelId,
                                                      sender_id=randint(
                                                          1, total_users),
                                                      message_id=randint(1, total_messages))
        db.session.add(new_channel_message)
    db.session.commit()


def undo_channel_messages():
    db.session.execute('TRUNCATE channel_messages RESTART IDENTITY CASCADE;')
    db.session.commit()
