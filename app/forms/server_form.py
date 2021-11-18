from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.fields.html5 import URLField
from wtforms.validators import DataRequired


class ServerForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    topic = StringField('topic')
    icon = URLField('icon')
