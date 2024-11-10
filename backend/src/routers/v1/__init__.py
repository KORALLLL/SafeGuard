from fastapi import APIRouter
from routers.v1.router import router as base_router


router = APIRouter(prefix="/v1")
router.include_router(base_router)

