from app.models import db, User_server
from faker import Faker
from random import randint

faker = Faker()

# total numbers
total_users = 25
total_servers = 50

total_users_servers = 505
total_users_per_server = 10

total_channels = 250
total_channels_per_server = 5

# generated numbers
generated_users = 21
generated_servers = 45
generated_user_servers = 500
generated_server_channels = 5
generated_messages_per_channel = 5


def seed_user_servers():
    '''
    Seeds user_servers
    '''
    demo_user_server = User_server(
        user_id=1,
        server_id=1
    )
    demo_user_server2 = User_server(
        user_id=1,
        server_id=2
    )
    marnie_user_server = User_server(
        user_id=2,
        server_id=3
    )
    bobbie_user_server = User_server(
        user_id=3,
        server_id=4
    )
    ashley_user_server = User_server(
        user_id=4,
        server_id=5
    )
    db.session.add(demo_user_server)
    db.session.add(demo_user_server2)
    db.session.add(marnie_user_server)
    db.session.add(bobbie_user_server)
    db.session.add(ashley_user_server)

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
