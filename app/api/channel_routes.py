from flask import Blueprint
from flask_login import login_required, current_user
from app.models import db, Channel


channel_routes = Blueprint('channels', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@channel_routes.route('/')
@login_required
def loadChanels():
    '''
    Loads all channels
    '''
    return {channel.id: channel.to_dict() for channel in Channel.query.all()}
