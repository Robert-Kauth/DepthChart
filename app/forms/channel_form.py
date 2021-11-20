from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.fields.html5 import URLField
from wtforms.validators import DataRequired


class ChannelForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    server_id = IntegerField('server_id', validators=[DataRequired()])
    topic = StringField('topic', validators=[DataRequired()])
    icon = URLField('icon')
