from flask import Blueprint
from flask_login import login_required
from app.forms import ServerForm
from app.models import Server

server_routes = Blueprint('servers', __name__)


@server_routes.route('/create')
@login_required
def create_server():
    form = ServerForm()
