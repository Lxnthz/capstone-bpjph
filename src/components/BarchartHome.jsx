import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export default function BarchartHome() {
  const [yearlyData, setYearlyData] = useState([]);

  useEffect(() => {
    const fetchYearlyData = async () => {
      try {
        const response = await fetch("http://localhost:8000/data/yearly/home");
        const result = await response.json();
        if (result.yearly_data_home) {
          const data = Object.entries(result.yearly_data_home).map(
            ([year, count]) => ({
              year,
              count,
            })
          );
          setYearlyData(data);
        }
      } catch (error) {
        console.error("Error fetching yearly data for home:", error);
      }
    };

    fetchYearlyData();
  }, []);

  return (
    <div className="flex items-center">
      <BarChart
        xAxis={[{ data: yearlyData.map((item) => item.year) }]}
        yAxis={[{ label: "Jumlah Sertifikat" }]}
        series={[
          {
            data: yearlyData.map((item) => item.count),
            color: "#42A5F5",
          },
        ]}
        height={300}
        grid={{ horizontal: true }}
        sx={{
          "& .MuiChartsGrid-line": {
            strokeDasharray: "4 4",
          },
        }}
      />
    </div>
  );
}
