# 📦 Backend Documentation

## 🗂️ Project Structure

```bash
bpjph/
│
├── app/
│   ├── main.py        # Entry point for the FastAPI application
│   ├── model.py       # Handles loading and storing the ML model
│   └── api.py         # API routes for inference
│
├── requirements.txt   # Python dependencies
├── be-documentation.md
├── .gitignore         # Prevent data leakages and high storage consumption
└── venv/              # Python virtual environment (optional)
```

## 📚 Backend Depedencies

Before installing depedencies, make sure to enable Python Virtual Enviroment (venv) by running:

##### Initiate venv:
```bash
  python -m venv venv
```

##### Enable virtual enviroment:
```bash
  venv\Scripts\activate
```

#### 🔧 Backend Requirements
- FastAPI – Web framework for building APIs
- Uvicorn – ASGI server (use with [standard] extras for production support)
- python-multipart – Required for handling file uploads

```bash
  pip install fastapi uvicorn[standard] python-multipart
```

#### 🤖 Model Requirements
- NumPy – Numerical computing
- Scikit-learn – Machine learning utilities
- PyTorch – Deep learning framework (Will be changed later after the model is created)

```bash
  pip install numpy scikit-learn torch
```

## 🚀 Running the Backend
<p>To start the FastAPI backend with live reload:</p>

```bash
  uvicorn app.main:app --reload
```
> This will serve the app locally at http://127.0.0.1:8000
