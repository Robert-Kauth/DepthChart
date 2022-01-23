from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Message, User_message, User, Channel_message
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
    Returns all messages sent and received by a user
    '''
    sent_messages = {message.id: message.to_dict(
    ) for message in Message.query.join(User_message).filter(User_message.sender_id == user_id).all()}
    received_messages = {message.id: message.to_dict(
    ) for message in Message.query.join(User_message).filter(User_message.recipient_id == user_id).all()}
    return {**sent_messages, **received_messages}


@message_routes.route('/<int:message_id>')
# @login_required
def load_message(message_id):
    '''
    Loads single user message
    '''
    message = User_message.query.filter(
        User_message.message_id == message_id).first()
    return message.to_dict()


@message_routes.route('/recipients/<int:message_id>')
# @login_required
def load_message_recipients(message_id):
    '''
    Gets all users(recipient_id and sender_id) associated with a particular message_id
    '''
    return{user_message.message_id: user_message.to_dict() for user_message in User_message.query.all()}


@message_routes.route('/channel/<int:channel_id>')
# @login_required
def load_channel_messages(channel_id):
    '''
    Loads all messages from specific channel
    '''
    return {message.id: message.to_dict() for message in Message.query.join(Channel_message).filter(Channel_message.channel_id == channel_id).all()}


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
        message = Message(content=form.data['content'])
        db.session.add(message)
        db.session.commit()
        if (form.data["recipient_id"]):
            user_message = User_message(sender_id=form.data['sender_id'],
                                        recipient_id=form.data['recipient_id'],
                                        message_id=message.id)
            db.session.add(user_message)
            db.session.commit()
            return {**message.to_dict(), **user_message.to_dict()}
        elif (form.data['channel_id']):
            channel_message = Channel_message(channel_id=form.data['channel_id'],
                                              sender_id=form.data['sender_id'],
                                              message_id=message.id)
            db.session.add(channel_message)
            db.session.commit()
            return {**message.to_dict(), **channel_message.to_dict()}
        else:
            return {'errors': validation_errors_to_error_messages(form.errors)}
    return {'errors': validation_errors_to_error_messages(form.errors)}
