FROM python:3.10

WORKDIR /app

RUN pip install chromadb

CMD ["chromadb", "start", "--host", "0.0.0.0", "--port", "8000"]