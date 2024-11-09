__import__('pysqlite3')
import sys
sys.modules['sqlite3'] = sys.modules.pop('pysqlite3')

import time, torch
from transformers import CLIPModel, CLIPProcessor, CLIPConfig, CLIPTokenizer
import requests, os
import chromadb
from chromadb import EmbeddingFunction
from chromadb.api.types import Embedding
from typing import cast
from PIL import Image

CHROMADB_URL = os.getenv('CHROMADB_URL', 'http://chromadb:8000')
chroma_client = chromadb.HttpClient(host='chromadb', port='8000')
collection = chroma_client.get_or_create_collection(name='clip')

POLLING_URL = os.getenv('POLLING_URL', None)
print("model Initialized")
MODEL_NAME = "clip"
device = 'cuda:0' 

model_id = "zer0int/CLIP-GmP-ViT-L-14"
model_cls = CLIPModel.from_pretrained(model_id).to(device)
config_cls = CLIPConfig.from_pretrained(model_id)
processor_cls = CLIPProcessor.from_pretrained(model_id)
tokenizer = CLIPTokenizer.from_pretrained(model_id)


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
    image = Image.open(img_path).convert("RGB")
    with torch.inference_mode():
        inputs = processor_cls(text=['three'], images=image, return_tensors="pt", padding=True).to(device)
        embedding_objs = model_cls(**inputs).image_embeds

    emb = embedding_objs
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