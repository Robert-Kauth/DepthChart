from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Chat, User_chat


chat_routes = Blueprint('chats', __name__)


@chat_routes.route('/<int>:chat_id')
# @login_required
def load_chat(chat_id):
    '''
    Simple function to retreive a single chat and all its associated data
    '''
    return {chat.id: chat.to_dict() for chat in Chat.query.join(User_chat).filter(User_chat.chat_id == chat_id).first()}


@chat_routes.route('users/<int>:user_id')
# @login_required
def load_chat(user_id):
    '''
    Simple function to retreive all chats associated with a user
    '''
    sent = {chat.id: chat.to_dict()
            for chat in User_chat.query.filter(User_chat.sender_id == user_id).all()}
    received = {chat.id: chat.to_dict() for chat in User_chat.query.filter(
        User_chat.recipient_ids == user_id).all()}
    return {**sent, **received}


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
