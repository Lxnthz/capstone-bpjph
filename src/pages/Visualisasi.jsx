import { useState, useEffect } from "react";
import { VscListFlat } from "react-icons/vsc";
import Linechart from "../components/LineChartVisualisasi";

export default function Visualisasi() {
  const [predictionData, setPredictionData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPredictionData = async () => {
      try {
        const response = await fetch("http://localhost:8000/predict/auto", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        if (result.detail) {
          setError(result.detail);
        } else {
          setPredictionData(result.predictions);
          setError(null);
        }
      } catch {
        setError("Failed to fetch prediction");
      }
    };

    fetchPredictionData();
  }, []);

  return (
    <section className="flex flex-1 flex-col h-screen py-10 mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <VscListFlat /> Visualisasi Prediksi
        </h1>
      </div>

      {/* Error Section */}
      {error && <p className="text-red-500 mt-4">Error: {error}</p>}

      {/* Prediction Section */}
      {predictionData.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Prediction for Next 7 Days:</h2>
          <Linechart data={predictionData} />
        </div>
      )}
    </section>
  );
}
