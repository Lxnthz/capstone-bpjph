import { useEffect, useState } from "react";
import { VscListFlat } from "react-icons/vsc";
import MapView from "../components/MapView";

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
        // Use the aggregated data returned by the API directly
        const sampleData = data.data;
        if (!Array.isArray(sampleData)) {
          throw new TypeError("Expected an array for sample data");
        }
        setTableData(sampleData);
      })
      .catch((error) => console.error("Error fetching sample data:", error));
  }, []);

  return (
    <section className="flex flex-1 flex-col h-screen py-10 mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold flex items-center gap-2 z-10">
          <VscListFlat /> Sebaran Geografis
        </h1>
      </div>
      <div>
        <div className="flex justify-evenly mt-4 gap-x-5">
          <div className="border-2 border-gray-300 p-5 rounded-lg shadow-lg flex-1">
            <p className="text-gray-500 text-lg">Summary</p>
            <h1 className="text-2xl font-bold mb-4 border-b border-gray-300">
              Papan Peringkat
            </h1>
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
            <h1 className="text-2xl font-bold mb-4 border-b border-gray-300">
              Jumlah Sertifikat per Pulau
            </h1>
            {/* Additional data or components can go here */}
          </div>
        </div>
        <div className="flex-1/2">
          <MapView />
        </div>
      </div>
    </section>
  );
}
