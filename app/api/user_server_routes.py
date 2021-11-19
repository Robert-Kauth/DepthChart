from flask import Blueprint, request
from flask_login import login_required
from app.models import db, User, Server, User_server

user_server_routes = Blueprint('user_servers', __name__)


@user_server_routes.route('/<int:user_id>', methods=['GET'])
@login_required
def loadUserServers(user_id):
    '''
    Gets user servers
    '''
    user_servers = Server.query.join(
        User_server).filter(User_server.user_id == user_id).all()
    return {server.id: server.to_dict() for server in user_servers}


@user_server_routes.route('/<int:server_id>', methods=['GET'])
@login_required
def loadServerUsers(server_id):
    '''
    Gets Server Users
    '''
    server_users = User.query.join(User_server).filter(
        User_server.server_id == server_id).all()
    return {user.id: user.to_dict() for user in server_users}


@user_server_routes.route('/join', methods=["POST"])
@login_required
def joinServer():
    '''
    Adds server to users servers and returns new server
    '''
    data = request.json
    user_server = User_server(
        server_id=data['server_id'], user_id=data['user_id'])
    db.session.add(user_server)
    db.session.commit()
    new_server = Server.query.get(data['server_id'])
    return {new_server.id: new_server.to_dict()}


@user_server_routes.route('/<int:server_id>', methods=["DELETE"])
@login_required
def delete_user_server(server_id):
    '''
    Deletes server from user servers
    '''
    User_server.query.filter(User_server.server_id == server_id).delete()
    db.session.commit()
    return str(server_id), 201
