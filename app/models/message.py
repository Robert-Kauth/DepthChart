import datetime
from .db import db


class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey(
        'users.id', ondelete="CASCADE"))
    content = db.Column(db.String)
    channel_id = db.Column(db.Integer, db.ForeignKey(
        'channels.id', ondelete="CASCADE"))
    sent_at = db.Column(db.DateTime, default=datetime.datetime.now())
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now())

    message_recipients = db.relationship(
        'User_message', backref='messages', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'sender_id': self.users.id,
            'content': self.content,
            'channel_id': self.channels.id,
            'sent_at': self.sent_at,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'message_recipients': [message_recipient.id for message_recipient in self.message_recipients]
        }
