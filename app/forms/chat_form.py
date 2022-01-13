from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class ChatForm(FlaskForm):
    content = StringField('content', validators=[DataRequired()])
    sender_id = IntegerField('sender_id', validators=[DataRequired()])
    recipient_ids = IntegerField('recipient_ids', validators=[DataRequired()])
