from .db import db


class User_message(db.Model):
    __tablename__ = 'user_messages'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id', ondelete='CASCADE'))
    message_id = db.Column(db.Integer, db.ForeignKey(
        'messages.id', ondelete='CASCADE'))

    user_message = db.relationship(
        'Users', back_populates='user_messages', cascade='all, delete')
    messages = db.relationship(
        'Message', back_populates='message_users', cascade='all, delete')
