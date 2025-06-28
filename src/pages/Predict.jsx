import { useState } from "react";

export default function Predict() {
  const [inputData, setInputData] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handlePredict = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: inputData }),
      });

      const result = await response.json();
      if (result.error) {
        setError(result.error);
      } else {
        setPrediction(result.prediction);
        setError(null);
      }
    } catch {
      setError("Failed to fetch prediction");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Predict</h1>
      <div className="mb-4">
        <label className="block text-gray-700">
          Input Data (comma-separated):
        </label>
        <input
          type="text"
          className="border rounded p-2 w-full"
          onChange={(e) => setInputData(e.target.value.split(",").map(Number))}
        />
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handlePredict}>
        Predict
      </button>

      {error && <p className="text-red-500 mt-4">Error: {error}</p>}
      {prediction && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Prediction:</h2>
          <p>{prediction.join(", ")}</p>
        </div>
      )}
    </div>
  );
}
