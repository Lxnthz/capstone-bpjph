import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Summary() {
  const [totalSertifikatTahunan, setTotalSertifikatTahunan] = useState(null);
  const [lastUpdate, setLastUpdate] = useState("");
  const [persentase, setPersentase] = useState(null);
  const [totalSertifikat, setTotalSertifikat] = useState(null);

  useEffect(() => {
    // Fetch yearly totals for percentage growth
    const currentYear = new Date().getFullYear();
    const fetchData = async () => {
      try {
        const [currentRes, prevRes] = await Promise.all([
          axios.get(`http://localhost:8000/data/yearly?year=${currentYear}`),
          axios.get(`http://localhost:8000/data/yearly?year=${currentYear - 1}`),
        ]);
        const currentTotal = currentRes.data.total;
        const prevTotal = prevRes.data.total;
        setTotalSertifikatTahunan(currentTotal);
        const today = new Date();
        const options = { year: "numeric", month: "long", day: "numeric" };
        setLastUpdate(today.toLocaleDateString("id-ID", options));
        if (prevTotal && currentTotal) {
          const percent = ((currentTotal - prevTotal) / prevTotal) * 100;
          setPersentase(percent.toFixed(2));
        } else {
          setPersentase(null);
        }
      } catch {
        setTotalSertifikatTahunan("N/A");
        setLastUpdate("");
        setPersentase(null);
      }
    };
    fetchData();

    // Fetch grand total for Total Sertifikat Terdata
    axios.get("http://localhost:8000/data/total")
      .then((res) => setTotalSertifikat(res.data.total))
      .catch(() => setTotalSertifikat("N/A"));
  }, []);

  return (
    <div className="bg-[#670075] flex justify-evenly rounded-xl items-center">
        <div className="text-white p-5 gap-y-2 -ml-5">
          <p className="font-[200] text-sm">Total Sertifikat Terdata</p>
          <p className="font-bold text-[1.5rem]">
            {totalSertifikat !== null
              ? totalSertifikat.toLocaleString()
              : "Loading..."}
          </p>
          <p className="font-[200] text-sm">{lastUpdate ? lastUpdate : ""}</p>
        </div>
        <div className="h-[60%] border-l border-white border-dashed mx-5 "></div>
        <div className="text-white p-5 gap-y-2 -ml-10">
          <p className="font-[200] text-sm">Sertifikat data</p>
          <p className="font-bold text-[1.5rem]">2.047</p>
          <p className="font-[200] text-sm">Per bulan Maret 2025</p>
        </div>
        <div className="h-[60%] border-l border-white border-dashed mx-5"></div>
        <div className="text-white p-5 gap-y-2 -ml-10">
          <p className="font-[200] text-sm">
            Persentase Pertumbuhan{" "}
            <span className="text-[#670075] bg-white rounded-2xl p-1 font-bold ml-2">
              {new Date().getFullYear()}
            </span>
          </p>
          <p className="font-bold text-[1.5rem]">
            {persentase !== null ? persentase + "%" : "Loading..."}
          </p>
          <p className="font-[200] text-sm">
            Naik{" "}
            {persentase !== null && totalSertifikatTahunan && totalSertifikatTahunan !== "N/A"
              ? (
                  totalSertifikatTahunan -
                  Math.round(totalSertifikatTahunan / (1 + persentase / 100))
                ).toLocaleString()
              : "-"}{" "}
            Sertifikat Terdata
          </p>
        </div>
        <div className="h-[60%] border-l border-white border-dashed mx-5"></div>
        <div className="text-white p-5 gap-y-2 -ml-10">
          <p className="font-[200] text-sm">Top Sektor terverifikasi</p>
          <p className="font-bold text-[1.5rem]">FnB</p>
          <p className="font-[200] text-sm">985.321 Sertifikat</p>
        </div>
      </div>
  )
}