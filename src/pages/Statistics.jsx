import Barchart from "../components/Barchart";
import Piechart from "../components/Piechart";
import { VscListFlat } from "react-icons/vsc";
import Linechart from "../components/Linechart";
import { GiTrophy } from "react-icons/gi";
import { useState } from "react";

export default function Statistics() {
  const [barYear, setBarYear] = useState("Tahun");
  const [pieYear, setPieYear] = useState("Tahun");
  const years = ["2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018"];

  return (
    <section className="flex flex-1 flex-col h-screen py-10 mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <VscListFlat /> Statistik
        </h1>
      </div>

      {/* atas */}
      <div className="bg-[#670075] flex justify-evenly rounded-xl items-center">
        <div className="text-white p-5 gap-y-2 -ml-5">
          <p className="font-[200] text-sm">Total sertifikat data</p>
          <p className="font-bold text-[1.5rem]">12455</p>
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
            <div className="bg-[#670075] rounded-2xl p-2 h-fit text-white">
              <select
                value={barYear}
                onChange={(e) => setBarYear(e.target.value)}
                className="bg-[#670075] text-white text-xs outline-none"
              >
                <option value="Tahun" className="text-black bg-[#D9D9D9]">Tahun</option>
                {years.map((year) => (
                  <option key={year} value={year} className="text-black bg-[#D9D9D9]">
                    {year}
                  </option>
                ))}
              </select>
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
            <div className="bg-[#670075] rounded-2xl p-2 h-fit text-white">
              <select
                value={pieYear}
                onChange={(e) => setPieYear(e.target.value)}
                className="bg-[#670075] text-white text-xs outline-none"
              >
                <option value="Tahun" className="text-black bg-[#D9D9D9]">Tahun</option>
                {years.map((year) => (
                  <option key={year} value={year} className="text-black bg-[#D9D9D9]">
                    {year}
                  </option>
                ))}
              </select>
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
          </div>
          <div className="w-full">
            <Linechart />
          </div>
        </div>
        
        {/* Card */}
        <div className="flex flex-col justify-evenly">
          {/* Card 1 */}
          <div className="border-2 border-gray-300 p-5 rounded-lg shadow-lg flex-1 flex flex-col justify-between">
            <div className="flex flex-row justify-between w-full">
              <div>
                <GiTrophy className="text-9xl text-[#FFC936] bg-[#F6F7FE] border-2 border-gray-300 rounded-2xl p-2" />
              </div>
              <div className="mt-5 ml-5 mr-5 border-b border-gray-300">
                <p className="text-lg">Sektor <span className="font-bold">FnB</span> unggul dengan</p>
                <p className="text-lg">Sertifikat terdata terbanyak</p>
                <p className="font-bold text-lg">480.000</p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="border-2 border-gray-300 p-5 rounded-lg shadow-lg flex-1 flex flex-col justify-between mt-5">
            <div className="flex flex-row justify-between w-full">
              <div>
                <GiTrophy className="text-9xl text-[#FFC936] bg-[#F6F7FE] border-2 border-gray-300 rounded-2xl p-2" />
              </div>
              <div className="mt-5 ml-5 mr-5 border-b border-gray-300">
                <p className="text-lg"> <span className="font-bold">Tahun</span> dengan Sertifikat</p>
                <p className="text-lg"> <span className="font-bold">Terbanyak</span> adalah tahun</p>
                <p className="text-lg"> <span className="font-bold">2022</span> dengan total <span className="font-bold">321.125</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
