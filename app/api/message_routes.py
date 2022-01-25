from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Message, User
from app.forms import MessageForm


message_routes = Blueprint('messages', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@message_routes.route('/users/<int:user_id>')
# @login_required
def load_user_messages(user_id):
    '''
    Returns all messages sent to and received by a user
    '''
    sent_messages = {message.id: message.to_dict(
    ) for message in Message.query.filter(Message.is_channel_message == False, Message.sender_id == user_id).all()}
    received_messages = {message.id: message.to_dict(
    ) for message in Message.query.filter(Message.is_channel_message == False, Message.recipient_id == user_id).all()}
    return {**sent_messages, **received_messages}


@message_routes.route('/<int:message_id>')
# @login_required
def load_message(message_id):
    '''
    Loads single message by id
    '''
    message = Message.query.filter(Message.id == message_id).first()
    return message.to_dict()


@message_routes.route('/channel/<int:channel_id>')
# @login_required
def load_channel_messages(channel_id):
    '''
    Loads all messages from specific channel
    '''
    return {message.id: message.to_dict() for message in Message.query.filter(Message.channel_id == channel_id).all()}


@message_routes.route('/', methods=['POST'])
# @login_required
def create_message():
    '''
    Creates a new message setting the sender_id
    to current_user.id
    '''
    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if form.data['is_channel_message'] == True:
            message = Message(channel_id=form.data['channel_id'],
                              is_channel_message=form.data['is_channel_message'],
                              sender_id=form.data['sender_id'],
                              recipient_id=form.data['recipient_id'],
                              content=form.data['content'])
            db.session.add(message)
            db.session.commit()
            return message.to_dict()
        elif form.data['is_channel_message'] == False:
            message = Message(channel_id=None,
                              is_channel_message=False,
                              sender_id=form.data['sender_id'],
                              recipient_id=form.data['recipient_id'],
                              content=form.data['content'])
            db.session.add(message)
            db.session.commit()
            return message.to_dict()
        else:
            return {'errors': validation_errors_to_error_messages(form.errors)}
    return {'errors': validation_errors_to_error_messages(form.errors)}
