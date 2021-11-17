from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.fields.html5 import URLField
from wtforms.validators import DataRequired, ValidationError
from app.models import Server


def name_exists(form, field):
    '''
    Checks if server name already exits in database
    '''
    name = field.data
    server = Server.query.filter(Server.name == name).first()
    if server:
        raise ValidationError('Server name is already in use')


class ServerAddForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    topic = StringField('topic')
    icon = URLField('icon')
