from app.models import db, Channel
from .defaults import total_servers, generated_server_channels
from faker import Faker
from random import choice, randint

fake = Faker()


def seed_channels():
    '''
    Seeds channels
    '''
    channel_names = ['Weekely Watchers', 'Busted', 'Hotpick', 'Waiver Watch', 'Too Hot to handle',
                     'Plague Players', 'Not even for a dollar', 'Team depthcharts', 'Maybe\'s', 'Deal or no Deal', 'On God', 'Injury Watchlist', 'All about football', 'Advice for the downtrodden']

    channel_icons = ["https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/American_football_conference.png",
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

    for i in range(1, total_servers+1):
        current_channels = []
        if i % 2 == 0:
            default_channel = 'Welcome'
        else:
            default_channel = 'Lounge'
        icon = choice(channel_icons)
        channel = Channel(
            name=default_channel,
            topic=fake.sentence(nb_words=10),
            icon=icon,
            server_id=i
        )
        db.session.add(channel)
        for _ in range(1, generated_server_channels+1):
            while True:
                channel_name = channel_names[randint(1, len(channel_names)-1)]
                if channel_name not in current_channels:
                    current_channels.append(channel_name)
                    icon = choice(channel_icons)
                    new_channel = Channel(
                        name=channel_name,
                        topic=fake.sentence(nb_words=10),
                        icon=icon,
                        server_id=i
                    )
                    break
            db.session.add(new_channel)
    db.session.commit()


def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()
