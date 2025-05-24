import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function Barchart() {
  return (
    <div className="flex items-center">
      <BarChart
        xAxis={[
          { data: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'] },
        ]}
        yAxis={[
          {
            valueFormatter: (value) => `${value / 1000}K`,
          },
        ]}
        series={[
          {
            data: [250000, 200000, 300000, 400000, 500000, 600000, 700000],
            color: '#42A5F5',
          },
        ]}
        height={300}
        slotProps={{
          bar: {
            style: {
              rx: 3,
              ry: 3,
            },
          },
        }}
        grid={{
        horizontal: true,        // aktifkan garis horizontal
      }}
      sx={{
          '& .MuiChartsGrid-line': {
         strokeDasharray: '4 4',
        },
      }}
      />
    </div>
  );
}
