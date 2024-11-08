import time
import requests, os, torch
from deepface import DeepFace
import chromadb
from chromadb import Documents, EmbeddingFunction, Embedding
from typing import cast
import tensorflow as tf
tf.config.experimental.set_visible_devices([], 'GPU')

chroma_client = chromadb.HttpClient(host='0.0.0.0', port='8000')
collection = chroma_client.get_or_create_collection(name='clip')


def get_non_empty_response(url):
    while True:
        try:
            response = requests.get(url)
            if response.status_code == 200 and response.json():
                return response.json()
            print("Waiting for non-empty response...")
        except Exception as e: print("error", e)
        time.sleep(2)


def send_json_back(url, data):
    try:
        response = requests.post(url, json=data)
        if response.status_code == 200:
            print("JSON sent successfully!")
        else:
            print("Failed to send JSON:", response.status_code)
    except Exception as e:
        print("Error sending JSON:", e)


def download_image(image_url, save_path='image.jpg'):
    try:
        response = requests.get(image_url, stream=True)
        if response.status_code == 200:
            with open(save_path, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
            print(f"Downloaded image to {save_path}")
            return save_path
        else:
            print("Failed to download image:", response.status_code)
    except Exception as e:
        print("Error downloading image:", e)
        return None


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


def get_data(img_path, img_id):
    emb = compute_and_add_in_db(img_path, img_id)

    embeds = collection.query(
        query_embeddings=[emb],
        n_results=20
    )
    json_res = {
        "result": embeds.ids
    }
    return json_res


POLLING_URL = os.getenv('POLLING_URL', None)
print("model Initialized")
MODEL_NAME = "deepface"


def main():
    polling_url = os.path.join(POLLING_URL, MODEL_NAME)

    while True:
        response_data = get_non_empty_response(polling_url)

        if 'img_url' in response_data:
            img_url = response_data['img_url']
            img_path = download_image(img_url)
            if img_path is None:
                time.sleep(5)
                continue

            return_type = response_data['return']
            if return_type == 'true':
                processed_data = get_data(img_path, response_data['id'])

            else:
                _ = compute_and_add_in_db(img_path, response_data['id'])
                processed_data = {"status": "ok"}

            return_url = response_data['json_callback_url'] + "/" + MODEL_NAME
            send_json_back(return_url, processed_data)

        time.sleep(5)


if __name__ == "__main__":
    main()