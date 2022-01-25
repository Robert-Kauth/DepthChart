from flask import Blueprint, request
from flask_login import login_required, current_user
from app.forms import ChatForm
from app.models import db, User, Chat


chat_routes = Blueprint('chats', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@chat_routes.route('/<int:chat_id>')
# @login_required
def load_chat(chat_id):
    '''
    Simple function to retreive a single chat and all its associated data
    '''
    chat = Chat.query.filter(
        Chat.id == chat_id).first()
    return chat.to_dict()


@chat_routes.route('/users/<int:user_id>')
# @login_required
def load_chats(user_id):
    '''
    Simple function to retreive all chats associated with a user
    '''
    sent = {chat.id: chat.to_dict()
            for chat in Chat.query.filter(Chat.sender_id == user_id).order_by(Chat.sent_at).all()}
    received = {chat.id: chat.to_dict()
                for chat in Chat.query.filter(Chat.recipient_id == user_id).order_by(Chat.sent_at).all()}
    chats = {**sent, **received}
    return chats


@chat_routes.route('/new', methods=["POST"])
# @login_required
def add_chat():
    '''
    Function to add chat to database
    '''
    form = ChatForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        chat = Chat(content=form.data['content'],
                    sender_id=form.data['sender_id'],
                    recipient_id=form.data['recipient_id'])
        db.session.add(chat)
        db.session.commit()
        new_chat = chat.to_dict()
        return new_chat
    return {'errors': validation_errors_to_error_messages(form.errors)}


@chat_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
def delete_chat(id):
    '''
    Delete Chat from database
    '''
    chat = Chat.query.get(id)
    Chat.query.filter(Chat.id == chat.id).delete()
    db.session.commit()
    return str(id), 201
