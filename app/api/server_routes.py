from flask import Blueprint, request
from flask_login import login_required, current_user
from app.forms import ServerAddForm
from app.models import db, Server

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


@server_routes.route('', methods=["POST"])
@login_required
def create_server():
    '''
    Creates new Server and assigns creator as owner
    '''
    form = ServerAddForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        server = Server(
            name=form.data['name'], topic=form.data['topic'],
            icon=form.data['icon'], owner_id=current_user.id)
        db.session.add(server)
        db.session.commit()
        return server.to_dict()
