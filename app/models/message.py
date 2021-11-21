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

    message_users = db.relationship(
        'User_message', back_populates='messages', cascade='all, delete')
