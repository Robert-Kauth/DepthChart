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

    members = db.relationship(
        'User_server', backref='users', cascade='all,delete')
    owned_servers = db.relationship(
        'Server', backref='users', cascade='all,delete')
    sent_messages = db.relationship(
        'Message', backref='users', cascade='all, delete')
    message_recipients = db.relationship(
        'User_message', backref='users', cascade='all, delete')

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
            'member_ids': [member.id for member in self.members],
            'owned_server_ids': [owned_server.id for owned_server in self.owned_servers],
            'sent_message_ids': [sent_message.id for sent_message in self.sent_messages],
            'message_recipient_ids': [message_recipient.id for message_recipient in self.message_recipients]


        }
