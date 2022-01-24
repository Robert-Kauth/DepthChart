from .db import db
import datetime


class Chat(db.Model):
    __tablename__ = 'chats'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String)
    sender_id = db.Column(db.Integer, db.ForeignKey(
        'users.id', ondelete='CASCADE'))
    recipient_id = db.Column(db.Integer, db.ForeignKey(
        'users.id', ondelete='CASCADE'))
    sent_at = db.Column(db.DateTime, default=datetime.datetime.now())
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now())

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'sent_at': self.sent_at,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
