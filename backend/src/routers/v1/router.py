from fastapi import APIRouter, Depends, UploadFile, HTTPException, status
from core.db import get_database, Session
from datetime import datetime, timezone
from uuid import uuid4
from models.image import Image, Status, ModelName, ImageProcessingResult
from schemas.image import UploadImageResponse, GetImageResponse, GetImagesListResponse, PollingResponse, ImageFileResponse
from s3 import s3
import core.errors as errors
from typing import List
from sqlalchemy import and_, exists, select, update

router = APIRouter()


@router.get("/image/all",
            response_model=List[GetImagesListResponse])
async def poll_images(status: Status,
                      db: Session = Depends(get_database)):
    images = db.query(Image).filter(Image.status == status).all()
    return [GetImagesListResponse(id=image.id,
                                  name=image.name,
                                  s3_path=image.image_path) for image in images]


@router.get("/image/{image_id}",
            response_model=GetImageResponse)
async def get_image(image_id: int,
                    db: Session = Depends(get_database)):
    image = db.query(Image).filter(Image.id == image_id).first()
    if image is None:
        raise errors.image_not_found()
    return GetImageResponse(id=image.id,
                            name=image.name,
                            status=image.status,
                            created_at=image.created_at,
                            uploaded_at=image.uploaded_at,
                            s3_path=image.file_link)


@router.post("/image",
             response_model=UploadImageResponse)
async def upload_image(name: str,
                       file: UploadFile,
                       model_name: ModelName,
                       db: Session = Depends(get_database)):

    now = datetime.now(tz=timezone.utc)
    image_location = f"images/{uuid4()}_{file.filename}"
    s3.upload_file(file.file.read(), image_location)
    created_image = Image(
        name=name,
        status=Status.UPLOADED,
        uploaded_at=now,
        image_path=image_location,
        model_type=model_name
    )
    db.add(created_image)
    db.commit()

    return UploadImageResponse(
        id=created_image.id,
        name=created_image.name,
        status=created_image.status,
        created_at=created_image.created_at,
    )

@router.get("/image/poll/{model_name}", response_model=PollingResponse)
async def handle_polling_for_images(
    model_name: ModelName,  # Используем модель, чтобы передавать имя модели
    db: Session = Depends(get_database)
):

    executed = db.execute(
        select(Image)
        .where(
            and_(
                Image.status == Status.UPLOADED,
                Image.model_type == model_name  
            )
        ).order_by(Image.id).limit(1)
    )
    result: Image | None = executed.scalar_one_or_none()

    if result is None:
        raise HTTPException(
            detail="No new images", status_code=status.HTTP_404_NOT_FOUND
        )
    result.status = Status.PROCESSING
    db.commit()
    db.refresh(result)
    
    return PollingResponse(
        id=result.id,
        s3_path=result.file_link,
        img_callback_url=f"http://restapi:8000/api/v1/image/{result.id}/processed"
    )


@router.get("/image/{image_id}/processed", response_model=dict)
async def image_processed(
    image_id: int,
    db: Session = Depends(get_database)
):
    image = db.query(Image).filter(Image.id == image_id).first()

    if image is None:
        raise HTTPException(status_code=status.HTTP_400_NOT_FOUND, detail="Image not found")
    stmt = (
        update(Image)
        .where(Image.id == image_id)
        .values(status=Status.PROCESSING)
    )
    db.execute(stmt)
    db.flush()
    db.commit()
    db.refresh(image)

    processed_images = db.query(Image).filter(Image.status == Status.PROCESSING).all()

    for img in processed_images:
        new_result = ImageProcessingResult(image_id=image.id, result_image_id=img.id)
        db.add(new_result)
    db.commit()

    return {
        'img_url': image.file_link,
        'return': 'true',
        'id': str(image.id),
        'result': [str(img.id) for img in processed_images]
    }

@router.get("/image/{image_id}/return_images", response_model=List[ImageFileResponse])
async def get_link(image_id: int, db: Session = Depends(get_database)):
    processing_images = db.query(ImageProcessingResult).filter(ImageProcessingResult.image_id == image_id).all()

    if not processing_images:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No images corresponding to anchor")
    
    response_files = []

    for result in processing_images:
        result_image = db.query(Image).filter(Image.id == result.result_image_id).first()

        if result_image is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Processed image with ID {result.result_image_id} not found")

        response_files.append(
            ImageFileResponse(
                id=result_image.id,
                file_link=result_image.file_link
            )
        )

    return response_files


