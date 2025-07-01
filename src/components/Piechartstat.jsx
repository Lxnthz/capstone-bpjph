import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function PiechartStat({ selectedYear }) {
  const [kbliData, setKbliData] = useState([]);

  useEffect(() => {
    const fetchKbliData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/data/kbli?year=${selectedYear}`);
        const result = await response.json();
        if (result.kbli_data) {
          setKbliData(result.kbli_data);
        }
      } catch (error) {
        console.error("Error fetching KBLI data:", error);
      }
    };

    fetchKbliData();
  }, [selectedYear]);

  const total = kbliData.reduce((sum, item) => sum + item.value, 0);
  const dataWithPercent = kbliData.map((item) => ({
    ...item,
    label: `${item.label} (${((item.value / total) * 100).toFixed(1)}%)`,
  }));

  return (
    <div className="flex items-center mt-5">
      <PieChart
        series={[
          {
            data: dataWithPercent,
          },
        ]}
        width={400}
        height={300}
      />
    </div>
  );
}
