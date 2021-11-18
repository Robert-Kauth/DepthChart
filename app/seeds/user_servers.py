from app.models import db, User_server
from faker import Faker

faker = Faker()


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
    db.session.commit()


def undo_user_servers():
    db.session.execute('TRUNCATE user_servers RESTART IDENTITY CASCADE;')
    db.session.commit()
