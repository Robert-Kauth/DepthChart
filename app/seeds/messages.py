from app.models import db, Message
from .defaults import total_messages
from faker import Faker

fake = Faker()


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
