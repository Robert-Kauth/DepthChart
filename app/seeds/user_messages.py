from app.models import db, User_message
from random import randint, choice
from faker import Faker

faker = Faker()

# total numbers
total_users = 25
total_servers = 50

total_users_servers = 505
total_users_per_server = 10

total_channels = 250
total_channels_per_server = 5

total_messages = 200

# generated numbers
generated_users = 21
generated_servers = 45
generated_user_servers = 500
generated_server_channels = 5
generated_messages_per_channel = 5


def seed_user_messages():
    '''
    Seeds user_messages
    '''
    for i in range(1, total_messages+1):
        read = choice((True, False))
        user_message = User_message(sender_id=randint(1, total_users), recipient_ids=randint(1, total_users),
                                    message_id=i, is_read=read)
        db.session.add(user_message)
    db.session.commit()

    # demo_user_message0 = User_message(sender_id=1,
    #                                   recipient_ids=2, message_id=1, is_read=False)
    # demo_user_message1 = User_message(sender_id=1,
    #                                   recipient_ids=2, message_id=2, is_read=False)
    # demo_user_message2 = User_message(sender_id=1,
    #                                   recipient_ids=3, message_id=3, is_read=False)
    # demo_user_message3 = User_message(sender_id=2,
    #                                   recipient_ids=4, message_id=4, is_read=False)
    # demo_user_message4 = User_message(sender_id=2,
    #                                   recipient_ids=1, message_id=5, is_read=False)
    # demo_user_message5 = User_message(sender_id=3,
    #                                   recipient_ids=5, message_id=6, is_read=False)
    # demo_user_message6 = User_message(sender_id=3,
    #                                   recipient_ids=2, message_id=7, is_read=False)
    # demo_user_message7 = User_message(sender_id=4,
    #                                   recipient_ids=1, message_id=8, is_read=False)
    # demo_user_message8 = User_message(sender_id=4,
    #                                   recipient_ids=1, message_id=9, is_read=False)

    # db.session.add(demo_user_message0)
    # db.session.add(demo_user_message1)
    # db.session.add(demo_user_message2)
    # db.session.add(demo_user_message3)
    # db.session.add(demo_user_message4)
    # db.session.add(demo_user_message5)
    # db.session.add(demo_user_message6)
    # db.session.add(demo_user_message7)
    # db.session.add(demo_user_message8)
    # db.session.commit()


def undo_user_messages():
    db.session.execute('TRUNCATE user_messages RESTART IDENTITY CASCADE;')
    db.session.commit()
