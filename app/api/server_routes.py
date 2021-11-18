from flask import Blueprint, request
from flask_login import login_required, current_user
from app.forms import ServerForm
from app.models import db, Server, User_server

server_routes = Blueprint('servers', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@server_routes.route('/', methods=['GET'])
@login_required
def loadServers():
    '''
    Loads all servers
    '''
    return {server.id: server.to_dict() for server in Server.query.all()}


@server_routes.route('', methods=["POST"])
@login_required
def create_server():
    '''
    Creates new server and assigns creator as owner
    '''
    form = ServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        server = Server(
            name=form.data['name'], topic=form.data['topic'],
            icon=form.data['icon'], owner_id=current_user.id)
        db.session.add(server)
        db.session.commit()
        user_server = User_server(
            server_id=server.id,
            user_id=server["owner_id"]
        )
        db.session.add(user_server)
        db.session.commit()
        return server.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}


@server_routes.route('/<int:id>', methods=['GET'])
@login_required
def loadServer(id):
    '''
    Loads single server
    '''
    server = Server.query.get(id)
    return server.to_dict()


@server_routes.route('/<int:id>', methods=['PUT'])
@login_required
def editServer(id):
    '''
    Edits server
    '''
    server = ServerForm()


@server_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def destroyServer(id):
    '''
    Deletes a server
    '''
    server = Server.query.get(id)
    if server.owner_id == current_user.id:
        Server.query.filter(Server.id == id).delete()
        db.session.commit()
        return str(id), 201
    else:
        return {'errors': ['Unauthorized']}
