import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function Linechart() {
  return (
    <LineChart
      xAxis={[
        {
          scaleType: 'linear',
          data: [0, 50, 100, 150, 200, 250, 300, 350],
        },
      ]}
      yAxis={[{ min: 120 }]}
      series={[
        {
          data: [200, 250, 200, 145, 150, 225, 260, 195],
          label: 'Aktual',
          color: '#2196F3',
          showMark: false,
        },
        {
          data: [205, 245, 205, 150, 155, 220, 270, 190],
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
      legend={{ position: { vertical: 'bottom', horizontal: 'middle' } }}
    />
  );
}