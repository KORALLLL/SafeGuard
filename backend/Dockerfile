FROM python:3.10

WORKDIR /app

<<<<<<< HEAD

RUN apt-get update && apt-get install -y sqlite3
=======
RUN apt-get update && apt-get install -y sqlite3

>>>>>>> fix
COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

<<<<<<< HEAD
ENTRYPOINT [ "sh", "-c", "python manage.py makemigrations app && python manage.py migrate && python manage.py runserver 0.0.0.0:8000" ]
=======
ENTRYPOINT [ "sh", "-c", "python manage.py makemigrations app && python manage.py migrate && python manage.py runserver 0.0.0.0:8000" ]
>>>>>>> fix
