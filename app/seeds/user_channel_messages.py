# from app.models import db, User_message, Channel_message
# from .defaults import total_messages_per_user, total_users, total_messages, total_channels, total_messages_per_channel
# from random import randint, choice
# from faker import Faker

# faker = Faker()
# message_ids = []


# def seed_user_messages():
#     '''
#     Seeds user_messages
#     '''
#     for i in range(1, total_users+1):
#         senderId = i
#         read = choice((True, False))
#         for _ in range(1, total_messages_per_user+1):
#             msg_id = randint(1, total_messages)
#             if msg_id not in message_ids:
#                 message_ids.append(msg_id)
#                 recipientId = randint(1, total_users)
#                 if recipientId != senderId:
#                     user_message = User_message(sender_id=senderId, recipient_id=recipientId,
#                                                 message_id=msg_id, is_read=read)
#             db.session.add(user_message)
#     db.session.commit()


# def undo_user_messages():
#     db.session.execute('TRUNCATE user_messages RESTART IDENTITY CASCADE;')
#     db.session.commit()


# def seed_channel_messages():
#     '''
#     Seeds channel_messages
#     '''
#     for i in range(1, total_channels+1):
#         channelId = i
#         for _ in range(1, total_messages_per_channel+1):
#             msg_id = randint(1, total_messages)
#             if msg_id not in message_ids:
#                 message_ids.append(msg_id)
#                 senderId = randint(1, total_users)
#                 new_channel_message = Channel_message(channel_id=channelId,
#                                                       sender_id=senderId,
#                                                       message_id=msg_id)
#             db.session.add(new_channel_message)
#     db.session.commit()


# def undo_channel_messages():
#     db.session.execute('TRUNCATE channel_messages RESTART IDENTITY CASCADE;')
#     db.session.commit()
