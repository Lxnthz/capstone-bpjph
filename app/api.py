from fastapi import APIRouter, FastAPI, HTTPException
from pydantic import BaseModel
from app.model import load_model, model

router = APIRouter()

class PredictionRequest(BaseModel):
    data: list[float]
    
@router.post("/predict")
def predict(request: PredictionRequest):
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded")
    try:
        prediction = model.predict([request.input_data])
        return {"prediction": prediction.tolist()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))