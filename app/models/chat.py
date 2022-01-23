from .db import db
import datetime


class Chat(db.Model):
    __tablename__ = 'chats'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String)
    sent_at = db.Column(db.DateTime, default=datetime.datetime.now())
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now())

    user_chats = db.relationship(
        'User_chat', foreign_keys='User_chat.chat_id', back_populates='chats', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'sent_at': self.sent_at,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            "sender_recipient": {user_chats.sender_id: user_chats.recipient_id for user_chats in self.user_chats}
        }
