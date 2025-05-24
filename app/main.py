from fastapi import FastAPI, Query
from app.api import router as api_router
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import os

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

@app.get("/data/sample")
def get_sample():
  df = pd.read_excel("data/xlsx/data_sh_ipb.xlsx")
  df = df.where(pd.notnull(df), None)
  return df.to_dict(orient="records")

@app.get("/data/yearly")
def get_total(year: int = Query(None, description="Filter by year")):
    df = pd.read_excel("data/xlsx/data_sh_ipb.xlsx")
    df = df.where(pd.notnull(df), None)
    if year is not None and "tanggal_terbit" in df.columns:
        # Convert tanggal_terbit to datetime and extract year
        df["tanggal_terbit"] = pd.to_datetime(df["tanggal_terbit"], errors="coerce")
        df = df[df["tanggal_terbit"].dt.year == year]
    total = df.shape[0]
    return {"total": total}

@app.get("/data/total")
def get_total_all():
    df = pd.read_excel("data/xlsx/data_sh_ipb.xlsx")
    df = df.where(pd.notnull(df), None)
    total = df.shape[0]
    return {"total": total}