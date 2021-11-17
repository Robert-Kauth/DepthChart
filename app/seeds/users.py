from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', avatar="https://fantasydepthchart.s3.us-west-1.amazonaws.com/depthchartdata/Dem0_avataaars.png")
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', avatar="https://fantasydepthchart.s3.us-west-1.amazonaws.com/depthchartdata/Marnie_avataaars.png")
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', avatar='https://fantasydepthchart.s3.us-west-1.amazonaws.com/depthchartdata/bobbie_avataaars.png')
    ashley = User(username='smashley', email='smash@smashley.com',
                  password='bruandgob', avatar="https://fantasydepthchart.s3.us-west-1.amazonaws.com/depthchartdata/ashley_avataaars.png")

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(ashley)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
