from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, InputRequired


class CommunicationForm(FlaskForm):
    recipients = SelectField('recipients', coerce=int,
                             validators=[InputRequired()])
    content = StringField('content', validators=[DataRequired()])
