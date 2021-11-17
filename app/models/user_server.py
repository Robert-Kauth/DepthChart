from .db import db


class User_server(db.Model):
    __tablename__ = 'user_servers'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id', ondelete='CASCADE'))
    server_id = db.Column(db.Integer, db.ForeignKey(
        'servers.id', ondelete='CASCADE'))

    user = db.relationship(
        'User', backpopulates='user_servers', cascade='all,delete')
    server = db.relationship(
        'Server', backpopulates='user_server', cascade='all,delete')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user.id,
            'server_id': self.server.id
        }
