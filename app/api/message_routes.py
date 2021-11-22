from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Message, User_message, User
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


@message_routes.route('/<int:user_id>')
@login_required
def load_user_messages(user_id):
    '''
    Gets all messages associated with a particular user_id
    '''
    user_messages = Message.query.join(User_message).filter(
        User_message.user_id == user_id).all()
    return {message.id: message.to_dict() for message in user_messages}


@message_routes.route('/<int:message_id>')
@login_required
def load_message_users(message_id):
    '''
    Gets all users associated with a particular message_id
    '''
    message_users = User.query.join(User_message).filter(
        User_message.message_id == message_id)
    return {user.id: user.to_dict() for user in message_users}


@message_routes.route('/', methods=['POST'])
@login_required
def create_message():
    '''
    Creates a new message setting the sender_id
    to current_user.id
    '''
    # get all users for form select field
    recipients_list = [(user.id, user.username) for user in User.query.all()]
    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form.recipients.choices = recipients_list
    if form.validate_on_submit():
        message = Message(recipients=form.recipients.data,
                          sender_id=current_user.id,
                          content=form.data['content'])
        db.session.add(message)
        db.session.commit()
        user_message = User_message(
            user_id=current_user.id, message_id=message.id)
        db.session.add(user_message)
        db.session.commit()
        return message.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}
