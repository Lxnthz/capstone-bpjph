import { VscListFlat } from "react-icons/vsc";
import Barchart from "../components/BarchartVisualisasi";
import Linechart from "../components/LineChartVisualisasi";
import { useState, useEffect } from "react";

export default function Visualisasi() {
  const [barYear, setBarYear] = useState("Tahun");
  const [predictionData, setPredictionData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        const response = await fetch("http://localhost:8000/predict", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: Array(56).fill(0), // Example input: 7 days * 8 features
          }),
        });

        const result = await response.json();
        console.log("Backend response:", result); // Debugging log

        if (result.error) {
          setError(result.error);
        } else if (Array.isArray(result.prediction)) {
          // Log the prediction data for debugging
          console.log("Prediction data before filtering:", result.prediction);

          // Filter out NaN values (if any)
          const filteredPrediction = result.prediction.map((day) =>
            day.map((value) => (isNaN(value) ? 0 : value))
          );

          console.log("Filtered prediction data:", filteredPrediction); // Debugging log
          setPredictionData(filteredPrediction);
          setError(null);
        } else {
          setError("Invalid prediction format");
        }
      } catch {
        setError("Failed to fetch prediction");
      }
    };

    fetchPrediction();
  }, []);

  return (
    <section className="flex flex-1 flex-col h-screen py-10 mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <VscListFlat /> Visualisasi Prediksi
        </h1>
      </div>

      {/* atas */}
      <div className="flex justify-evenly mt-10 pb-10 gap-x-5">
        <div className="border-2 border-gray-300 p-5 rounded-lg shadow-lg flex-1 flex flex-col items-center justify-between">
          <div className="flex flex-row justify-between w-full border-b border-gray-300">
            <div>
              <p className="text-sm text-gray-500">Histogram</p>
              <p className="font-bold text-lg">Prediksi Per Provinsi</p>
            </div>
          </div>
          <div className="w-full">
            <Barchart year={barYear} />
          </div>
        </div>
      </div>

      {/* Bawah */}
      <div className="flex justify-evenly mt-10 pb-10 gap-x-5">
        <div className="border-2 border-gray-300 p-5 rounded-lg shadow-lg flex-1 flex flex-col items-center justify-between">
          <div className="flex flex-row justify-between w-full border-b border-gray-300">
            <div>
              <p className="text-sm text-gray-500">Prediksi Sertifikat</p>
              <p className="font-bold text-lg">1 Hari ke Depan</p>
            </div>
          </div>
          <div className="w-full">
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <Linechart data={predictionData} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
