import datetime
from .db import db


class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, nullable=False)
    sent_at = db.Column(db.DateTime, default=datetime.datetime.now())
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now())

    user_messages = db.relationship(
        'User_message', back_populates='messages', cascade='all, delete')
    channel_messages = db.relationship(
        'Channel_message', back_populates='messages', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'sent_at': self.sent_at,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user_messages': {user_message.message_id: user_message.sender_id for user_message in self.user_messages},
            'channel_messages': {channel_message.message_id: channel_message.sender_id for channel_message in self.channel_messages}
        }
