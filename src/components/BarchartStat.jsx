import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agt",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

export default function BarchartStat({ selectedYear }) {
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/data/monthly?year=${selectedYear}`
        );
        const result = await response.json();
        if (result.monthly_data) {
          const data = Object.entries(result.monthly_data).map(
            ([month, count]) => ({
              month: monthNames[month - 1], // Map month number to localized name
              count,
            })
          );
          setMonthlyData(data);
        }
      } catch (error) {
        console.error("Error fetching monthly data:", error);
      }
    };

    if (selectedYear) {
      fetchMonthlyData();
    }
  }, [selectedYear]);

  return (
    <div className="flex items-center">
      <BarChart
        xAxis={[{ data: monthlyData.map((item) => item.month) }]}
        yAxis={[{ label: "Jumlah Sertifikat" }]}
        series={[
          {
            data: monthlyData.map((item) => item.count),
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
