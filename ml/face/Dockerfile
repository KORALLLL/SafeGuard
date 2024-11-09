FROM python:3.10

ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /app

COPY requirements.txt .
RUN apt-get update && \
    apt-get install -y python3 python3-pip&& \
    pip install --upgrade pip 
    
RUN pip install -r requirements.txt

RUN pip install pysqlite3-binary 

RUN apt-get install -y libgl1

COPY . .

CMD ["python", "app.py"]
