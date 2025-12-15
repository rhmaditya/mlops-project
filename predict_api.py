import sys
import json
import os
import cv2
import numpy as np
from calorie import calories
from cnn_model import get_model

IMG_SIZE = 400
LR = 1e-3
no_of_fruits = 7

MODEL_NAME = 'Fruits_dectector-{}-{}.model'.format(LR, '5conv-basic')
model_save_at = os.path.join("model", MODEL_NAME)

def predict_image(image_path):
    try:
        # Load model
        model = get_model(IMG_SIZE, no_of_fruits, LR)
        model.load(model_save_at)
        labels = list(np.load('labels.npy'))
        
        # Read and process image
        img = cv2.imread(image_path)
        if img is None:
            return {"error": "Cannot read image"}
        
        img_resized = cv2.resize(img, (IMG_SIZE, IMG_SIZE))
        
        # Predict
        model_out = model.predict([img_resized])
        result = np.argmax(model_out)
        name = labels[result]
        cal = round(calories(result + 1, img), 2)
        
        # Get confidence scores
        confidence = float(np.max(model_out) * 100)
        
        return {
            "success": True,
            "fruit_name": name,
            "calories": cal,
            "confidence": round(confidence, 2),
            "fruit_id": int(result + 1)
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No image path provided"}))
        sys.exit(1)
    
    image_path = sys.argv[1]
    result = predict_image(image_path)
    print(json.dumps(result))