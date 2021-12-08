
import boto3
import botocore
from flask import Blueprint, request, flash
from flask_login import login_required, current_user
from app.forms import FollowForm

from app.config import Config
from app.aws_s3 import upload_file_to_s3
from app.aws_s3 import *
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
    return str(id), 201


@user_routes.route('/follow/<int:user_id>', methods=["POST"])
@login_required
def follow_user(user_id):
    form = FollowForm()
    if form.validate_on_submit():
        user = User.query.filter(User.id == user_id).first()
        if user is None:
            flash(f"User {user_id} not found")
            return {'errors': "User Not Found"}
        if user == current_user.id:
            flash(f"You can not follow your self")
            return {'errors': "You can not follow yourself"}
        current_user.follow(user)
        db.session.commit()
        username = user.username
        flash(f'You are now following {username}')
        return {user.id: user.to_dict()}


@user_routes.route('/unfollow/<int:user_id>', methods=["POST"])
@login_required
def unollow_user(user_id):
    form = FollowForm()
    if form.validate_on_submit():
        user = User.query.filter(User.id == user_id).first()
        if user is None:
            flash(f"User {user_id} not found")
            return {'errors': "User Not Found"}
        if user == current_user:
            flash(f"You can not follow your self")
            return {'errors': "You can not follow yourself"}
        current_user.unfollow(user)
        db.session.commit()
        username = user.username
        flash(f"You stopped being friends with {username} ")
        return str(user_id)


@user_routes.route('/<int:id>', methods=["POST"])
@login_required
def upload_file():
    if "file" not in request.files:
        return "No user_file key in request.files"

    file = request.files["file"]

    if file:
        file_url = upload_file_to_s3(file, Config.S3_BUCKET)
        # create an instance of <Your_Model>
        file = User(
            user_id=request.form.get('user_id'),
            # extract any form fields you've appended to the
            # body of your POST request
            # i.e.
            url=file_url
        )
        db.session.add(file)
        db.session.commit()
        return file.to_dict()
    else:
        return "No File Attached!"
