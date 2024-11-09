FROM nvidia/cuda:11.8.0-cudnn8-runtime-ubuntu20.04

ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /app

COPY requirements.txt .
RUN apt-get update && \
    apt-get install -y python3.10 python3-pip&& \
    pip install --upgrade pip 
    
RUN pip install -r requirements.txt

COPY . .

RUN pip install pysqlite3-binary 

RUN apt-get install -y wget build-essential tcl && \
    wget https://www.sqlite.org/2024/sqlite-autoconf-3420000.tar.gz && \
    tar xvf sqlite-autoconf-3420000.tar.gz && \
    cd sqlite-autoconf-3420000 && \
    ./configure && \
    make && \
    make install

CMD ["python3", "app.py"]
