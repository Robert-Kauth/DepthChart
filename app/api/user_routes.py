
from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import db, User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    '''
    Returns normalized Users data
    '''
    return {user.id: user.to_dict() for user in User.query.all()}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    '''
    Finds user by id and returns user dict
    '''
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>', methods=["DELETE"])
def delete_user(id):
    '''
    Deletes user
    '''
    User.query.filter(User.id == id).delete()
    db.session.commit()
    return "True", 201

# AWS Config


@user_routes.route('/<int:id>', methods=["POST"])
@login_required
def upload_file(file_name, bucket):
    """
    Function to upload a file to an S3 bucket
    """
    object_name = file_name
    s3_client = boto3.client('s3')
    response = s3_client.upload_file(file_name, bucket, object_name)

    return response


@user_routes.route('/<int:id>', methods=["GET"])
@login_required
def download_file(file_name, bucket):
    """
    Function to download a given file from an S3 bucket
    """
    s3 = boto3.resource('s3')
    output = f"downloads/{file_name}"
    s3.Bucket(bucket).download_file(file_name, output)

    return output


def list_files(bucket):
    """
    Function to list files in a given S3 bucket
    """
    s3 = boto3.client('s3')
    contents = []
    for item in s3.list_objects(Bucket=bucket)['Contents']:
        contents.append(item)

    return contents
