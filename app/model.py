import tensorflow as tf

PATH = "data/model/halal_lstm_model.h5"

model = None # type: ignore

def load_model():
    global model
    model = tf.keras.models.load_model(PATH)
    return model