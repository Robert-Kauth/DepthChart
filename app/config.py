import os
import re


def database_url(url):
    '''
    Selects the psycopg 3 driver for Heroku-style postgres:// URLs and
    plain postgresql:// URLs, which SQLAlchemy would map to psycopg2
    '''
    return re.sub(r'^postgres(ql)?://', 'postgresql+psycopg://', url)


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = database_url(os.environ.get('DATABASE_URL'))
    SQLALCHEMY_ECHO = True

    S3_BUCKET = os.environ.get("S3_BUCKET_NAME")
    S3_KEY = os.environ.get("S3_ACCESS_KEY")
    S3_SECRET = os.environ.get("S3_SECRET_ACCESS_KEY")
    S3_LOCATION = f"http://{S3_BUCKET}.s3.amazonaws.com/"
