FROM nvidia/cuda:11.8.0-cudnn8-runtime-ubuntu20.04

ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /app

COPY requirements.txt .
RUN apt-get update && \
    apt-get install -y python3.10 python3-pip&& \
    pip install --upgrade pip 
    
RUN pip install -r requirements.txt

RUN pip install pysqlite3-binary 

COPY . .

CMD ["python3", "app.py"]
