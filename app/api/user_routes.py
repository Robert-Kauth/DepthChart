from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import db, User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    '''
    Returns normalized Users data
    '''
    return {user.id: user.to_dict() for user in User.query.all()}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    '''
    Finds user by id and returns user dict
    '''
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>', methods=["DELETE"])
def delete_user(id):
    '''
    Deletes user
    '''
    User.query.filter(User.id == id).delete()
    db.session.commit()
    return "True", 201
