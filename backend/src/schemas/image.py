from pydantic import BaseModel
from datetime import datetime
from models.image import Status


class UploadImageResponse(BaseModel):
    id: int
    name: str
    status: Status
    created_at: datetime


class GetImageResponse(BaseModel):
    id: int
    name: str
    status: Status
    created_at: datetime
    uploaded_at: datetime
    s3_path: str


class GetImagesListResponse(BaseModel):
    id: int
    name: str
    s3_path: str

class PollingResponse(BaseModel):
    id: int
    s3_path: str
    img_callback_url: str

class ImageFileResponse(BaseModel):
    id: int
    file_link: str