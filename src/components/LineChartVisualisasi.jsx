import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function Linechart({ data }) {
  if (!Array.isArray(data)) {
    console.error("Expected data to be an array, but got:", data);
    return <p>Error: Invalid data format</p>;
  }

  return (
    <LineChart
      xAxis={[
        {
          scaleType: 'linear',
          data: Array.from({ length: data.length }, (_, i) => i + 1), // Days
        },
      ]}
      yAxis={[{ label: 'Jumlah Sertifikat' }]}
      series={[
        {
          data: data,
          label: 'Prediksi',
          color: '#FFEB3B',
          lineDash: [4, 4],
          showMark: false,
        },
      ]}
      grid={{ horizontal: true }}
      height={300}
      sx={{
        '& .MuiChartsGrid-line': {
          strokeDasharray: '4 4',
        },
      }}
    />
  );
}