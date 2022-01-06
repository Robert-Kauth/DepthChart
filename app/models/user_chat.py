from .db import db


class User_chat(db.Model):
    __tablename__ = 'user_chats'

    chat_id = db.Column(db.Integer, db.ForeignKey(
        'chats.id', ondelete='CASCADE'), primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey(
        'users.id', ondelete='CASCADE'))
    recipient_ids = db.Column(
        db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'))
    is_read = db. Column(db.Boolean)

    sender = db.relationship(
        'User', foreign_keys='User_chat.sender_id', back_populates='sent_chats', cascade='all, delete')
    recipients = db.relationship(
        'User', foreign_keys='[User_chat.recipient_ids]', back_populates='received_chats', cascade='all, delete')
    chats = db.relationship(
        'Chat', back_populates='user_chats', cascade='all, delete')

    def to_dict(self):
        return {
            'sender_id': self.sender_id,
            'recipient_ids': self.recipient_ids,
            'chat_id': self.chat_id,
            'is_read': self.is_read
        }
