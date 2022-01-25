import datetime
from .db import db


def is_channel_message_default(context):
    if context.get_current_parameters()['channel_id'] is not None:
        return True
    else:
        return False


class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    channel_id = db.Column(db.Integer, db.ForeignKey(
        'channels.id', ondelete='CASCADE'), default=None)
    is_channel_message = db.Column(
        db.Boolean, default=is_channel_message_default, onupdate=is_channel_message_default)
    sender_id = db.Column(db.Integer, db.ForeignKey(
        'users.id', ondelete="CASCADE"))
    recipient_id = db.Column(db.Integer, db.ForeignKey(
        'users.id', ondelete='CASCADE'))
    content = db.Column(db.String, nullable=False)
    sent_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime,
                           default=datetime.datetime.now(),
                           onupdate=datetime.datetime.now())

    channel_message = db.relationship(
        "Channel", back_populates='channel_messages', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            "channel_id": self.channel_id,
            "is_channel_message": self.is_channel_message,
            "sender_id": self.sender_id,
            "recipient_id": self.recipient_id,
            'content': self.content,
            'sent_at': self.sent_at,
            'updated_at': self.updated_at,
        }
