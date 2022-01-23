from .db import db


class User_message(db.Model):
    __tablename__ = 'user_messages'

    sender_id = db.Column(db.Integer, db.ForeignKey(
        'users.id', ondelete="CASCADE"))
    recipient_id = db.Column(db.Integer, db.ForeignKey(
        'users.id', ondelete='CASCADE'))
    message_id = db.Column(db.Integer, db.ForeignKey(
        'messages.id', ondelete='CASCADE'), primary_key=True)
    is_read = db.Column(db.Boolean)

    sender = db.relationship(
        'User', foreign_keys='User_message.sender_id', back_populates='sent_messages', cascade='all, delete')
    recipients = db.relationship(
        'User', foreign_keys='User_message.recipient_id', back_populates='received_messages', cascade='all, delete')
    messages = db.relationship(
        'Message', back_populates='user_messages', cascade='all, delete')

    def to_dict(self):
        return {
            'sender_id': self.sender_id,
            'recipient_id': self.recipient_id,
            'message_id': self.message_id,
            'is_read': self.is_read
        }
