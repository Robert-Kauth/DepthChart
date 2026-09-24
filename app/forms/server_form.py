from flask_wtf import FlaskForm
from wtforms import StringField, URLField
from wtforms.validators import DataRequired, Length


class ServerForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(min=5)])
    topic = StringField('topic', validators=[DataRequired(), Length(min=5)])
    icon = URLField('icon')
