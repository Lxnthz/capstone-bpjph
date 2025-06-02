import Barchart from "../components/BarchartHome";
import Piechart from "../components/Piecharthome";
import MapView from "../components/MapView";
import Summary from "../components/Summary";
import { FaCircle } from "react-icons/fa";
import { VscListFlat } from "react-icons/vsc";
import { useState } from "react";

export default function Home() {
  const [barYear, setBarYear] = useState("Tahun");
  const [pieYear, setPieYear] = useState("Tahun");

  return (
    <section className="flex flex-1 flex-col h-screen py-10 mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <VscListFlat /> Beranda
        </h1>
      </div>
      
      {/* Atas */}
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
            <div className="flex justify-between items-center">
              <p className="text-xs text-white bg-[#670075] rounded-xl px-2 py-2 w-fit">2020 - 2025</p>
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
            <div className="flex justify-between items-center">
              <p className="text-xs text-white bg-[#670075] rounded-xl px-2 py-2 w-fit">2020 - 2025</p>
            </div>
          </div>
          <div className="w-full flex justify-center items-center">
            <Piechart year={pieYear} />
          </div>
        </div>
      </div>

      {/* Bawah */}
      <div className="flex justify-evenly mt-10 pb-10 gap-x-5">
        <div className="border-2 border-gray-300 p-5 rounded-lg shadow-lg flex-1 flex flex-col items-center justify-between">
          <div className="flex flex-row w-full">
            <div className="flex flex-col w-[20%]">
              <div className="h-fit">
                <p className="text-sm text-gray-500">Sertifikat</p>
                <p className="font-bold text-lg ">Berdasarkan Wilayah</p>
                <p className="text-sm text-gray-500">Keterangan</p>
              </div>
              <div className="ml-5 mt-3">
                <p className="text-md flex items-center"><FaCircle className="w-2 mr-2 text-[#1565C0]" /> FnB</p>
                <p className="text-md flex items-center"><FaCircle className="w-2 mr-2 text-[#1E88E5]" /> Kosmetik</p>
                <p className="text-md flex items-center"><FaCircle className="w-2 mr-2 text-[#42A5F5]" /> Obat</p>
                <p className="text-md flex items-center"><FaCircle className="w-2 mr-2 text-[#7CABEE]" /> Tekstil</p>
                <p className="text-md flex items-center"><FaCircle className="w-2 mr-2 text-[#C6D2FD]" /> Lainnya</p>
              </div>
            </div>
            <div className="w-full -mt-5 ml-5">
              <MapView />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
