from app.models import db, channel_message

# default numbers
default_servers = 5
default_user_servers = 5
total_servers = 35
total_users = 25
default_server_channels = 5
default_messages_per_channel = 5


def seed_channel_messages():
    '''
    Seeds channel_messages
    '''
    for i in range(0, default_channels+1):
        pass


def undo_channel_messages():
    db.session.execute('TRUNCATE channel_messages RESTART IDENTITY CASCADE;')
    db.session.commit()
