from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.fields.html5 import URLField
from wtforms.validators import DataRequired, Length


class ChannelForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(min=5)])
    server_id = IntegerField('server_id', validators=[DataRequired()])
    topic = StringField('topic', validators=[DataRequired(), Length(min=5)])
    icon = URLField('icon')
