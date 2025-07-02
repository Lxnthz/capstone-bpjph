import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function BarchartHome() {
  return (
    <div className="flex items-center w-full">
      <BarChart
        xAxis={[
          { data: [0, 50, 100, 150, 200, 250, 300, 350]},
        ]}
        yAxis={[
          { label: 'Jumlah' }
        ]}
        series={[
          {
            data: [200, 250, 200, 145, 150, 225, 260, 195], // Data Aktual
            label: 'Aktual',
            color: '#42A5F5',
          },
          {
            data: [205, 245, 205, 150, 155, 220, 270, 190], // Data Prediksi
            label: 'Prediksi',
            color: '#FFEB3B',
          },
        ]}
        height={350}
        slotProps={{
          bar: {
            style: {
              rx: 3,
              ry: 3,
            },
          },
        }}
        grid={{ horizontal: true }}
        sx={{
          '& .MuiChartsGrid-line': {
            strokeDasharray: '4 4',
          },
        }}
      />
    </div>
  );
}
