from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class MessageForm(FlaskForm):
    recipients = StringField('recipients', validators=[DataRequired()])
    message = StringField('message')
