from flask import Blueprint, request
from flask_login import login_required, current_user
from app.forms import ChatForm
from app.models import db, User, Chat, User_chat


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
    return {chat.id: chat.to_dict() for chat in Chat.query.join(User_chat).filter(User_chat.chat_id == chat_id).first()}


@chat_routes.route('/users/<int:user_id>')
# @login_required
def load_chats(user_id):
    '''
    Simple function to retreive all chats associated with a user
    '''
    sent = {chat.id: chat.to_dict()
            for chat in Chat.query.join(User_chat, User_chat.chat_id == Chat.id).filter(User_chat.sender_id == user_id).order_by(Chat.sent_at).all()}
    received = {chat.id: chat.to_dict() for chat in Chat.query.join(User_chat, User_chat.chat_id == Chat.id).filter(
        User_chat.recipient_ids == user_id).order_by(Chat.sent_at).all()}
    messages = {**sent, **received}
    return messages


@chat_routes.route('/new', methods=["POST"])
# @login_required
def add_chat():
    '''
    Function to add chat to database
    '''
    form = ChatForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        chat = Chat(content=form.data['content'])
        db.session.add(chat)
        db.session.commit()
        user_chat = User_chat(chat_id=chat.id,
                              sender_id=form.data['sender_id'],
                              recipient_ids=form.data['recipient_ids'])
        db.session.add(user_chat)
        db.session.commit()
        new_chat = chat.to_dict()
        new_user_chat = user_chat.to_dict()
        return {**new_chat, **new_user_chat}
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
