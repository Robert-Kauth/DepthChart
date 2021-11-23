import datetime
from .db import db


class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String)
    channel_id = db.Column(db.Integer, db.ForeignKey(
        'channels.id', ondelete="CASCADE"))
    sent_at = db.Column(db.DateTime, default=datetime.datetime.now())
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now())

    user_messages = db.relationship(
        'User_message', foreign_keys='User_message.message_id', back_populates='messages', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'channel_id': self.channels.id,
            'sent_at': self.sent_at,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
