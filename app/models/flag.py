from .db import db
import datetime


class Flag(db.model):
    __tablename__ = 'flags'

    id = db.Column(db.Integer, primary_key=True)
    kind = db.Column(db.String(255))
    description = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now())
