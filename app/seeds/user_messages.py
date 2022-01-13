from app.models import db, User_message
from .defaults import total_messages_per_user, total_users, total_messages
from random import randint, choice
from faker import Faker

faker = Faker()


def seed_user_messages():
    '''
    Seeds user_messages
    '''
    for i in range(1, total_users+1):
        messages = []
        read = choice((True, False))
        msg_id = randint(1, total_messages)
        for _ in range(1, total_messages_per_user+1):
            while True:
                if msg_id not in messages:
                    messages.append(msg_id)
                    user_message = User_message(sender_id=i, recipient_ids=randint(1, total_users),
                                                message_id=msg_id, is_read=read)
                    break
            db.session.add(user_message)
    db.session.commit()


def undo_user_messages():
    db.session.execute('TRUNCATE user_messages RESTART IDENTITY CASCADE;')
    db.session.commit()
