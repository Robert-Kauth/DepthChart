from app.models import db, Message
from .defaults import total_messages
from faker import Faker

fake = Faker()


def seed_messages():
    '''
    Seeds messages
    '''
    for _ in range(1, total_messages+1):
        new_message = Message(content=fake.sentence(nb_words=12))
        db.session.add(new_message)
    db.session.commit()


def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()
