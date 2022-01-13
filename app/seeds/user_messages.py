from app.models import db, User_message
from .defaults import generated_user_messages, total_users
from random import randint, choice
from faker import Faker

faker = Faker()


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
