from .db import db


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

    owner = db.relationship(
        'User', back_populates='servers', cascade='all, delete')
    flag = db.relationship(
        "Flags", back_populates='servers', cascade='all,delete')
