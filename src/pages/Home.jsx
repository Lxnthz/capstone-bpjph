import Barchart from "../components/Barchart";
import Piechart from "../components/Piechart";
import MapView from "../components/MapView";
import { FaCircle } from "react-icons/fa";
import { VscListFlat } from "react-icons/vsc";
import { useState } from "react";
import DropDown from "../components/DropDown";

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

      {/* atas */}
      <div className="bg-[#670075] flex justify-evenly rounded-xl items-center">
        <div className="text-white p-5 gap-y-2 -ml-5">
          <p className="font-[200] text-sm">Total sertifikat data</p>
          <p className="font-bold text-[1.5rem]">12.455</p>
          <p className="font-[200] text-sm">12 Maret 2025</p>
        </div>
        <div className="h-[60%] border-l border-white border-dashed mx-5 "></div>
        <div className="text-white p-5 gap-y-2 -ml-10">
          <p className="font-[200] text-sm">Sertifikat data</p>
          <p className="font-bold text-[1.5rem]">2.047</p>
          <p className="font-[200] text-sm">Per bulan Maret 2025</p>
        </div>
        <div className="h-[60%] border-l border-white border-dashed mx-5"></div>
        <div className="text-white p-5 gap-y-2 -ml-10">
          <p className="font-[200] text-sm">Persentase Sertifikat <span className="text-black bg-white rounded-2xl p-1 font-bold">2025</span></p>
          <p className="font-bold text-[1.5rem]">11%</p>
          <p className="font-[200] text-sm">Naik 34.000 Sertifikat Terdata</p>
        </div>
        <div className="h-[60%] border-l border-white border-dashed mx-5"></div>
        <div className="text-white p-5 gap-y-2 -ml-10">
          <p className="font-[200] text-sm">Top Sektor terverifikasi</p>
          <p className="font-bold text-[1.5rem]">FnB</p>
          <p className="font-[200] text-sm">985.321 Sertifikat</p>
        </div>
      </div>

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
              <DropDown selectedYear={barYear} onChange={setBarYear} />
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
              <DropDown selectedYear={pieYear} onChange={setPieYear} />
            </div>
          </div>
          <div className="w-full flex justify-center items-center min-h-[300px]">
            <Piechart year={pieYear} />
          </div>
        </div>
      </div>

      {/* Bawah */}
      <div className="flex justify-evenly mt-10 gap-x-5">
        <div className="border-2 border-gray-300 p-5 rounded-lg shadow-lg flex-1 flex flex-col items-center justify-between">
          <div className="flex flex-row w-full">
            <div className="flex flex-col">
              <div className="h-fit">
                <p className="text-sm text-gray-500">Sertifikat</p>
                <p className="font-bold text-lg">Berdasarkan Wilayah</p>
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
