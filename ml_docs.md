# Документация для проекта машинного обучения

## Описание

В этом проекте используются две модели для обработки изображений и лицевых данных: CLIP и DeepFace. Эти модели обрабатывают изображения, извлекают эмбеддинги и сохраняют их в базе данных. Процесс взаимодействия с сервером осуществляется через polling и API, где запросы отправляются и результаты обрабатываются асинхронно.

## Структура проекта

Проект состоит из двух основных частей:
1. **CLIP (clip/app.py)**: модель CLIP для обработки изображений и извлечения эмбеддингов.
2. **DeepFace (face/app.py)**: модель DeepFace для распознавания лиц и извлечения эмбеддингов.

## Основные компоненты

1. **CLIP (clip/app.py)**:
   - Использует модель CLIP от компании OpenAI для обработки изображений и извлечения эмбеддингов.
   - Хранит эмбеддинги изображений в базе данных ChromaDB.
   - Ожидает URL изображения через polling и обрабатывает его.
   - Отправляет обратно результат с идентификаторами похожих изображений.

2. **DeepFace (face/app.py)**:
   - Использует модель DeepFace для распознавания лиц на изображениях.
   - Хранит эмбеддинги лиц в базе данных ChromaDB.
   - Ожидает URL изображения через polling и обрабатывает его.
   - Отправляет обратно результат с идентификаторами похожих лиц.

## Основные функции

### CLIP (clip/app.py)

```python
def get_non_empty_response(url):
    while True:
        try:
            response = requests.get(url)
            if response.status_code == 200 and response.json():
                return response.json()
        except Exception as e:
            logging.error(f"Error while polling for response: {e}")
        time.sleep(2)
```

Функция получает ответ от сервера через polling. Ожидает, пока не будет получен непустой ответ (json с данными).

```python
def send_json_back(url, data):
    try:
        logging.info(f"Sending data to {url}")
        response = requests.get(url, json=data)
        if response.status_code == 200:
            logging.info("JSON sent successfully!")
        else:
            logging.error(f"Failed to send JSON: {response.status_code}")
    except Exception as e:
        logging.error(f"Error sending JSON: {e}")
```
Функция отправляет данные на указанный URL в формате JSON.

```python
def download_image(image_url, save_path='image.jpg'):
    try:
        response = requests.get(image_url, stream=True)
        if response.status_code == 200:
            with open(save_path, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
            return save_path
        else:
            logging.error(f"Failed to download image: {response.status_code}")
    except Exception as e:
        logging.error(f"Error downloading image: {e}")
        return None
```

Функция загружает изображение с указанного URL и сохраняет его на диск.

```def compute_and_add_in_db(img_path, img_id):
    image = Image.open(img_path).convert("RGB")
    with torch.inference_mode():
        inputs = processor_cls(text=['three'], images=image, return_tensors="pt", padding=True).to(device)
        embedding_objs = model_cls(**inputs).image_embeds

    emb = embedding_objs.clone()
    emb /= emb.norm(dim=-1)

    emb = cast(Embedding, emb.squeeze().cpu().numpy())
    collection.add(
        embeddings=[emb],
        ids=[img_id]
    )
    return emb
```

Функция обрабатывает изображение, извлекает эмбеддинг с помощью модели CLIP и добавляет его в базу данных ChromaDB.

```python

def get_data(img_path, img_id):
    emb = compute_and_add_in_db(img_path, img_id)

    embeds = collection.query(
        query_embeddings=[emb],
        n_results=20
    )
    json_res = {
        "result": embeds['ids']
    }
    logging.info(f"Querying database for similar images. Results: {json_res}")
    return json_res
```

Функция извлекает эмбеддинг изображения, выполняет поиск по базе данных ChromaDB и возвращает идентификаторы похожих изображений.

```python
def main():
    polling_url = os.path.join(POLLING_URL, MODEL_NAME)

    while True:
        response_data = get_non_empty_response(polling_url)

        if 's3_path' in response_data:
            img_url = response_data['s3_path']
            img_path = download_image(img_url)
            if img_path is None:
                time.sleep(5)
                continue

            processed_data = get_data(img_path, str(response_data['id']))

            return_url = response_data['img_callback_url']
            send_json_back(return_url, processed_data)

        time.sleep(5)
```
Основная функция, которая запускает polling для получения изображений, их обработки и отправки результатов обратно на сервер.


### DeepFace (face/app.py)

```python
def get_non_empty_response(url):
    while True:
        try:
            response = requests.get(url)
            if response.status_code == 200 and response.json():
                return response.json()
        except Exception as e: print("error", e)
        time.sleep(2)
```
Функция получает ответ от сервера через polling, аналогично функции в CLIP.

```python
def send_json_back(url, data):
    try:
        response = requests.get(url, json=data)
        if response.status_code == 200:
            print("JSON sent successfully!")
        else:
            print("Failed to send JSON:", response.status_code)
    except Exception as e:
        print("Error sending JSON:", e)
```

Отправляет результат на сервер.

```python
def download_image(image_url, save_path='image.jpg'):
    try:
        response = requests.get(image_url, stream=True)
        if response.status_code == 200:
            with open(save_path, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
            return save_path
        else:
            print("Failed to download image:", response.status_code)
    except Exception as e:
        print("Error downloading image:", e)
        return None
```

Загружает изображение с указанного URL и сохраняет его.

```python
def compute_and_add_in_db(img_path, img_id):
    embedding_objs = DeepFace.represent(
        model_name="GhostFaceNet",
        img_path=img_path,
    )[0]['embedding']
    emb = torch.Tensor(embedding_objs)
    emb /= emb.norm(dim=-1)

    emb = cast(Embedding, emb.squeeze().cpu().numpy())
    collection.add(
        embeddings=[emb],
        ids=[img_id]
    )
    return emb
```

Извлекает эмбеддинг с помощью модели DeepFace и добавляет его в базу данных ChromaDB.

```python
def get_data(img_path, img_id):
    emb = compute_and_add_in_db(img_path, img_id)

    embeds = collection.query(
        query_embeddings=[emb],
        n_results=20
    )
    json_res = {
        "result": embeds['ids']
    }
    return json_res
```
Функция для обработки изображения и поиска похожих лиц в базе данных.

```python
def main():
    polling_url = os.path.join(POLLING_URL, MODEL_NAME)

    while True:
        response_data = get_non_empty_response(polling_url)

        if 's3_path' in response_data:
            img_url = response_data['s3_path']
            img_path = download_image(img_url)
            if img_path is None:
                time.sleep(5)
                continue

            processed_data = get_data(img_path, str(response_data['id']))

            return_url = response_data['img_callback_url']
            send_json_back(return_url, processed_data)

        time.sleep(5)
```

Основная функция для обработки изображений и отправки результатов через polling.

## Запуск

1. Убедитесь, что все зависимости установлены (например, `torch`, `transformers`, `chromadb`, `requests`, `deepface`).

2. Запустите соответствующий файл для CLIP или DeepFace:

Для CLIP:
```bash
python clip/app.py
```
Для DeepFace:
```bash
python face/app.py
```

3. Ожидайте обработки изображений, получение результатов и отправку обратно через указанный callback URL.

## Важные замечания

* Для обоих приложений необходимо настроить переменные окружения:

    * `CHROMADB_URL`: адрес ChromaDB для хранения эмбеддингов.
    * `POLLING_URL`: URL для получения данных из внешней системы.

* Модели CLIP и DeepFace требуют GPU для эффективной работы, поэтому убедитесь, что ваша среда настроена для работы с CUDA.