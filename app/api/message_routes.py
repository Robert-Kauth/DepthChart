from flask import Blueprint
from flask_login import login_required, current_user
from app.models import db, Message, User_message
from app.forms import MessageForm
