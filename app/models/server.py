from .db import db


class Server(db.Model):
    __tablename__ = 'servers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    topic = db.Column(db.String(255))
    icon = db.Column(db.String(500))
    owner_id = db.Column(db.Integer, db.ForeignKey(
        "users.id", ondelete='CASCADE'))

    owner = db.relationship(
        'User', back_populates='owned_servers', cascade='all, delete')
    server_users = db.relationship(
        'User_server', back_populates='servers', cascade='all,delete')
    channels = db.relationship(
        'Channel', backref='servers', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'topic': self.topic,
            'icon': self.icon,
            'owner_id': self.owner.id,
            'server_user_ids': [server_user.id for server_user in self.server_users],
            'channel_ids': [channel.id for channel in self.channels]
        }
