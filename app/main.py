from fastapi import FastAPI
from app.api import router as api_router

app = FastAPI(title="Backend")

app.include_router(api_router, prefix="/api", tags=["api"])

@app.get("/")
def read_root():
    return {"message": "Backend is Live!"}