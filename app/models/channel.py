from .db import db


class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)
    server_id = db.Column(db.Integer, db.ForeignKey(
        'servers.id', ondelete="CASCADE"), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    topic = db.Column(db.String(255))
    icon = db.Column(db.String(500))

    channel_messages = db.relationship(
        'Message', back_populates='channel_message', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'server_id': self.server_id,
            'name': self.name,
            'topic': self.topic,
            'icon': self.icon,
            'channel_messages': [channel_message.id for channel_message in self.channel_messages]
        }
