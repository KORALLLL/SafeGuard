from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    SERVER_ADDR: str = "0.0.0.0"
    SERVER_PORT: int = 8000
    SERVER_TEST: bool = True

    DB_USERNAME: str
    DB_PASSWORD: str
    DB_NAME: str
    DB_ADDR: str = "db"
    DB_PORT: int = 5432

    aws_host: str = "http://localhost:9000"
    aws_access_key: str = "minio"
    aws_secret_access_key: str = "minio123"
    aws_region: str | None = "us-east-1"
    aws_bucket: str = "image-data"


settings = Settings()
