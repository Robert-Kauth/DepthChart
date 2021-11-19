from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Channel
from app.forms import ChannelForm


channel_routes = Blueprint('channels', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@channel_routes.route('/')
@login_required
def loadChanels():
    '''
    Loads all channels
    '''
    return {channel.id: channel.to_dict() for channel in Channel.query.all()}


@channel_routes.route('/', methods=["POST"])
@login_required
def create_channel():
    '''
    Creates new channel and assigns it to selected server
    '''
    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        channel = Channel(
            name=form.data['name'], server_id=form.data['server_id'],
            topic=form.data['topic'], icon=form.data['icon'])
        db.session.add(channel)
        db.session.commit()
        return channel.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}


@channel_routes.route('/<int:id>', methods=['GET'])
@login_required
def loadChannel(id):
    '''
    Loads single channel
    '''
    channel = Channel.query.get(id)
    return channel.to_dict()


@channel_routes.route('/<int:id>', methods=['PUT'])
@login_required
def editChannel(id):
    '''
    Edits channel
    '''
    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        channel = Channel.query.get(id)
        channel.name = form.data['name']
        channel.server_id = form.data['server_id']
        channel.topic = form.data['topic']
        channel.icon = form.data['icon']
        db.session.commit()
        return channel.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}


@channel_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def destroyChannel(id):
    '''
    Deletes a channel
    '''
    channel = Channel.query.get(id)
    Channel.query.filter(Channel.id == id).delete()
    db.session.commit()
    return str(id), 201
