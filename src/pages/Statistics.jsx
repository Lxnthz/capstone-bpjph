import React, { useState } from "react";
import Barchart from "../components/BarchartStat";
import Piechart from "../components/PiechartStat";
import { VscListFlat } from "react-icons/vsc";
import Linechart from "../components/Linechart";
import Thropy from "../assets/Trophy.png";
import DropDownBar from "../components/DropDownBar";
import DropDownPie from "../components/DropDownPie";
import DropdownLine from "../components/DropDownLine";
import Summary from "../components/Summary";

export default function Statistics() {
  const currentYear = new Date().getFullYear();
  const [barYear, setBarYear] = useState(currentYear);
  const [pieYear, setPieYear] = useState(currentYear);
  const [selectedCategory, setSelectedCategory] = useState("FnB");

  return (
    <section className="flex flex-1 flex-col h-screen py-10 mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <VscListFlat /> Statistik
        </h1>
      </div>

      <Summary />

      {/* Tengah */}
      <div className="flex justify-evenly mt-10 gap-x-5">
        {/* Bar Chart */}
        <div className="border-2 border-gray-300 p-5 rounded-lg shadow-lg flex-1 flex flex-col items-center justify-between">
          <div className="flex flex-row justify-between w-full border-b border-gray-300">
            <div>
              <p className="text-sm text-gray-500">Bar Chart</p>
              <p className="font-bold text-lg">
                Statistik Sertifikat Per Bulan
              </p>
            </div>
            <div className="">
              <DropDownBar selectedYear={barYear} onChange={setBarYear} />
            </div>
          </div>
          <div className="w-full">
            <Barchart selectedYear={barYear} />
          </div>
        </div>

        {/* Pie Chart */}
        <div className="border-2 border-gray-300 p-5 rounded-lg shadow-lg flex-1 flex flex-col items-center justify-between">
          <div className="flex flex-row justify-between w-full border-b border-gray-300">
            <div>
              <p className="text-sm text-gray-500">Pie Chart</p>
              <p className="font-bold text-lg">Statistik KBLI</p>
            </div>
            <div className="">
              <DropDownPie selectedYear={pieYear} onChange={setPieYear} />
            </div>
          </div>
          <div className="w-full flex justify-center items-center min-h-[300px]">
            <Piechart selectedYear={pieYear} />
          </div>
        </div>
      </div>

      {/* Bawah */}

      <div className="flex justify-evenly mt-10 pb-10 gap-x-5">
        <div className="border-2 border-gray-300 p-5 rounded-lg shadow-lg flex-2/3 flex flex-col items-center justify-between">
          <div className="flex flex-row justify-between w-full border-b border-gray-300">
            <div>
              <p className="text-sm text-gray-500">Line Chart</p>
              <p className="font-bold text-lg">Statistik KBLI Per Tahun</p>
            </div>
            <div className="">
              <DropdownLine
                selectedCategory={selectedCategory}
                onChange={setSelectedCategory}
              />
            </div>
          </div>
          <div className="w-full">
            <Linechart selectedCategory={selectedCategory} />
          </div>
        </div>
      </div>
    </section>
  );
}
