from .db import db
from flask_login import UserMixin


class Server(db.Model):
    __tablename__ = 'servers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    topic = db.Column(db.String(255))
    icon = db.Column(db.String(500))
    owner_id = db.Column(db.Integer, db.ForeignKey(
        "users.id", ondelete='CASCADE'))
    flag_id = db.Column(db.Integer, db.ForeignKey(
        'flags.id', ondelete='CASCADE'))
