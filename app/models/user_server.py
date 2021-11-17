from .db import db


class User_server(db.Model):
    __tablename__ = 'user_servers'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id', ondelete='CASCADE'))
    server_id = db.Column(db.Integer, db.ForeignKey(
        'servers.id', ondelete='CASCADE'))

    users = db.relationship(
        'User', backpopulates='member', cascade='all,delete')
    servers = db.relationship(
        'Server', backpopulates='server_users', cascade='all,delete')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.users.id,
            'server_id': self.servers.id
        }
