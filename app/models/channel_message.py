from .db import db


class Channel_message(db.Model):
    __tablename__ = 'channel_messages'

    channel_id = db.Column(db.Integer, db.ForeignKey(
        'channels.id', ondelete='CASCADE'), primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey(
        'users.id', ondelete="CASCADE"), primary_key=True)
    message_id = db.Column(db.Integer, db.ForeignKey(
        'messages.id', ondelete='CASCADE'), primary_key=True)

    user = db.relationship(
        'User', back_populates='channel_message', cascade='all, delete')
    channel = db.relationship(
        'Channel', back_populates='channel_messages', cascade='all, delete')
    messages = db.relationship(
        'Message', back_populates='channel_messages', cascade='all, delete')

    def to_dict(self):
        return {
            "channel_id": self.channel_id,
            "sender_id": self.sender_id,
            "message_id": self.message_id
        }
