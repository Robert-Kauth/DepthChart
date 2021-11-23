from app.models import db, Message


def seed_messages():
    '''
    Seeds messages
    '''
    demo_msg1 = Message(
        content='DID you just see that touchdown', channel_id=1)
    demo_msg2 = Message(
        content='Can I talk about anything here?', channel_id=2)
    demo_msg3 = Message(
        content='Does anyone here live in Jersey besides you?', channel_id=3)
    demo_msg4 = Message(
        content='Do we even need this channel?', channel_id=4)
    demo_msg5 = Message(
        content='I must have missed it...', channel_id=5)
    demo_msg6 = Message(
        content='When is our next day to praise bruiser for 3 hours straight?', channel_id=5)
    demo_msg7 = Message(
        content='I found a lost cat in Jersey. Has anyone here lost one?', channel_id=1)
    demo_msg8 = Message(
        content='I don\'t think that is your decision to make.', channel_id=2)
    db.session.add(demo_msg1)
    db.session.add(demo_msg2)
    db.session.add(demo_msg3)
    db.session.add(demo_msg4)
    db.session.add(demo_msg5)
    db.session.add(demo_msg6)
    db.session.add(demo_msg7)
    db.session.add(demo_msg8)
    db.session.commit()


def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()
