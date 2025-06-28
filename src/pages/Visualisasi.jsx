import { VscListFlat } from "react-icons/vsc";
import Barchart from "../components/BarchartVisualisasi";
import Linechart from "../components/LineChartVisualisasi";
import { useState } from "react";

export default function Visualisasi() {
  const [barYear, setBarYear] = useState("Tahun");

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
              <p className="text-sm text-gray-500">Histogram</p>
              <p className="font-bold text-lg">Prediksi Per Provinsi</p>
            </div>  
          </div>
          <div className="w-full">
            <Linechart year={barYear} />
          </div>
        </div>
      </div>
    </section>
  );
}