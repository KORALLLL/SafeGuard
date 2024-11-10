import streamlit as st
import os
import torch
from torchvision import transforms
from PIL import Image
from transformers import CLIPModel, CLIPProcessor
import torch.nn.functional as F
import cv2
import supervision as sv
from ultralytics import YOLO
import numpy as np
from deepface import DeepFace
from sklearn.metrics.pairwise import cosine_similarity
import matplotlib.pyplot as plt
import tempfile


# Disable GPU for TensorFlow, if necessary
# import tensorflow as tf
# tf.config.experimental.set_visible_devices([], 'GPU')


HORIZONTAL_RED = "images/logo.png"
ICON_RED = "images/logo.png"
HORIZONTAL_BLUE = "images/logo.png"
ICON_BLUE = "images/logo.png"


st.logo("images/logo.png", icon_image="images/logo.png")


def chunk_list(lst, n):
    """Split a list into chunks of n elements."""
    for i in range(0, len(lst), n):
        yield lst[i:i + n]


device = 'cuda' if torch.cuda.is_available() else 'cpu'


@st.cache_resource
def load_clip_model():
    model_id = "zer0int/CLIP-GmP-ViT-L-14"
    model_cls = CLIPModel.from_pretrained(model_id).to(device)
    processor_cls = CLIPProcessor.from_pretrained(model_id)
    return model_cls, processor_cls


model_cls, processor_cls = load_clip_model()


@st.cache_resource
def load_yolo_model():
    model_path = 'yolov10x_best.pt'  
    if not os.path.exists(model_path):
        st.error(f"YOLO model not found at path {model_path}.")
        return None
    model = YOLO(model_path)
    return model


yolo_model = load_yolo_model()


@st.cache_resource
def load_deepface_models():
    # DeepFace automatically loads necessary models on first use
    return True


deepface_loaded = load_deepface_models()


def get_embeddings(images):
    model_embs = []
    for img in images:
        with torch.inference_mode():
            inputs = processor_cls(text=['three'], images=img, return_tensors="pt", padding=True).to(device)
            outputs = model_cls(**inputs).image_embeds
            model_embs.append(outputs.squeeze(0))
    return model_embs


def display_anchor_and_targets(anchor_img, target_imgs, sim_scores):
    st.write(f"**Anchor Image**")
    st.image(anchor_img, caption='Anchor Image', use_container_width=True)

    st.write(f"**Top {len(target_imgs)} Similar Target Images**")
    cols = st.columns(len(target_imgs))
    for idx, (img, score) in enumerate(zip(target_imgs, sim_scores)):
        with cols[idx]:
            st.image(img, caption=f"Score: {score:.4f}", use_container_width=True) 


def extract_images(img):
    file_bytes = np.asarray(bytearray(img.read()), dtype=np.uint8)
    image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

    if image is None:
        st.error("Failed to read the uploaded image. Please try another file.")
        return []

    if yolo_model is None:
        st.error("YOLO model was not loaded correctly.")
        return []

    results = yolo_model(source=image, conf=0.4, iou=0.1)[0]

    detections = sv.Detections.from_ultralytics(results)

    box_annotator = sv.BoxAnnotator()
    label_annotator = sv.LabelAnnotator()

    annotated_image = box_annotator.annotate(
        scene=image.copy(), detections=detections)
    annotated_image = label_annotator.annotate(
        scene=annotated_image, detections=detections)

    cropped_images = []

    for idx, detection in enumerate(detections):
        x1, y1, x2, y2 = map(int, detection[0])
        cropped_object = image[y1:y2, x1:x2]
        object_label = detection[-1]["class_name"]

        if object_label == "Picture":
            cropped_images.append((f"Picture {idx+1}", cropped_object))
    return cropped_images


def compute_cosine_similarity(emb1, emb2):
    similarity = cosine_similarity([emb1], [emb2])[0][0]
    return similarity


def extract_face(img_path, facial_area):
    img = cv2.imread(img_path)
    x, y, w, h = facial_area['x'], facial_area['y'], facial_area['w'], facial_area['h']
    face = img[y:y+h, x:x+w]
    face_rgb = cv2.cvtColor(face, cv2.COLOR_BGR2RGB)
    return face_rgb


def main():
    st.title("SafeGuard")

    tab1, tab2, tab3 = st.tabs(["Image Similarity Search", "Extract Images from Image", "Face Matching"])

    with tab1:
        st.header("Image Similarity Search with CLIP")
        st.write("Upload anchor and target images.")

        st.subheader("Upload Anchor Images")
        anchor_files = st.file_uploader(
            "Select anchor images (PNG, JPG, JPEG)", 
            type=['png', 'jpg', 'jpeg'], 
            accept_multiple_files=True,
            key='anchor'
        )
        
        st.subheader("Upload Target Images")
        target_files = st.file_uploader(
            "Select target images (PNG, JPG, JPEG)", 
            type=['png', 'jpg', 'jpeg'], 
            accept_multiple_files=True,
            key='target'
        )

        compute_button = st.button("Compute Similarities", key='similarity')

        if 'anchor_images' not in st.session_state:
            st.session_state['anchor_images'] = []
        if 'target_images' not in st.session_state:
            st.session_state['target_images'] = []
        if 'anchor_embs' not in st.session_state:
            st.session_state['anchor_embs'] = None
        if 'target_embs' not in st.session_state:
            st.session_state['target_embs'] = None

        if compute_button:
            if anchor_files and target_files:
                anchor_images = []
                for f in anchor_files:
                    try:
                        img = Image.open(f).convert("RGB")
                        anchor_images.append(img)
                    except Exception as e:
                        st.warning(f"Failed to load {f.name}: {e}")
                
                target_images = []
                for f in target_files:
                    try:
                        img = Image.open(f).convert("RGB")
                        target_images.append(img)
                    except Exception as e:
                        st.warning(f"Failed to load {f.name}: {e}")

                if not anchor_images:
                    st.error("No valid anchor images were uploaded.")
                    return
                if not target_images:
                    st.error("No valid target images were uploaded.")
                    return

                st.session_state['anchor_images'] = anchor_images
                st.session_state['target_images'] = target_images

                with st.spinner("Calculating embeddings for anchor images..."):
                    anchor_model_embs = get_embeddings(anchor_images)
                with st.spinner("Calculating embeddings for target images..."):
                    target_model_embs = get_embeddings(target_images)

                anchor_model_embs = torch.stack(anchor_model_embs)
                target_model_embs = torch.stack(target_model_embs)
                anchor_model_embs = F.normalize(anchor_model_embs, p=2, dim=1)
                target_model_embs = F.normalize(target_model_embs, p=2, dim=1)

                st.session_state['anchor_embs'] = anchor_model_embs
                st.session_state['target_embs'] = target_model_embs

            else:
                st.warning("Please upload both anchor and target images.")

        if st.session_state.get('anchor_embs') is not None and st.session_state.get('target_embs') is not None:
            target_images = st.session_state['target_images']
            num_targets = len(target_images)
            max_possible = min(20, num_targets) if num_targets > 0 else 1
            default_value = min(5, max_possible)

            topk = st.slider(
                "Select the number of top target images for each anchor",
                min_value=1,
                max_value=max_possible,
                value=default_value
            )

            anchor_images = st.session_state['anchor_images']
            target_images = st.session_state['target_images']
            anchor_embs = st.session_state['anchor_embs']
            target_embs = st.session_state['target_embs']

            similarity_matrix = torch.mm(anchor_embs, target_embs.transpose(0, 1))  

            st.header("Results")
            for i, anchor_img in enumerate(anchor_images):
                sim_scores = similarity_matrix[i]  
                top_values, top_indices = torch.topk(sim_scores, topk)
                top_target_imgs = [target_images[idx] for idx in top_indices.cpu().numpy()]
                top_sim_scores = top_values.cpu().numpy()

                st.subheader(f"Anchor Image {i+1}")
                display_anchor_and_targets(anchor_img, top_target_imgs, top_sim_scores)
        else:
            st.info("Upload images and click the 'Compute Similarities' button.")

    with tab2:
        st.header("Extract Images from Uploaded Image")
        st.write("Upload an image to extract objects.")

        uploaded_file = st.file_uploader(
            "Select an image (PNG, JPG, JPEG)", 
            type=['png', 'jpg', 'jpeg'],
            key='extract'
        )


        if uploaded_file is not None:
            try:
                uploaded_image = Image.open(uploaded_file)
                st.subheader("Uploaded Image")
                st.image(uploaded_image, caption='Uploaded Image', use_container_width=True)
                # Сбросить указатель файла после открытия
                uploaded_file.seek(0)
            except Exception as e:
                st.error(f"Ошибка при открытии изображения: {e}")



        if st.button("Extract Images", key='extract_button'):
            if uploaded_file:
                with st.spinner("Processing image..."):
                    extracted_images = extract_images(uploaded_file)
                    
                if extracted_images:
                    st.success(f"Extracted {len(extracted_images)} image(s).")
                    
                    cols_per_row = 3
                    
                    image_chunks = list(chunk_list(extracted_images, cols_per_row))
                    
                    for chunk in image_chunks:
                        cols = st.columns(cols_per_row)
                        for idx, (label, img) in enumerate(chunk):
                            with cols[idx]:
                                st.image(
                                    cv2.cvtColor(img, cv2.COLOR_BGR2RGB), 
                                    caption=f'{label}', 
                                    use_container_width=True  
                                )
                else:
                    st.warning("No objects labeled 'Picture' were found.")
            else:
                st.warning("Please upload an image.")

    with tab3:
        st.header("Face Matching")
        st.write("Upload two photos to find matching faces.")

        col1, col2 = st.columns(2)

        with col1:
            st.subheader("Upload Image 1")
            img1_file = st.file_uploader(
                "Select first image (PNG, JPG, JPEG)", 
                type=['png', 'jpg', 'jpeg'], 
                key='face_img1'
            )
        
        with col2:
            st.subheader("Upload Image 2")
            img2_file = st.file_uploader(
                "Select second image (PNG, JPG, JPEG)", 
                type=['png', 'jpg', 'jpeg'], 
                key='face_img2'
            )

        if st.button("Find Matching Faces", key='face_matching_button'):
            if img1_file and img2_file:
                with st.spinner("Processing images and extracting faces..."):
                    try:
                        with tempfile.TemporaryDirectory() as tmpdirname:
                            img1_path = os.path.join(tmpdirname, img1_file.name)
                            img2_path = os.path.join(tmpdirname, img2_file.name)
                            with open(img1_path, "wb") as f:
                                f.write(img1_file.getbuffer())
                            with open(img2_path, "wb") as f:
                                f.write(img2_file.getbuffer())

                            # Obtaining embeddings for the first image
                            embedding_objs1 = DeepFace.represent(
                                img_path=img1_path,
                                detector_backend="opencv",
                                model_name="Facenet512",
                            )

                            # Obtaining embeddings for the second image
                            embedding_objs2 = DeepFace.represent(
                                img_path=img2_path,
                                detector_backend="opencv",
                                model_name="Facenet512",
                            )

                            # Calculating matches
                            threshold = 0.7 
                            matches = []

                            for i, emb1 in enumerate(embedding_objs1):
                                for j, emb2 in enumerate(embedding_objs2):
                                    sim = compute_cosine_similarity(emb1['embedding'], emb2['embedding'])
                                    if sim >= threshold:
                                        matches.append((i, j, sim))

                            if matches:
                                st.success(f"Found {len(matches)} match(es):")
                                for match in matches:
                                    idx1, idx2, sim = match
                                    face1 = extract_face(img1_path, embedding_objs1[idx1]['facial_area'])
                                    face2 = extract_face(img2_path, embedding_objs2[idx2]['facial_area'])
                                    
                                    # Displaying matching faces
                                    fig, axs = plt.subplots(1, 2, figsize=(8, 4))
                                    axs[0].imshow(face1)
                                    axs[0].set_title(f'Image 1 - Face {idx1+1}')
                                    axs[0].axis('off')

                                    axs[1].imshow(face2)
                                    axs[1].set_title(f'Image 2 - Face {idx2+1}')
                                    axs[1].axis('off')

                                    fig.suptitle(f'Cosine Similarity: {sim:.4f}', fontsize=14)
                                    st.pyplot(fig)
                            else:
                                st.warning("No matches found.")

                    except Exception as e:
                        st.error(f"An error occurred while processing images: {e}")
            else:
                st.warning("Please upload both photos.")

if __name__ == "__main__":
    main()

