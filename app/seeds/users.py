from app.models import db, User
from faker import Faker
from random import choice

fake = Faker()

# default number of users
total_users = 20


def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', avatar="https://fantasydepthchart.s3.us-west-1.amazonaws.com/Avatars/Dem0_avataaars.png")
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', avatar="https://fantasydepthchart.s3.us-west-1.amazonaws.com/Avatars/Marnie_avataaars.png")
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', avatar='https://fantasydepthchart.s3.us-west-1.amazonaws.com/Avatars/bobbie_avataaars.png')
    ashley = User(username='smashley', email='smash@smashley.com',
                  password='bruandgob', avatar="https://fantasydepthchart.s3.us-west-1.amazonaws.com/Avatars/ashley_avataaars.png")

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(ashley)

    avatars = ["https://fantasydepthchart.s3.us-west-1.amazonaws.com/Avatars/avataaarsrandom1.png",
               "https://fantasydepthchart.s3.us-west-1.amazonaws.com/Avatars/avataaarsrandom10.png",
               "https://fantasydepthchart.s3.us-west-1.amazonaws.com/Avatars/avataaarsrandom11.png",
               "https://fantasydepthchart.s3.us-west-1.amazonaws.com/Avatars/avataaarsrandom12.png",
               "https://fantasydepthchart.s3.us-west-1.amazonaws.com/Avatars/avataaarsrandom13.png",
               "https://fantasydepthchart.s3.us-west-1.amazonaws.com/Avatars/avataaarsrandom14.png"
               "https://fantasydepthchart.s3.us-west-1.amazonaws.com/Avatars/avataaarsrandom15.png",
               "https://fantasydepthchart.s3.us-west-1.amazonaws.com/Avatars/avataaarsrandom16.png",
               "https://fantasydepthchart.s3.us-west-1.amazonaws.com/Avatars/avataaarsrandom2.png",
               "https://fantasydepthchart.s3.us-west-1.amazonaws.com/Avatars/avataaarsrandom3.png",
               "https://fantasydepthchart.s3.us-west-1.amazonaws.com/Avatars/avataaarsrandom4.png",
               "https://fantasydepthchart.s3.us-west-1.amazonaws.com/Avatars/avataaarsrandom5.png",
               "https://fantasydepthchart.s3.us-west-1.amazonaws.com/Avatars/avataaarsrandom6.png",
               "https://fantasydepthchart.s3.us-west-1.amazonaws.com/Avatars/avataaarsrandom7.png",
               "https://fantasydepthchart.s3.us-west-1.amazonaws.com/Avatars/avataaarsrandom8.png",
               "https://fantasydepthchart.s3.us-west-1.amazonaws.com/Avatars/avataaarsrandom9.png"]
    for _ in range(0, 15):
        avatar = choice(avatars)
        user = User(
            username=fake.user_name(),
            email=fake.email(),
            password=fake.password(length=8),
            avatar=avatar
        )
        db.session.add(user)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
