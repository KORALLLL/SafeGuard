import os
import requests
from tqdm import tqdm
from bs4 import BeautifulSoup as bs
from urllib.parse import urljoin, urlparse
import mimetypes
from django.core.management.base import BaseCommand
from app.models import Image  # Импортируйте модель Image
from django.core.files import File


def is_valid(url):
    parsed = urlparse(url)
    return bool(parsed.netloc) and bool(parsed.scheme)


def get_all_images(url):
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
    soup = bs(requests.get(url, headers=headers).content, "html.parser")
    urls = []
    for img in tqdm(soup.find_all("img"), "Поиск изображений"):
        img_url = img.attrs.get("src")
        if not img_url:
            continue
        img_url = urljoin(url, img_url)
        try:
            pos = img_url.index("?")
            img_url = img_url[:pos]
        except ValueError:
            pass
        if is_valid(img_url):
            urls.append(img_url)
    return urls


def download_image(url, pathname='images/'):
    # Создаём папку только если она ещё не существует
    if not os.path.isdir(pathname):
        os.makedirs(pathname)

    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
    response = requests.get(url, stream=True, headers=headers)
    file_size = int(response.headers.get("Content-Length", 0))

    content_type = response.headers.get("Content-Type")
    if content_type and "image" in content_type:
        ext = mimetypes.guess_extension(content_type)
    else:
        ext = os.path.splitext(urlparse(url).path)[1]

    if not ext:
        ext = ".jpg"

    filename = os.path.join(pathname, os.path.basename(urlparse(url).path))
    if not filename.lower().endswith(ext):
        filename += ext

    # Проверяем, существует ли файл, чтобы избежать повторной загрузки
    if os.path.exists(filename):
        return filename

    progress = tqdm(response.iter_content(1024), f"Загружен {filename}", total=file_size, unit="B", unit_scale=True,
                    unit_divisor=1024)
    with open(filename, "wb") as f:
        for data in progress.iterable:
            f.write(data)
            progress.update(len(data))

    return filename


class Command(BaseCommand):
    help = "Fetches all images from a given URL and saves them in the database"

    def handle(self, *args, **kwargs):
        url = 'https://wallpaperio.net/category/4k-oboi'
        path = 'images/'

        # Получаем все URL изображений
        imgs = get_all_images(url)

        for img_url in imgs:
            local_path = download_image(img_url, path)

            # Сохраняем изображение в модели
            with open(local_path, "rb") as img_file:
                # Создаем объект Django File
                img_file_django = File(img_file)
                # Сохраняем файл через Image model
                Image.objects.create(img=img_file_django)

            self.stdout.write(self.style.SUCCESS(f"Сохранено изображение: {local_path}"))
