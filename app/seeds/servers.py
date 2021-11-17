from app.models import db, Server
from faker import Faker

faker = Faker()

# default number
# total = 31


def seed_servers():
    '''
    Seeds servers
    '''
    server_demo = Server(
        name='SirDemsAlot',
        topic='All things demo',
        icon="https://cdn.discordapp.com/attachments/886336420552269847/903508537798459402/aang-of-avatar-the-last-airbender-wallpaper-2048x1536-6450_26.jpg",
        owner_id=1
    )
    server_demo2 = Server(
        name='Pain of in the seeder',
        topic='How much creating seed data is not that great',
        icon='https://cdn.discordapp.com/icons/172069829690261504/31089b57cbcdc00edb0798e31fc60bb2.png?size=96',
        owner_id=1
    )
    server_marnie = Server(
        name='Marnie\'s Dungeon',
        topic='A life in the day of Marnie',
        icon="https://cdn.discordapp.com/attachments/886336420552269847/904401336563535932/istockphoto-1281804798-170667a.jpg",
        owner_id=2
    )
    server_bobbie = Server(
        name='Bobbie\'s Playhouse',
        topic='Bobbie',
        icon="https://cdn.discordapp.com/attachments/886336420552269847/904402317313441862/200.png",
        owner_id=3
    )
    server_ashley = Server(
        name='Ashley\'s Arena',
        topic='Fire and Brimstone',
        icon="https://cdn.discordapp.com/attachments/886336420552269847/904401248051138630/Eren-Jaeger-from-Attack-on-Titan-with-his-long-hair-in-a-bun.jpg",
        owner_id=4
    )
    db.session.add(server_demo)
    db.session.add(server_demo2)
    db.session.add(server_marnie)
    db.session.add(server_bobbie)
    db.session.add(server_ashley)
    db.session.commit()


def undo_servers():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.commit()
