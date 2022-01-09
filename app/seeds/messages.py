from app.models import db, Message
from faker import Faker
from random import choice, randint

fake = Faker()
# total numbers
total_users = 25
total_servers = 50

total_users_servers = 505
total_users_per_server = 10

total_channels = 250
total_channels_per_server = 5

total_messages = 200

# generated numbers
generated_users = 21
generated_servers = 45
generated_user_servers = 500
generated_server_channels = 5
generated_messages_per_channel = 5


def seed_messages():
    '''
    Seeds messages
    '''
    for _ in range(0, total_messages):
        new_message = Message(content=fake.sentence(nb_words=12))
        db.session.add(new_message)
    db.session.commit()


def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()
