from flask import Blueprint
from flask_login import login_required, current_user
from app.models import db, Server, User_server

user_servers_routes = Blueprint('user_servers', __name__)


@user_servers_routes.route('/', methods=['GET'])
@login_required
def loadUserServers():
    '''
    Loads users servers
    '''
    userId = current_user.id
    user_servers = Server.query.join(
        User_server).filter(User_server.user_id == userId).all()
    return {server.id: server.to_dict() for server in user_servers}
