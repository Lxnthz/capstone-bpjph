from fastapi import APIRouter
from pydantic import BaseModel
from app.model import load_model, model

router = APIRouter()

class PredictionRequest(BaseModel):
    data: list[float]
    
@router.on_event("startup")
def startup_event():
    load_model()
    
@router.post("/predict")
def predict(request: PredictionRequest):
    if model is None:
        return {"error": "Model not loaded"}
    
    prediction = model.predict([request.data])
    return {"prediction": prediction.tolist()}