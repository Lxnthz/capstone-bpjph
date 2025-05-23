import { IoIosArrowDown } from "react-icons/io";
import Barchart from "../components/Barchart";
import Piechart from "../components/Piechart";
import MapView from "../components/MapView";
import { FaCircle } from "react-icons/fa";
import { VscListFlat } from "react-icons/vsc";
import Linechart from "../components/Linechart";

export default function Statistics() {
  return (
    <section className="flex flex-1 flex-col h-screen py-10 mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold flex items-center gap-2"> <VscListFlat /> Beranda</h1>
      </div>

      {/* atas */}
      <div className="bg-[#670075] flex justify-evenly rounded-xl items-center">
        {/* total sertif */}
        <div className="text-white p-5 gap-y-2 -ml-10">
          <p className="font-[200] text-sm text-sm">Total sertifikat data</p>
          <p className="font-bold text-[1.5rem]">12455</p>
          <p className="font-[200] text-sm text-sm">12 marey 2020</p>
        </div>
        <div className="w-[0.5px] h-[60%] bg-white my-5 -translate-x-5"></div>
        {/* Sertif terdata */}
        <div className="text-white p-5 gap-y-2 -ml-15">
          <p className="font-[200] text-sm text-sm ">Sertifikat data</p>
          <p className="font-bold text-[1.5rem]">2.047</p>
          <p className="font-[200] text-sm">Per bulan Maret 2025</p>
        </div>
        <div className="w-[0.5px] h-[60%] bg-white my-5"></div>
        {/* Persentase Sertif */}
        <div className="text-white p-5 gap-y-2 -ml-10">
          <p className="font-[200] text-sm ">Persentase Sertifikat 2025</p>
          <p className="font-bold text-[1.5rem]">11%</p>
          <p className="font-[200] text-sm">Naik 34.000 Sertifikat Terdata</p>
        </div>
        <div className="w-[0.5px] h-[60%] bg-white my-5"></div>
        {/* Top sektor */}
        <div className="text-white p-5 gap-y-2 -ml-10">
          <p className="font-[200] text-sm ">Top Sektor terverifikasi</p>
          <p className="font-bold text-[1.5rem]">FnB</p>
          <p className="font-[200] text-sm">985.321 Sertifikat</p>
        </div>
      </div>

      {/* Tengah */}
      <div className="flex justify-evenly mt-10 gap-x-5">
        <div className="border-2 border-gray-300 p-5 rounded-lg shadow-lg flex-1 flex flex-col items-center justify-between">
          <div className="flex flex-row justify-between w-full border-b border-gray-300">
            <div>
              <p className="text-sm text-gray-500">Bar Chart</p>
              <p className="font-bold text-lg">Statistik Time Series</p>
            </div>
            <div className="bg-[#670075] rounded-2xl p-2 h-fit">
             <p className="text-xs text-gray-500 text-white flex items-center gap-x-3">Tahun <IoIosArrowDown /></p>
            </div>
          </div>
          <div className="w-full">
            <Barchart />
          </div>
        </div>

        <div className="border-2 border-gray-300 p-5 rounded-lg shadow-lg flex-1 flex flex-col items-center justify-between">
          <div className="flex flex-row justify-between w-full border-b border-gray-300">
            <div>
              <p className="text-sm text-gray-500">Pie Chart</p>
              <p className="font-bold text-lg">Statistik Time Series</p>
            </div>
            <div className="bg-[#670075] rounded-2xl p-2 h-fit">
             <p className="text-xs text-gray-500 text-white flex items-center gap-x-3">Tahun <IoIosArrowDown /></p>
            </div>
          </div>
          <div className="w-full flex justify-center items-center min-h-[300px]">
            <Piechart />
          </div>
        </div>
      </div>

      {/* Bawah */}
      <div className="flex justify-evenly mt-10 gap-x-5">
        <div className="border-2 border-gray-300 p-5 rounded-lg shadow-lg flex-1 flex flex-col items-center justify-between">
          <div className="flex flex-row justify-between w-full border-b border-gray-300">
            <div>
              <p className="text-sm text-gray-500">Line Chart</p>
              <p className="font-bold text-lg">Statistik Time Series</p>
            </div>
          </div>
          <div className="w-full">
            <Linechart />
          </div>
        </div>

        <div className="border-2 border-gray-300 p-5 rounded-lg shadow-lg flex-1 flex flex-col items-center justify-between">
          <div className="flex flex-row justify-between w-full border-b border-gray-300">
            <div>
              <p className="text-sm text-gray-500">Sertifikat</p>
              <p className="font-bold text-lg">Statistik Time Series</p>
            </div>
            <div className="bg-[#670075] rounded-2xl p-2 h-fit">
             <p className="text-xs text-gray-500 text-white flex items-center gap-x-3">Tahun <IoIosArrowDown /></p>
            </div>
          </div>
          <div className="w-full flex justify-center items-center min-h-[300px]">
            <Piechart />
          </div>
        </div>
      </div>
    </section>
  );
}
