from .db import db


class User_message(db.Model):
    __tablename__ = 'user_messages'

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey(
        'users.id', ondelete="CASCADE"))
    recipient_ids = db.Column(db.Integer, db.ForeignKey(
        'users.id', ondelete='CASCADE'))
    message_id = db.Column(db.Integer, db.ForeignKey(
        'messages.id', ondelete='CASCADE'))
    is_read = db.Column(db.Boolean)

    sender = db.relationship('User', foreign_keys='sender_id',
                             back_populates='sent_messages', cascade='all, delete')
    recipients = db.relationship(
        'User', foreign_keys='[recipient_ids]', back_populates='message_recipients', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'sender_id': self.sender_id,
            'recipient_id': self.recipient_id,
            'message_id': self.message_id,
            'is_read': self.is_read
        }
