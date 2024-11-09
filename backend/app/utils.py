import logging
import boto3
import botocore
from django.conf import settings
from .models import CheckImage


class S3:
    def __init__(self):
        self.session = boto3.session.Session(
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.AWS_REGION,
        )
        self.s3client = self.session.client(
            service_name="s3",
            endpoint_url=settings.AWS_S3_HOST,
        )
        self.create_bucket(settings.AWS_BUCKET_NAME)

    def has_file(self, fileid: str):
        try:
            self.s3client.head_object(Bucket=settings.AWS_BUCKET_NAME, Key=fileid)
            return True
        except botocore.exceptions.ClientError:
            return False

    def upload_file(self, file_obj, fileid: str):
        self.s3client.upload_fileobj(file_obj, settings.AWS_BUCKET_NAME, fileid)

    def download_file(self, file_obj, fileid: str):
        try:
            self.s3client.head_object(Bucket=settings.AWS_BUCKET_NAME, Key=fileid)
            self.s3client.download_fileobj(settings.AWS_BUCKET_NAME, fileid, file_obj)
            file_obj.seek(0)
        except botocore.exceptions.ClientError:
            raise FileNotFoundError("File not found")

    def delete_file(self, fileid: str):
        self.s3client.delete_object(Bucket=settings.AWS_BUCKET_NAME, Key=fileid)

    def create_bucket(self, name):
        try:
            try:
                self.s3client.head_bucket(Bucket=name)
                return
            except botocore.exceptions.ClientError:
                pass
            self.s3client.create_bucket(Bucket=name)
        except botocore.exceptions.ClientError as e:
            logging.error(f"Error creating bucket: {e}")
        except Exception as ex:
            logging.error(f"Unexpected error: {ex}")

    def generate_link(self, key):
        return self.s3client.generate_presigned_url(
            ClientMethod="get_object",
            Params={"Bucket": settings.AWS_BUCKET_NAME, "Key": key},
            ExpiresIn=3600,
        )


s3 = S3()


def upload_check_image_to_s3(check_image_id):
    try:
        check_image = CheckImage.objects.get(id=check_image_id)
        file_name = check_image.img.name
        with check_image.img.open("rb") as file_obj:
            s3.upload_file(file_obj, file_name)
            print(f"Image uploaded to S3 with key: {file_name}")
    except CheckImage.DoesNotExist:
        print("CheckImage with this ID does not exist.")
