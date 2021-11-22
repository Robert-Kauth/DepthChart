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
        icon="https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/American_football_conference.png",
        owner_id=1
    )
    server_demo2 = Server(
        name='Pain of in the seeder',
        topic='How much creating seed data is not that great',
        icon='https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/National_football_conference.png',
        owner_id=1
    )
    server_marnie = Server(
        name='Marnie\'s Dungeon',
        topic='A life in the day of Marnie',
        icon="https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/Arizona_cardinals.png",
        owner_id=2
    )
    server_bobbie = Server(
        name='Bobbie\'s Playhouse',
        topic='Bobbie',
        icon="https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/Atlanta_falcons.png",
        owner_id=3
    )
    server_ashley = Server(
        name='Ashley\'s Arena',
        topic='Fire and Brimstone',
        icon="https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/SanFrancisco_49ners.png",
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
