from flask.cli import AppGroup
from .users import seed_users, undo_users
from .servers import seed_servers, undo_servers
from .user_servers import seed_user_servers, undo_user_servers

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_servers()
    seed_user_servers()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_servers()
    undo_user_servers()
