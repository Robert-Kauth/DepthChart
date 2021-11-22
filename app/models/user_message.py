from .db import db


class User_message(db.Model):
    __tablename__ = 'user_messages'

    id = db.Column(db.Integer, primary_key=True)
    recipient_id = db.Column(db.Integer, db.ForeignKey(
        'users.id', ondelete='CASCADE'))
    message_id = db.Column(db.Integer, db.ForeignKey(
        'messages.id', ondelete='CASCADE'))
    is_read = db.Column(db.Boolean)

    def to_dict(self):
        return {
            'id': self.id,
            'recipient_id': self.recipient_id,
            'message_id': self.message_id,
            'is_read': self.is_read
        }
