from flask.cli import AppGroup
from .users import seed_users, undo_users
from .servers import seed_servers, undo_servers
from .user_servers import seed_user_servers, undo_user_servers
from .channels import seed_channels, undo_channels
from .messages import seed_messages, undo_messages
from .user_messages import seed_user_messages, undo_user_messages, seed_channel_messages, undo_channel_messages
# from .channel_messages import seed_channel_messages, undo_channel_messages

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_servers()
    seed_user_servers()
    seed_channels()
    seed_messages()
    seed_user_messages()
    seed_channel_messages()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_servers()
    undo_user_servers()
    undo_channels()
    undo_messages()
    undo_user_messages()
    undo_channel_messages()
