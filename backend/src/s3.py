import boto3
import botocore
import botocore.exceptions
from io import BytesIO
from settings import settings


class S3:
    def __init__(self):
        self.session = boto3.session.Session(
            aws_access_key_id=settings.aws_access_key,
            aws_secret_access_key=settings.aws_secret_access_key,
            region_name=settings.aws_region,
        )
        self.s3client = self.session.client(
            service_name="s3",
            endpoint_url=settings.aws_host,
        )
        self.create_bucket()

    def has_file(self, fileid: str):
        try:
            self.s3client.head_object(Bucket=settings.aws_bucket, Key=fileid)
            return True
        except botocore.exceptions.ClientError:
            return False

    def upload_file(self, file, fileid: str):
        with BytesIO(file) as f:
            self.s3client.upload_fileobj(f, settings.aws_bucket, fileid)

    def download_file(self, file, fileid: str):
        try:
            self.s3client.head_object(Bucket=settings.aws_bucket, Key=fileid)
            self.s3client.download_fileobj(settings.aws_bucket, fileid, file)
            file.seek(0)
        except botocore.exceptions.ClientError:
            raise FileNotFoundError("File not found")

    def delete_file(self, fileid: str):
        self.s3client.delete_object(Bucket=settings.aws_bucket, Key=fileid)

    def create_bucket(self):
        try:
            self.s3client.create_bucket(Bucket=settings.AWS_BUCKET)
        except:
            pass

    def generate_link(self, bucket, key):
        return self.s3client.generate_presigned_url(
            ClientMethod="get_object",
            Params={"Bucket": bucket, "Key": key},
            ExpiresIn=3600,
        )


s3 = S3()
