from app.models import db, User_server
from .defaults import total_servers, total_users
from faker import Faker
from random import randint

faker = Faker()


def seed_user_servers():
    '''
    Seeds user_servers
    '''
    for server in range(1, total_servers+1):
        users = []
        for _ in range(1, 11):
            user = randint(1, total_users)
            while user in users:
                user = randint(1, total_users)
            user_server = User_server(
                user_id=user,
                server_id=server
            )
            db.session.add(user_server)
            users.append(user)
    db.session.commit()


def undo_user_servers():
    db.session.execute('TRUNCATE user_servers RESTART IDENTITY CASCADE;')
    db.session.commit()
