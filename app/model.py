import numpy as np
from tensorflow.keras.models import load_model as keras_load_model
from sklearn.preprocessing import MinMaxScaler
import joblib  # Untuk menyimpan dan memuat scaler (jika perlu)
import os
from fastapi import FastAPI, HTTPException

# Global variabel
model = None
scaler = None
target_scaler = None
TIME_STEP = 7  # Sesuai training

# Fungsi untuk memuat model dan scaler
def load_model():
    global model, scaler, target_scaler
    try:
        model_path = os.path.join("data", "model", "model_halal.h5")
        scaler_path = os.path.join("data", "model", "scaler.pkl")
        target_scaler_path = os.path.join("data", "model", "target_scaler.pkl")

        print(f"Loading model from: {model_path}")
        model = keras_load_model(model_path)
        print("Model loaded successfully.")

        print(f"Loading scaler from: {scaler_path}")
        scaler = joblib.load(scaler_path)
        print("Scaler loaded successfully.")

        print(f"Loading target scaler from: {target_scaler_path}")
        target_scaler = joblib.load(target_scaler_path)
        print("Target scaler loaded successfully.")
    except FileNotFoundError as e:
        print(f"Error loading model or scaler: {e}")
        raise
    except Exception as e:
        print(f"Unexpected error during model or scaler loading: {e}")
        raise

# Fungsi preprocessing input
def preprocess_input(raw_input: list[float]) -> np.ndarray:
    global scaler
    try:
        feature_dim = 8
        input_array = np.array(raw_input).reshape((TIME_STEP, feature_dim))
        print(f"Input array shape: {input_array.shape}")
        scaled_input = scaler.transform(input_array)
        reshaped_input = scaled_input.reshape((1, TIME_STEP, feature_dim))
        print(f"Scaled input shape: {reshaped_input.shape}")
        return reshaped_input
    except Exception as e:
        print(f"Error in preprocess_input: {e}")
        raise

# Fungsi postprocessing output
def postprocess_output(pred_scaled: np.ndarray) -> float:
    global target_scaler
    try:
        print(f"Scaled prediction: {pred_scaled}")
        result = target_scaler.inverse_transform(pred_scaled)[0][0]
        print(f"Postprocessed prediction: {result}")
        return result
    except Exception as e:
        print(f"Error in postprocess_output: {e}")
        raise