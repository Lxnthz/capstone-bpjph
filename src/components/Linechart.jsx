import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";

export default function Linechart({ selectedCategory }) {
  const [yearlyData, setYearlyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8000/data/kbli/category?category=${selectedCategory}`
        );
        const result = await response.json();
        if (result.category_data) {
          const data = Object.entries(result.category_data).map(([year, count]) => ({
            year: parseInt(year, 10),
            count,
          }));
          setYearlyData(data);
        }
      } catch (error) {
        console.error("Error fetching category data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedCategory) {
      fetchCategoryData();
    }
  }, [selectedCategory]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <LineChart
      xAxis={[
        {
          scaleType: "band",
          data: yearlyData.map((item) => item.year),
        },
      ]}
      yAxis={[
        {
          min: 0,
          valueFormatter: (value) => `${value}`,
        },
      ]}
      series={[
        {
          data: yearlyData.map((item) => item.count),
          curve: "linear",
          showMark: false,
          color: "#8BA0EA",
        },
      ]}
      grid={{
        horizontal: true,
      }}
      sx={{
        "& .MuiChartsGrid-line": {
          strokeDasharray: "4 4",
        },
      }}
      height={300}
    />
  );
}
