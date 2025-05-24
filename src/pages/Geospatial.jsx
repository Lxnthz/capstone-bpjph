import MapView from "../components/MapView";
import { useEffect, useState } from "react";
import { VscListFlat } from "react-icons/vsc";

export default function Geospatial() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/data/sample")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch sample data");
        }
        return response.json();
      })
      .then((data) => {
        // Group by provinsi and jenis_produk, then count total per group
        const provinceProductMap = {};
        data.forEach((item) => {
          const key = `${item.provinsi}|||${item.jenis_produk}`;
          if (!provinceProductMap[key]) {
            provinceProductMap[key] = {
              provinsi: item.provinsi,
              jenis_produk: item.jenis_produk,
              total: 0,
            };
          }
          provinceProductMap[key].total += 1;
        });
        // Convert to array and sort by total descending
        const sortedData = Object.values(provinceProductMap).sort((a, b) => b.total - a.total);
        setTableData(sortedData);
      })
      .catch((error) => console.error("Error fetching sample data:", error));
  }, []);

  return (
    <section className="flex flex-1 flex-col min-h-screen py-10 ">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold flex items-center gap-2"> <VscListFlat /> Sebaran Geografis</h1>
      </div>
      <div className="">
        <MapView />
      </div>
      <div className="flex justify-evenly mt-10 gap-x-5">
        <div className="border-2 border-gray-300 p-5 rounded-lg shadow-lg flex-1 ">
          <p className="text-gray-500 text-lg">Summary</p>
          <h1 className="text-2xl font-bold mb-4 border-b border-gray-300">Papan Peringkat</h1>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">No</th>
                <th className="px-4 py-2">Provinsi</th>
                <th className="px-4 py-2">Jenis Produk</th>
                <th className="px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {tableData.slice(0, 5).map((item, index) => (
                <tr key={index} className="hover:bg-gray-100 text-center">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{item.provinsi}</td>
                  <td className="px-4 py-2">{item.jenis_produk}</td>
                  <td className="px-4 py-2">{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-2 border-gray-300 p-5 rounded-lg shadow-lg flex-1">
          <p className="text-gray-500 text-lg">Summary</p>
          <h1 className="text-2xl font-bold mb-4 border-b border-gray-300">Jumlah Sertifikat per Pulau</h1>
        </div>
      </div>
    </section>
  );
}