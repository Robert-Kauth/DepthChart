from app.models import db, User_message
from random import randint, choice
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


def seed_user_messages():
    '''
    Seeds user_messages
    '''
    for i in range(1, generated_user_messages+1):
        read = choice((True, False))
        user_message = User_message(sender_id=randint(1, total_users), recipient_ids=randint(1, total_users),
                                    message_id=i, is_read=read)
        db.session.add(user_message)
    db.session.commit()


def undo_user_messages():
    db.session.execute('TRUNCATE user_messages RESTART IDENTITY CASCADE;')
    db.session.commit()
