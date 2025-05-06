from fastapi import FastAPI
from app.api import router as api_router
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
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