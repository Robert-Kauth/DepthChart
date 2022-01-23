from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

#! removed validators=[DataRequired()] should be added back on once loading chats from DB is worked out


class ChatForm(FlaskForm):
    content = StringField('content')
    sender_id = IntegerField('sender_id')
    recipient_id = IntegerField('recipient_id')
