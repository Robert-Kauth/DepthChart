from app.models import db, Channel_message
from random import randrange
from faker import Faker


faker = Faker()

# total numbers
total_users = 25
total_servers = 50

total_users_servers = 505
total_users_per_server = 10

total_channels = 250
total_channels_per_server = 5

total_messages = 200
generated_user_messages = 100

# generated numbers
generated_users = 21
generated_servers = 45
generated_user_servers = 500
generated_server_channels = 5
generated_messages_per_channel = 5


def seed_channel_messages():
    '''
    Seeds channel_messages
    '''
    for i in range(101, total_messages+1):
        new_channel_message = Channel_message(channel_id=randrange(1, total_channels+1),
                                              sender_id=randrange(1, total_users+1), message_id=i)
        db.session.add(new_channel_message)
    db.session.commit()


def undo_channel_messages():
    db.session.execute('TRUNCATE channel_messages RESTART IDENTITY CASCADE;')
    db.session.commit()
