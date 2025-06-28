from fastapi import FastAPI, Query
from app.api import router as api_router
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import os
import json

app = FastAPI(title="Backend")

app.include_router(api_router, prefix="/api", tags=["api"])

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_methods=["*"],
  allow_headers=["*"],
)

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

@app.get("/data/yearly")
def get_total(year: int = Query(None, description="Filter by year")):
    df = df_cache.copy()
    if year is not None and "tanggal_terbit" in df.columns:
        df["tanggal_terbit"] = pd.to_datetime(df["tanggal_terbit"], errors="coerce")
        df = df[df["tanggal_terbit"].dt.year == year]
    total = df.shape[0]
    return {"total": total}

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
    """
    Returns a GeoJSON layer with an 'intensity' property for each province,
    where the intensity indicates the number of certificates from that province.
    """
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

@app.get("/data/sample")
def get_sample_ranking():
    """
    Groups the dataset by 'provinsi' and 'jenis_produk', counts the total per group,
    and returns the sorted ranking data.
    """
    try:
        # Group by 'provinsi' and 'jenis_produk' and count certificates
        grouped = df_cache.groupby(["provinsi", "jenis_produk"]).size().reset_index(name="total")
        # Sort descending by total count
        sorted_data = grouped.sort_values("total", ascending=False)
        # Convert to list of dicts
        data_list = sorted_data.to_dict(orient="records")
        return {"data": data_list}
    except Exception as e:
        return {"error": str(e)}