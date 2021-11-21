import os
from flask import Flask, request, redirect
from .socket import socketio
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from flask_avatars import Avatars

# Models
from .models import db, User

# Routes
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.server_routes import server_routes
from .api.user_server_routes import user_server_routes
from .api.channel_routes import channel_routes

from .seeds import seed_commands

from .config import Config

# Initialize flask app instance
app = Flask(__name__)


# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about seed commands
app.cli.add_command(seed_commands)

# Initialize app envirionment configuration
app.config.from_object(Config)


app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(server_routes, url_prefix='/api/servers')
app.register_blueprint(user_server_routes, url_prefix='/api/user_servers')
app.register_blueprint(channel_routes, url_prefix='/api/channels')
db.init_app(app)
Migrate(app, db)

# Initialize flask socketio instance
socketio.init_app(app)

# Initializes flask avatars
avatars = Avatars(app)

# Application Security
CORS(app)


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
@app.before_request
def https_redirect():
    '''
    Changes request made in production from http to https
    '''
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    '''
    Injects csrf_token into response and sets CORS options in production
    '''
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    '''
    Sends favicon if requested and react app otherwise
    '''
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')


# Initializes socketio on app startup
if __name__ == '__main__':
    socketio.run(app)
