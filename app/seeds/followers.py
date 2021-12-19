from app.models import db, User
from faker import Faker
from random import randrange

fake = Faker()

# default numbers
default_servers = 5
default_user_servers = 5
total_servers = 36
total_users = 25
total_connections = 12
default_server_channels = 200
default_messages_per_channel = 5


def seed_followers():
    '''
    seeds followers table
    '''
    for _ in range(1, total_connections):
        follower_id = randrange(1, 25)
        followed_id = randrange(1, 25)
        new_follow = User.followers(
            follower_id=follower_id, followed_id=followed_id)
        db.session.add(new_follow)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE followers RESTART IDENTITY CASCADE;')
    db.session.commit()
