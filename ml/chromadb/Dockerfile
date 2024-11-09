FROM python:3.10

WORKDIR /app

RUN pip install chromadb

CMD ["chroma", "run", "--host", "0.0.0.0", "--port", "8000"]