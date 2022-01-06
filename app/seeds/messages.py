from app.models import db, Message
from faker import Faker
from random import choice, randint

fake = Faker()
# total numbers
total_users = 25
total_servers = 50

# generated numbers
generated_users = 21
generated_servers = 45
generated_user_servers = 5
generated_server_channels = 5
generated_messages_per_channel = 5


def seed_messages():
    '''
    Seeds messages
    '''
    demo_msg1 = Message(
        content='DID you just see that touchdown')
    demo_msg2 = Message(
        content='Can I talk about anything here?')
    demo_msg3 = Message(
        content='Does anyone here live in Jersey besides you?')
    demo_msg4 = Message(
        content='Do we even need this channel?')
    demo_msg5 = Message(
        content='I must have missed it...')
    demo_msg6 = Message(
        content='When is our next day to praise bruiser for 3 hours straight?')
    demo_msg7 = Message(
        content='I found a lost cat in Jersey. Has anyone here lost one?')
    demo_msg8 = Message(
        content='I don\'t think that is your decision to make.')
    db.session.add(demo_msg1)
    db.session.add(demo_msg2)
    db.session.add(demo_msg3)
    db.session.add(demo_msg4)
    db.session.add(demo_msg5)
    db.session.add(demo_msg6)
    db.session.add(demo_msg7)
    db.session.add(demo_msg8)

    for _ in range(1, total_servers):
        for _ in range(1, default_messages_per_channel+1):
            new_message = Message(content=fake.sentence(nb_words=12))
        db.session.add(new_message)
    db.session.commit()


def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()
