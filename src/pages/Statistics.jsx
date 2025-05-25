import Barchart from "../components/BarchartStat";
import Piechart from "../components/Piechartstat";
import { VscListFlat } from "react-icons/vsc";
import Linechart from "../components/Linechart";
import { useState } from "react";
import Thropy from "../assets/Trophy.png";
import DropDownBar from "../components/DropDownBar";
import DropDownPie from "../components/DropDownPie";
import DropDownLine from "../components/DropDownLine";
import Summary from "../components/Summary";

export default function Statistics() {
  const [barYear, setBarYear] = useState("Tahun");
  const [pieYear, setPieYear] = useState("Tahun");
  const [lineCategory, setLineCategory] = useState("Kategori");
  

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
              <p className="font-bold text-lg">Statistik Time Series</p>
            </div>
            <div className="">
              <DropDownBar selectedYear={barYear} onChange={setBarYear} />
            </div>
          </div>
          <div className="w-full">
            <Barchart year={barYear} />
          </div>
        </div>

        {/* Pie Chart */}
        <div className="border-2 border-gray-300 p-5 rounded-lg shadow-lg flex-1 flex flex-col items-center justify-between">
          <div className="flex flex-row justify-between w-full border-b border-gray-300">
            <div>
              <p className="text-sm text-gray-500">Pie Chart</p>
              <p className="font-bold text-lg">Statistik Time Series</p>
            </div>
            <div className="">
              <DropDownPie selectedYear={pieYear} onChange={setPieYear} />
            </div>
          </div>
          <div className="w-full flex justify-center items-center min-h-[300px]">
            <Piechart year={pieYear} />
          </div>
        </div>
      </div>

      {/* Bawah */}
      <div className="flex justify-evenly mt-10 gap-x-5">
        {/* Line Chart */}
        <div className="border-2 border-gray-300 p-5 rounded-lg shadow-lg flex-1 flex flex-col items-center justify-between">
          <div className="flex flex-row justify-between w-full border-b border-gray-300">
            <div>
              <p className="text-sm text-gray-500">Line Chart</p>
              <p className="font-bold text-lg">Statistik Time Series</p>
            </div>
            <div className="">
              <DropDownLine selectedCategory={lineCategory} onChange={setLineCategory}/>
            </div>
          </div>
          <div className="w-full">
            <Linechart />
          </div>
        </div>

        {/* Card */}
        <div className="flex flex-col justify-evenly">
          {/* Card 1 */}
          <div className="border-2 border-gray-300 p-5 rounded-lg shadow-lg flex-1 flex flex-col justify-between">
            <div className="flex flex-row justify-between w-full p-3">
              <div>
                <img
                  src={Thropy}
                  alt="logo"
                  className="flex flex-row justify-between items-center w-[8rem] bg-[#F6F7FE] border-2 border-gray-300 rounded-2xl p-3"
                />
              </div>
              <div className="mt-5 ml-5 mr-5 border-b border-gray-300 flex flex-col justify-center">
                <p className="text-lg">
                  Sektor <span className="font-bold">FnB</span> unggul dengan
                </p>
                <p className="text-lg">Sertifikat terdata terbanyak</p>
                <p className="font-bold text-lg">480.000</p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="border-2 border-gray-300 p-5 rounded-lg shadow-lg flex-1 flex flex-col justify-between mt-5">
            <div className="flex flex-row justify-between w-full p-3">
              <div>
                <img
                  src={Thropy}
                  alt="logo"
                  className="flex flex-row justify-between items-center w-[8rem] bg-[#F6F7FE] border-2 border-gray-300 rounded-2xl p-3"
                />
              </div>
              <div className="mt-5 ml-5 mr-10 border-b border-gray-300 flex flex-col justify-center">
                <p className="text-lg">
                  {" "}
                  <span className="font-bold">Tahun</span> dengan Sertifikat
                </p>
                <p className="text-lg">
                  {" "}
                  <span className="font-bold">Terbanyak</span> adalah tahun
                </p>
                <p className="text-lg">
                  {" "}
                  <span className="font-bold">2022</span> dengan total{" "}
                  <span className="font-bold">321.125</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
