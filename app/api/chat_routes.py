from flask import Blueprint, request
from flask_login import login_required, current_user
from app.forms.message_form import MessageForm
from app.models import db, User, Chat, User_chat


chat_routes = Blueprint('chats', __name__)


@chat_routes.route('/<int>:chat_id')
@login_required
def load_chat(chat_id):
    '''
    Simple function to retreive a single chat and all its associated data
    '''
    return {chat.id: chat.to_dict() for chat in Chat.query.join(User_chat).filter(User_chat.chat_id == chat_id).first()}


@chat_routes.route('/users/<int>:user_id')
@login_required
def load_chats(user_id):
    '''
    Simple function to retreive all chats associated with a user
    '''
    sent = {chat.id: chat.to_dict()
            for chat in User_chat.query.filter(User_chat.sender_id == user_id).all()}
    received = {chat.id: chat.to_dict() for chat in User_chat.query.filter(
        User_chat.recipient_ids == user_id).all()}
    return {**sent, **received}


#! Might not be needed due to websockets
@chat_routes.route('/', methods=["POST"])
@login_required
def chat():
    # get all users for form select field
    recipients_list = [(user.id, user.username) for user in User.query.all()]
    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form.recipients.choices = recipients_list
    form = MessageForm()
    if form.validate_on_submit():
        chat = User_chat(sender_id=current_user.id,
                         recipient_ids=form.data['recipient_ids'],
                         chat_id=form.data['chat_id'], is_read=False)
        return chat.to_dict()


@chat_routes.route('/<int>:id', methods=['DELETE'])
@login_required
def delete_chat(id):
    '''
    Delete Chat from database
    '''
    chat = Chat.query.get(id)
    Chat.query.filter(Chat.id == id).delete()
    db.session.commit()
    return str(id), 201
