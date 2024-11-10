from models.base import Base
from datetime import datetime
from enum import Enum, StrEnum

from sqlalchemy import Integer, TIMESTAMP, func
from sqlalchemy.dialects.postgresql import ENUM
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import Mapped, mapped_column

from sqlalchemy import Column, Integer, ForeignKey, String
from sqlalchemy.orm import relationship

from settings import settings
from s3 import s3


class Status(StrEnum):
    CREATED = "CREATED"
    UPLOADED = "UPLOADED"
    PROCESSING = "PROCESSING"
    PROCESSED = "PROCESSED"


class Source(StrEnum):
    INNER = "INNER"
    OUTER = "OUTER"

class ModelName(StrEnum):
    CLIP = "CLIP"
    DEEPFACE = "DEEPFACE"


apply_status_type = ENUM("CREATED", "UPLOADED", "PROCESSING", "PROCESSED",
                         name="apply_status_type",
                         metadata=Base.metadata)

apply_source_type = ENUM("INNER", "OUTER",
                         name="apply_source_type",
                         metadata=Base.metadata)

apply_model_type = ENUM("CLIP", "DEEPFACE",
                         name="apply_model_type",
                         metadata=Base.metadata)


class Image(Base):
    __tablename__ = "images"

    id: Mapped[int] = mapped_column(Integer, autoincrement=True, primary_key=True)
    name: Mapped[str | None] = mapped_column(index=True, nullable=True)
    status: Mapped[Status] = mapped_column(apply_status_type)
    created_at: Mapped[datetime] = mapped_column(TIMESTAMP(timezone=True), nullable=False,
                                                 server_default=func.current_timestamp())
    uploaded_at: Mapped[datetime] = mapped_column(TIMESTAMP(timezone=True), nullable=True)
    image_path: Mapped[str]
    model_type: Mapped[str] = mapped_column(apply_model_type)

    @hybrid_property
    def file_link(self):
        if self.image_path not in (None, ""):
            return s3.generate_link(
                bucket=settings.aws_bucket,
                key=self.image_path,
            )
        return ""
    
class ImageProcessingResult(Base):
    __tablename__ = "image_processing_results"

    id: Mapped[int] = mapped_column(Integer, autoincrement=True, primary_key=True)
    image_id: Mapped[int] = mapped_column(Integer, ForeignKey("images.id"))
    result_image_id: Mapped[int] = mapped_column(Integer)
