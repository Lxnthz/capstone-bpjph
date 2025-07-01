from fastapi import FastAPI, HTTPException, Query
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import numpy as np
import os
import json
import joblib
from tensorflow.keras.models import load_model as keras_load_model
import logging

# Global variables for the model and scalers
model = None
scaler = None
target_scaler = None
TIME_STEP = 7  # Number of time steps for the model

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# FastAPI app initialization
app = FastAPI(title="Backend")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Replace with your frontend's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Load the model and scalers at startup
def load_model():
    global model, scaler, target_scaler
    try:
        model_path = os.path.join("data", "model", "model_halal1.h5")
        scaler_path = os.path.join("data", "model", "scaler1.pkl")
        target_scaler_path = os.path.join("data", "model", "target_scaler1.pkl")

        logger.info(f"Loading model from: {model_path}")
        model = keras_load_model(model_path)
        logger.info("Model loaded successfully.")

        logger.info(f"Loading scaler from: {scaler_path}")
        scaler = joblib.load(scaler_path)
        logger.info("Scaler loaded successfully.")

        logger.info(f"Loading target scaler from: {target_scaler_path}")
        target_scaler = joblib.load(target_scaler_path)
        logger.info("Target scaler loaded successfully.")
    except FileNotFoundError as e:
        logger.error(f"Error loading model or scaler: {e}")
        raise
    except Exception as e:
        logger.error(f"Unexpected error during model or scaler loading: {e}")
        raise

load_model()

# Preprocessing input
def preprocess_input(raw_input: list[float]) -> np.ndarray:
    global scaler
    try:
        feature_dim = 8
        input_array = np.array(raw_input).reshape((TIME_STEP, feature_dim))
        logger.info(f"Input array shape: {input_array.shape}")
        scaled_input = scaler.transform(input_array)
        reshaped_input = scaled_input.reshape((1, TIME_STEP, feature_dim))
        logger.info(f"Scaled input shape: {reshaped_input.shape}")
        return reshaped_input
    except Exception as e:
        logger.error(f"Error in preprocess_input: {e}")
        raise

# Postprocessing output
def postprocess_output(pred_scaled: np.ndarray) -> float:
    global target_scaler
    try:
        logger.info(f"Scaled prediction: {pred_scaled}")
        result = target_scaler.inverse_transform(pred_scaled)[0][0]
        logger.info(f"Postprocessed prediction: {result}")
        return result
    except Exception as e:
        logger.error(f"Error in postprocess_output: {e}")
        raise

@app.get("/")
def read_root():
    return {"message": "Backend is Live!"}

@app.get("/geo/province")
def get_province():
    return FileResponse("data/geojson/indonesia38.geojson", media_type="application/json")

@app.get("/geo/region")
def get_all_region():
    return FileResponse("data/geojson/indonesia-kab.geojson", media_type="application/json")

df_cache = pd.read_csv("data/csv/data_halal_cleaned.csv")
df_cache = df_cache.where(pd.notnull(df_cache), None)
df_cache["kbli"] = df_cache["kbli"].astype(str).str.strip()
df_cache["tanggal_terbit"] = pd.to_datetime(df_cache["tanggal_terbit"], errors="coerce")

@app.get("/data/yearly")
def get_yearly_data(year: int):
    """
    Returns the total certificates for a specific year.
    """
    try:
        df = df_cache.copy()
        df["year"] = pd.to_datetime(df["tanggal_terbit"], errors="coerce").dt.year
        yearly_data = df[df["year"] == year].shape[0]
        return {"total": yearly_data}
    except Exception as e:
        logger.error(f"Error fetching yearly data: {e}")
        return {"error": str(e)}

@app.get("/data/yearly/home")
def get_yearly_data_home():
    """
    Returns the total certificates per year for BarchartHome.
    """
    try:
        df = df_cache.copy()
        df["year"] = pd.to_datetime(df["tanggal_terbit"], errors="coerce").dt.year
        yearly_data = df.groupby("year").size().to_dict()
        return {"yearly_data_home": yearly_data}
    except Exception as e:
        logger.error(f"Error fetching yearly data for home: {e}")
        return {"error": str(e)}
      
@app.get("/data/kbli/home")
def get_kbli_data_home():
    """
    Returns KBLI data for a pie chart, combining categories under 20% into 'Others' for the home page.
    """
    try:
        kbli_counts = df_cache["kbli"].value_counts().to_dict()

        total_certificates = sum(kbli_counts.values())
        processed_data = []
        others_count = 0

        for kbli, count in kbli_counts.items():
            percentage = (count / total_certificates) * 100
            if percentage >= 2:
                processed_data.append({"label": kbli, "value": count})
            else:
                others_count += count

        if others_count > 0:
            processed_data.append({"label": "Others", "value": others_count})

        return {"kbli_data_home": processed_data}
    except Exception as e:
        logger.error(f"Error fetching KBLI data for home: {e}")
        return {"error": str(e)}

@app.get("/data/monthly")
def get_monthly_data(year: int):
    """
    Returns the total certificates per month for a given year, ensuring all months are included.
    """
    try:
        df = df_cache.copy()
        df["tanggal_terbit"] = pd.to_datetime(df["tanggal_terbit"], errors="coerce")
        df = df[df["tanggal_terbit"].dt.year == year]
        df["month"] = df["tanggal_terbit"].dt.month
        monthly_data = df.groupby("month").size().to_dict()

        # Ensure all months are included with a default count of 0
        all_months = {i: 0 for i in range(1, 13)}  # Months 1 to 12
        all_months.update(monthly_data)  # Update with actual data

        return {"monthly_data": all_months}
    except Exception as e:
        logger.error(f"Error fetching monthly data: {e}")
        return {"error": str(e)}

@app.get("/data/total")
def get_total_all():
    total = df_cache.shape[0]
    return {"total": total}

@app.get("/data/sector")
def get_top_sector():
    top_sector = df_cache["kbli"].value_counts().head(10).to_dict()
    return {"top_sector": top_sector}

@app.get("/geo/heatmap")
def get_heatmap_layer():
    try:
        # Load provinces GeoJSON (ensure the file exists and structure is as expected)
        with open("data/geojson/indonesia38.geojson") as f:
            geojson_data = json.load(f)
        
        # Ensure the dataset has a province field (assumed as 'provinsi')
        if "provinsi" not in df_cache.columns:
            return {"error": "Column 'provinsi' not found in dataset."}
        
        # Count certificates per province
        count_by_province = df_cache["provinsi"].value_counts().to_dict()
        
        # Merge the certificate count into the GeoJSON features
        for feature in geojson_data.get("features", []):
            # Get the province name from GeoJSON
            province_name = feature.get("properties", {}).get("PROVINSI", "").strip()
            
            # Match province name from GeoJSON to the CSV counts
            intensity = count_by_province.get(province_name, 0)
            
            # Add the intensity property to the GeoJSON feature
            feature.setdefault("properties", {})["intensity"] = intensity
        
        return geojson_data
    except Exception as e:
        return {"error": str(e)}

@app.post("/predict")
def predict(data: dict):
    global model, scaler, target_scaler

    logger.info("Received prediction request.")
    try:
        if model is None or scaler is None or target_scaler is None:
            raise HTTPException(
                status_code=500,
                detail="Model or scalers are not loaded. Please ensure load_model() is called."
            )

        input_data = data.get("data")
        if not input_data or len(input_data) != TIME_STEP * 8:
            raise HTTPException(
                status_code=422,
                detail=f"Invalid input shape. Expected {TIME_STEP * 8} values (7 days * 8 features). Received {len(input_data) if input_data else 0} values.",
            )

        processed_input = preprocess_input(input_data)
        pred_scaled = model.predict(processed_input)
        prediction = target_scaler.inverse_transform(pred_scaled)

        # Replace NaN values with 0 or another default value
        prediction = np.nan_to_num(prediction)

        # Convert prediction to list format
        prediction = prediction.tolist()

        logger.info(f"Final prediction response: {prediction}")
        return {"prediction": prediction}
    except Exception as e:
        logger.error(f"Error during prediction: {e}")
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

@app.get("/data/kbli")
def get_kbli_data(year: int):
    """
    Returns KBLI data for a pie chart, combining categories under 20% into 'Others' for a specific year.
    """
    try:
        df = df_cache.copy()
        df["year"] = pd.to_datetime(df["tanggal_terbit"], errors="coerce").dt.year
        df = df[df["year"] == year]
        kbli_counts = df["kbli"].value_counts().to_dict()

        total_certificates = sum(kbli_counts.values())
        processed_data = []
        others_count = 0

        for kbli, count in kbli_counts.items():
            percentage = (count / total_certificates) * 100
            if percentage >= 5:
                processed_data.append({"label": kbli, "value": count})
            else:
                others_count += count

        if others_count > 0:
            processed_data.append({"label": "Others", "value": others_count})

        return {"kbli_data": processed_data}
    except Exception as e:
        logger.error(f"Error fetching KBLI data: {e}")
        return {"error": str(e)}

@app.get("/data/kbli/category")
def get_kbli_category_data(category: str):
    """
    Returns KBLI data for a line chart, showing counts for a specific category across years.
    """
    try:
        df = df_cache.copy()
        logger.info(f"Filtering data for category: {category}")
        
        # Ensure the category exists in the dataset
        if category not in df["kbli"].unique():
            logger.warning(f"Category '{category}' not found in KBLI column.")
            return {"category_data": {year: 0 for year in range(2016, 2026)}}

        # Filter by category
        df = df[df["kbli"] == category]
        logger.info(f"Filtered DataFrame shape: {df.shape}")
        
        # Extract year and group by year
        df["year"] = pd.to_datetime(df["tanggal_terbit"], errors="coerce").dt.year
        yearly_data = df.groupby("year").size().to_dict()
        logger.info(f"Yearly data before filling missing years: {yearly_data}")

        # Ensure all years are included with a default count of 0
        all_years = {year: 0 for year in range(2016, 2026)}  # Years 2016 to 2025
        all_years.update(yearly_data)
        logger.info(f"Final yearly data: {all_years}")

        return {"category_data": all_years}
    except Exception as e:
        logger.error(f"Error fetching KBLI category data: {e}")
        return {"error": str(e)}

@app.get("/data/kbli/categories")
def get_kbli_categories():
    """
    Returns a list of unique KBLI categories.
    """
    try:
        df = df_cache.copy()
        logger.info("Fetching unique KBLI categories")
        categories = df["kbli"].dropna().unique().tolist()
        logger.info(f"Unique KBLI categories: {categories}")
        return {"categories": categories}
    except Exception as e:
        logger.error(f"Error fetching KBLI categories: {e}")
        return {"error": str(e)}

@app.get("/data/leaderboard")
def get_leaderboard():
    """
    Returns leaderboard data for provinces with product types and totals.
    """
    try:
        df = df_cache.copy()
        leaderboard_data = (
            df.groupby(["provinsi", "jenis_produk"])
            .size()
            .reset_index(name="total")
            .sort_values(by="total", ascending=False)
        )
        return {"data": leaderboard_data.to_dict(orient="records")}
    except Exception as e:
        logger.error(f"Error fetching leaderboard data: {e}")
        return {"error": str(e)}

@app.get("/data/island-certificates")
def get_island_certificates():
    """
    Returns the total certificates per island based on provinces.
    """
    try:
        df = df_cache.copy()
        island_mapping = {
            "Sumatra": [
                "Aceh", "North Sumatra", "West Sumatra", "Riau", "Jambi",
                "South Sumatra", "Bengkulu", "Lampung", "Bangka Belitung Islands", "Riau Islands"
            ],
            "Java": [
                "Banten", "DKI Jakarta", "Jawa Barat", "Jawa Tengah", "DI Yogyakarta", "Jawa Timur"
            ],
            "Kalimantan": [
                "Kalimantan Barat", "Kalimantan Tengah", "Kalimantan Selatan", "Kalimantan Timur", "Kalimantan Utara"
            ],
            "Sulawesi": [
                "Sulawesi Utara", "Gorontalo", "Sulawesi Tengah", "Sulawesi Barat", "Sulawesi Selatan", "Sulawesi Tenggara"
            ],
            "Papua": [
                "Papua", "Papua Barat", "Papua Tengah", "Papua Selatan", "Papua Barat Daya"
            ],
            "Nusa Tenggara": [
                "Bali", "Nusa Tenggara Barat", "Nusa Tenggara Timur"
            ],
            "Maluku": [
                "Maluku", "Maluku Utara"
            ]
        }

        island_certificates = {}
        for island, provinces in island_mapping.items():
            total = df[df["provinsi"].isin(provinces)].shape[0]
            island_certificates[island] = total

        return {"data": island_certificates}
    except Exception as e:
        logger.error(f"Error fetching island certificates: {e}")
        return {"error": str(e)}