import uvicorn
from fastapi.middleware.gzip import GZipMiddleware
from fastapi import FastAPI
from settings import settings
from routers import router
from core.db import create_tables

create_tables()
app = FastAPI(debug=settings.SERVER_TEST)
app.include_router(router)

app.add_middleware(
    GZipMiddleware,
    minimum_size=2000
)


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=settings.SERVER_ADDR,
        port=settings.SERVER_PORT,
        reload=settings.SERVER_TEST,
        log_level="debug" if settings.SERVER_TEST else "info",
    )
