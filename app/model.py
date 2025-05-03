import joblib

PATH = "app/model/model-path"

model = None # type: ignore

def load_model():
  global model
  # model = joblib.load(PATH)
  return model