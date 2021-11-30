from app.models import db, Server
from faker import Faker
from random import choice, randint

fake = Faker()

# default numbers
default_servers = 5
default_user_servers = 5
total_servers = 36
total_users = 25
default_server_channels = 6


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

    server_icons = ["https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/American_football_conference.png",
                    "https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/Baltimore_ravens.png",
                    "https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/Buffalo_bills.png",
                    "https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/Carolina_panthers.png",
                    "https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/Chicago_bears.png",
                    "https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/Cincinnati_bengals.png",
                    "https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/Cleveland_browns.png",
                    "https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/Dallas_cowboys.png",
                    "https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/Denver_broncos.png",
                    "https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/Detroit_lions.png",
                    "https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/Green_bay_packers.png",
                    "https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/Houston_texans.png",
                    "https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/Indianapolis_colts.png",
                    "https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/Jacksonville_jaguars.png",
                    "https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/Kansas_city_chiefs.png",
                    "https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/Las_vegas_raiders.png",
                    "https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/Los_angeles_chargers.png",
                    "https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/Los_angeles_rams.png",
                    "https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/Miami_dolphins.png",
                    "https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/Minnesota_vikings.png",
                    "https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/New_england_patriots.png",
                    "https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/New_orleans_saints.png",
                    "https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/New_york_giants.png",
                    "https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/New_york_jets.png",
                    "https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/nfl.png",
                    "https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/Philadelphia_eagles.png",
                    "https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/Pittsburgh_steelers.png",
                    "https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/Seattle_seahawks.png",
                    "https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/Tampa_bay_buccaneers.png",
                    "https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/Tennessee_titans.png",
                    "https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/Washington_redskins.png",
                    "https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/Washington.png"]

    for _ in range(0, total_servers+1):
        icon = choice(server_icons)
        server = Server(
            name=fake.text(max_nb_chars=20),
            topic=fake.sentence(nb_words=10),
            icon=icon,
            owner_id=randint(1, total_users)
        )
        db.session.add(server)
    db.session.commit()


def undo_servers():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.commit()
