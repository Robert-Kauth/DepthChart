from app.models import db, User_message


def seed_user_messages():
    '''
    Seeds user_messages
    '''
    demo_user_message1 = User_message(sender_id=1,
                                      recipient_id=2, message_id=1, is_read=False)
    demo_user_message2 = User_message(sender_id=1,
                                      recipient_id=3, message_id=2, is_read=False)
    demo_user_message3 = User_message(sender_id=2,
                                      recipient_id=4, message_id=3, is_read=False)
    demo_user_message4 = User_message(sender_id=2,
                                      recipient_id=4, message_id=4, is_read=False)
    demo_user_message5 = User_message(sender_id=3,
                                      recipient_id=3, message_id=5, is_read=False)
    demo_user_message6 = User_message(sender_id=3,
                                      recipient_id=2, message_id=6, is_read=False)
    demo_user_message7 = User_message(sender_id=4,
                                      recipient_id=1, message_id=7, is_read=False)
    demo_user_message8 = User_message(sender_id=4,
                                      recipient_id=1, message_id=8, is_read=False)
    db.session.add(demo_user_message1)
    db.session.add(demo_user_message2)
    db.session.add(demo_user_message3)
    db.session.add(demo_user_message4)
    db.session.add(demo_user_message5)
    db.session.add(demo_user_message6)
    db.session.add(demo_user_message7)
    db.session.add(demo_user_message8)
    db.session.commit()


def undo_user_messages():
    db.session.execute('TRUNCATE user_messages RESTART IDENTITY CASCADE;')
    db.session.commit()
