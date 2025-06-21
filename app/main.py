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

df_cache = pd.read_excel("data/xlsx/data_sh_ipb.xlsx")
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