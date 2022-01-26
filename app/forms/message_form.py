from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired


class MessageForm(FlaskForm):
    recipient_id = IntegerField('recipient_id')
    content = StringField('content', validators=[DataRequired()])
    sender_id = IntegerField('sender_id', validators=[DataRequired()])
    is_channel_message = BooleanField('is_channel_message')
    channel_id = IntegerField('channel_id')
