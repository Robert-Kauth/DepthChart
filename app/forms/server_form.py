from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.fields.html5 import URLField
from wtforms.validators import DataRequired, ValidationError


class ServerForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    icon = URLField('icon')
