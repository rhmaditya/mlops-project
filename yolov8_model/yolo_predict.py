"""
YOLOv8 Fruit Detection and Calorie Estimation
Author: MLOps Team
Date: 2025-01-10
Description: Detects fruits and estimates calories using YOLOv8
Focus: FRUIT DETECTION ONLY
"""

import sys
import json
from ultralytics import YOLO
import cv2
import os
import time

# ============================================
# KONFIGURASI - SESUAIKAN DENGAN MODEL ANDA
# ============================================

# Path ke model (otomatis mencari di folder models/)
MODEL_PATH = os.path.join(os.path.dirname(__file__), "models", "best.pt")

# Confidence threshold
CONFIDENCE_THRESHOLD = 0.25

# ============================================
# DATABASE KALORI BUAH (per 100g)
# Sumber: USDA & Indonesian Nutrition Database
# ============================================

FRUIT_CALORIES_DB = {
    # Buah Tropis
    'apple': 52,              # Apel
    'banana': 89,             # Pisang
    'orange': 47,             # Jeruk
    'mango': 60,              # Mangga
    'papaya': 43,             # Pepaya
    'pineapple': 50,          # Nanas
    'watermelon': 30,         # Semangka
    'melon': 34,              # Melon
    'dragon fruit': 60,       # Buah Naga
    'guava': 68,              # Jambu Biji
    'passion fruit': 97,      # Markisa
    'durian': 147,            # Durian
    'rambutan': 82,           # Rambutan
    'lychee': 66,             # Leci
    'longan': 60,             # Kelengkeng
    'mangosteen': 73,         # Manggis
    'salak': 82,              # Salak
    'star fruit': 31,         # Belimbing
    
    # Buah Berry
    'strawberry': 32,         # Stroberi
    'blueberry': 57,          # Bluberi
    'raspberry': 52,          # Raspberry
    'blackberry': 43,         # Blackberry
    'cranberry': 46,          # Cranberry
    'grape': 69,              # Anggur
    'cherry': 63,             # Ceri
    
    # Buah Citrus
    'lemon': 29,              # Lemon
    'lime': 30,               # Jeruk Nipis
    'grapefruit': 42,         # Grapefruit
    'tangerine': 53,          # Jeruk Keprok
    'kumquat': 71,            # Kumquat
    
    # Buah Stone Fruits
    'peach': 39,              # Persik
    'plum': 46,               # Plum
    'apricot': 48,            # Aprikot
    'nectarine': 44,          # Nektarin
    'avocado': 160,           # Alpukat
    
    # Buah Lainnya
    'pear': 57,               # Pir
    'kiwi': 61,               # Kiwi
    'pomegranate': 83,        # Delima
    'fig': 74,                # Buah Tin
    'date': 277,              # Kurma
    'coconut': 354,           # Kelapa
    'jackfruit': 95,          # Nangka
    'persimmon': 70,          # Kesemek
    
    # Nama Indonesia (alias)
    'apel': 52,
    'pisang': 89,
    'jeruk': 47,
    'mangga': 60,
    'pepaya': 43,
    'nanas': 50,
    'semangka': 30,
    'melon': 34,
    'jambu': 68,
    'alpukat': 160,
    'anggur': 69,
    'kelapa': 354,
    'nangka': 95,
    
    # Default untuk buah tidak dikenal
    'fruit': 50,
    'unknown': 0
}

# ============================================
# FRUIT EMOJI MAPPING (untuk UI yang lebih menarik)
# ============================================

FRUIT_EMOJI = {
    'apple': '🍎',
    'banana': '🍌',
    'orange': '🍊',
    'mango': '🥭',
    'watermelon': '🍉',
    'strawberry': '🍓',
    'grape': '🍇',
    'pineapple': '🍍',
    'kiwi': '🥝',
    'avocado': '🥑',
    'peach': '🍑',
    'cherry': '🍒',
    'lemon': '🍋',
    'coconut': '🥥',
    'papaya': '🍈',
    'melon': '🍈',
    'pear': '🍐',
    'fruit': '🍎'
}

def get_fruit_emoji(class_name):
    """Get emoji for fruit class"""
    return FRUIT_EMOJI.get(class_name.lower(), '🍎')

def predict_image(image_path):
    """
    Prediksi buah menggunakan YOLOv8
    
    Args:
        image_path (str): Path ke file gambar
        
    Returns:
        dict: Hasil prediksi dalam format JSON
    """
    try:
        start_time = time.time()
        print(f"[INFO] 🍎 Starting FRUIT prediction process...", file=sys.stderr)
        
        # Try models in order of speed (fastest first)
        model_paths = [
            'models/best.pt',      # Custom model (if exists)
            'yolov8n.pt',          # Nano - FASTEST
            'yolov8s.pt',          # Small
            'yolov8m.pt'           # Medium
        ]
        
        model = None
        model_used = None
        
        for model_path in model_paths:
            if os.path.exists(model_path):
                print(f"[INFO] Loading model: {model_path}", file=sys.stderr)
                try:
                    model = YOLO(model_path)
                    model_used = model_path
                    break
                except Exception as e:
                    print(f"[WARNING] Failed to load {model_path}: {e}", file=sys.stderr)
                    continue
        
        # Fallback to auto-download YOLOv8n
        if model is None:
            print(f"[INFO] No model found, downloading YOLOv8n (3MB)...", file=sys.stderr)
            model = YOLO('yolov8n.pt')
            model_used = 'yolov8n.pt'
        
        load_time = time.time() - start_time
        print(f"[INFO] Model loaded in {load_time:.2f}s: {model_used}", file=sys.stderr)
        
        # Read and resize image for faster processing
        print(f"[INFO] Reading image: {image_path}", file=sys.stderr)
        image = cv2.imread(image_path)
        if image is None:
            return {
                'success': False,
                'error': f'Failed to read image: {image_path}'
            }
        
        original_shape = image.shape
        print(f"[INFO] Original image size: {original_shape}", file=sys.stderr)
        
        # Resize large images (max 1280px)
        max_size = 1280
        height, width = image.shape[:2]
        if max(height, width) > max_size:
            scale = max_size / max(height, width)
            new_width = int(width * scale)
            new_height = int(height * scale)
            image = cv2.resize(image, (new_width, new_height), interpolation=cv2.INTER_AREA)
            print(f"[INFO] Resized to: {image.shape} (for faster processing)", file=sys.stderr)
        
        # Run prediction with optimized settings
        print(f"[INFO] Running FRUIT prediction...", file=sys.stderr)
        inference_start = time.time()
        
        results = model(
            image,
            conf=0.25,          # Lower confidence threshold
            iou=0.45,           # NMS threshold
            max_det=15,         # Limit max detections (increased for multiple fruits)
            verbose=False,      # Disable verbose output
            device='cpu'        # Explicitly use CPU (change to 'cuda' if GPU available)
        )
        
        inference_time = time.time() - inference_start
        print(f"[INFO] Inference completed in {inference_time:.2f}s", file=sys.stderr)
        
        detections = []
        total_calories = 0
        fruit_count = {}
        
        for result in results:
            boxes = result.boxes
            print(f"[INFO] Found {len(boxes)} detections", file=sys.stderr)
            
            for box in boxes:
                try:
                    # Get class name
                    class_id = int(box.cls[0])
                    class_name = str(model.names[class_id])
                    confidence = float(box.conf[0])
                    
                    # Get bounding box
                    bbox = box.xyxy[0].tolist()
                    
                    # Get calories (default to 'fruit' if not in database)
                    calories = FRUIT_CALORIES_DB.get(
                        class_name.lower(), 
                        FRUIT_CALORIES_DB.get('fruit', 50)
                    )
                    
                    # Get emoji
                    emoji = get_fruit_emoji(class_name)
                    
                    detection = {
                        'class': class_name,
                        'confidence': round(confidence, 4),
                        'calories': calories,
                        'bbox': [round(x, 2) for x in bbox],
                        'emoji': emoji
                    }
                    
                    detections.append(detection)
                    total_calories += calories
                    
                    # Count fruits
                    fruit_key = class_name.lower()
                    fruit_count[fruit_key] = fruit_count.get(fruit_key, 0) + 1
                    
                    print(f"[INFO] Detected: {emoji} {class_name} ({confidence:.2f}) - {calories} kcal", file=sys.stderr)
                    
                except Exception as e:
                    print(f"[WARNING] Skipping detection due to error: {e}", file=sys.stderr)
                    continue
        
        total_time = time.time() - start_time
        
        # Create fruit summary
        fruit_summary = [
            {
                'name': fruit_name,
                'count': count,
                'emoji': get_fruit_emoji(fruit_name),
                'total_calories': FRUIT_CALORIES_DB.get(fruit_name, 50) * count
            }
            for fruit_name, count in fruit_count.items()
        ]
        
        # Return result
        result_data = {
            'success': True,
            'total_calories': round(total_calories, 2),
            'detections': detections,
            'fruit_summary': fruit_summary,
            'metadata': {
                'model_used': model_used,
                'original_size': f"{original_shape[1]}x{original_shape[0]}",
                'processed_size': f"{image.shape[1]}x{image.shape[0]}",
                'load_time': round(load_time, 2),
                'inference_time': round(inference_time, 2),
                'total_time': round(total_time, 2),
                'detection_count': len(detections),
                'unique_fruits': len(fruit_count)
            }
        }
        
        print(f"[INFO] ✅ Total processing time: {total_time:.2f}s", file=sys.stderr)
        print(f"[INFO] 🍎 Detected {len(detections)} fruits ({len(fruit_count)} unique)", file=sys.stderr)
        print(json.dumps(result_data))
        return result_data
        
    except Exception as e:
        print(f"[ERROR] {str(e)}", file=sys.stderr)
        import traceback
        traceback.print_exc(file=sys.stderr)
        
        error_data = {
            'success': False,
            'error': str(e)
        }
        print(json.dumps(error_data))
        return error_data

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(json.dumps({
            'success': False,
            'error': 'No image path provided'
        }))
        sys.exit(1)
    
    image_path = sys.argv[1]
    predict_image(image_path)