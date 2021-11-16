import os


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL').replace('postgres://', 'postgresql://')
    SQLALCHEMY_ECHO = True

# TODO add S3 integration
    # S3_BUCKET = os.environ.get("S3_BUCKET_NAME")
    # S3_KEY = os.environ.get("S3_ACCESS_KEY")
    # S3_SECRET = os.environ.get("S3_SECRET_ACCESS_KEY")
    # S3_LOCATION = f"http://speak-easy.s3.amazonaws.com/"
