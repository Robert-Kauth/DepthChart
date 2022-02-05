from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from random import choice
from email_validator import validate_email

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually so validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.email.data).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/validate_email/<string:email>')
def user_exists(email):
    '''
    Checks if user email already exists in database
    '''
    valid_email = validate_email(email)
    if validate_email:
        user = User.query.filter(User.email == email).first()
        
        if user is not None:
            return {'is_email_unique': email, 'is_user': user.to_dict()}
        else:
            return {'is_email_unique': email, 'is_user': False}
    


@auth_routes.route('/validate_username/<string:username>')
def username_exists(username):
    '''
    Checks if username already exists in database
    '''
    user = User.query.filter(User.username == username).first()
    if user is not None:
        return {'is_username_unique': False, 'is_user': True}
    else:
        return {'is_username_unique': username, 'is_user': False}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        avatar = form.avatar.data
        if avatar == '':
            avatars = [
                'https://fantasydepthchart.s3.us-west-1.amazonaws.com/Avatars/defaults/yellow-discord-icon.png',
                'https://fantasydepthchart.s3.us-west-1.amazonaws.com/Avatars/defaults/red-discord-icon.png',
                'https://fantasydepthchart.s3.us-west-1.amazonaws.com/Avatars/defaults/orange-discord-icon.png',
                'https://fantasydepthchart.s3.us-west-1.amazonaws.com/Avatars/defaults/green-discord-icon.png',
                'https://fantasydepthchart.s3.us-west-1.amazonaws.com/Avatars/defaults/gray-discord-icon.png',
                'https://fantasydepthchart.s3.us-west-1.amazonaws.com/Avatars/defaults/blue-discord-icon.png']
            user = User(
                username=form.username.data,
                email=form.email.data,
                password=form.password.data,
                avatar=choice(avatars)
            )
            db.session.add(user)
            db.session.commit()
            login_user(user)
            return user.to_dict()
        else:
            user = User(
                username=form.username.data,
                email=form.email.data,
                password=form.password.data,
                avatar=form.avatar.data
            )
            db.session.add(user)
            db.session.commit()
            login_user(user)
            return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
