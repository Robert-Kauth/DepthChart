from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, InputRequired

#! can be use for both messages and chats
#! consider renaming to be something more general when you have the time


class MessageForm(FlaskForm):
    recipients = SelectField('recipients', coerce=int,
                             validators=[InputRequired()])
    content = StringField('content', validators=[DataRequired()])
