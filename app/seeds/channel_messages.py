from app.models import db, Channel_message
from .defaults import total_messages, total_channels, total_users
from random import randrange, randint
from faker import Faker


faker = Faker()


def seed_channel_messages():
    '''
    Seeds channel_messages
    '''
    for i in range(101, total_messages+1):
        channelIds = []
        for _ in range(1, total_channels+1):
            channelId = randint(1, total_channels)
            if channelId not in channelIds:
                channelIds.append(channelId)
                new_channel_message = Channel_message(channel_id=channelId,
                                                      sender_id=randrange(
                                                          1, total_users+1),
                                                      message_id=i)
            db.session.add(new_channel_message)
    db.session.commit()


def undo_channel_messages():
    db.session.execute('TRUNCATE channel_messages RESTART IDENTITY CASCADE;')
    db.session.commit()
