from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, InputRequired
from app.models import User


class MessageForm(FlaskForm):
    recipient_ids = SelectField('recipient_ids', coerce=int,
                                validators=[InputRequired()])
    message = StringField('message', validators=[DataRequired()])
