from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class MessageForm(FlaskForm):
    recipient_id = IntegerField('recipient_id')
    content = StringField('content', validators=[DataRequired()])
    sender_id = IntegerField('sender_id')
    channel_id = IntegerField('channel_id')
