import datetime
from .db import db
from flask_avatars import Identicon
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

# TODO Add default value for Avatar


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    avatar = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now())

    servers = db.relationship(
        'Server', secondary='user_servers', back_populates='users', cascade='all,delete')
    owned_servers = db.relationship(
        'Server', back_populates='owner', cascade='all,delete')
    sent_messages = db.relationship(
        'User_message', foreign_keys='User_message.sender_id', back_populates='sender', cascade='all, delete')
    received_messages = db.relationship(
        'User_message', foreign_keys='[User_message.recipient_ids]', back_populates='recipients', cascade='all, delete')

    # def __init__():
    #     generate_avatar()

    # def generate_avatar(self):
    #     avatar = Identicon()
    #     filenames = avatar.generate(text=self.username)
    #     self.avatar = filenames[1]
    #     db.session.commit()

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'avatar': self.avatar,
            'servers': [server.id for server in self.servers],
            'owned_servers': [owned_server.id for owned_server in self.owned_servers],
            'sent_messages': [sent_message.id for sent_message in self.sent_messages],
            'received_messages': [received_message.id for received_message in self.received_messages],
        }
