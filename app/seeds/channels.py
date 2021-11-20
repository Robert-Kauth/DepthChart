from app.models import db, Channel


def seed_channels():
    '''
    Seeds channels
    '''
    demo_channel1 = Channel(
        server_id=1, name="All about football",
        topic="All things football", icon='https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/Buffalo_bills.png')
    demo_channel2 = Channel(
        server_id=1, name="49's",
        topic="All things Forty-niners", icon='https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/SanFrancisco_49ners.png')
    demo_channel3 = Channel(
        server_id=1, name="Injury Watchlist",
        topic="All injuries", icon='https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/Baltimore_ravens.png')
    demo_channel4 = Channel(
        server_id=1, name="Panthers Home",
        topic="Any thing Carolina Panther Related", icon='https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/Carolina_panthers.png')
    demo_channel5 = Channel(
        server_id=1, name="Bangals",
        topic="Home of the Cincinnati Bangals", icon='https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/Cincinnati_bengals.png')
    db.session.add(demo_channel1)
    db.session.add(demo_channel2)
    db.session.add(demo_channel3)
    db.session.add(demo_channel4)
    db.session.add(demo_channel5)
    db.session.commit()


def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()
