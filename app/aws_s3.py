import boto3
import botocore
from .config import Config

# These are the allowed file types, edit this part to fit your needs
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'svg', 'gif'}

s3 = boto3.client(
    "s3",
    aws_access_key_id=Config.S3_KEY,
    aws_secret_access_key=Config.S3_SECRET
)


def upload_file_to_s3(file, bucket_name, acl="public-read"):

    try:

        s3.upload_fileobj(
            file,
            bucket_name,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )

    except Exception as e:
        # This is a catch all exception, edit this part to fit your needs.
        print("Something Happened: ", e)
        return e

    return f"{Config.S3_LOCATION}{file.filename}"


def allowed_file(filename):
    return '.' in filename and filename.split('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# def upload_file(file_name, bucket):
#     """
#     Function to upload a file to an S3 bucket
#     """
#     object_name = file_name
#     s3_client = boto3.client('s3')
#     response = s3_client.upload_file(file_name, bucket, object_name)

#     return response


# def download_file(file_name, bucket):
#     """
#     Function to download a given file from an S3 bucket
#     """
#     s3 = boto3.resource('s3')
#     output = f"downloads/{file_name}"
#     s3.Bucket(bucket).download_file(file_name, output)

#     return output


# def list_files(bucket):
#     """
#     Function to list files in a given S3 bucket
#     """
#     s3 = boto3.client('s3')
#     contents = []
#     for item in s3.list_objects(Bucket=bucket)['Contents']:
#         contents.append(item)

#     return contents
