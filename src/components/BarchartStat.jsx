import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function Barchart() {
  return (
    <div className="flex items-center">
      <BarChart
        xAxis={[
          { data: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'June', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'] },
        ]}
        yAxis={[
          {
            valueFormatter: (value) => `${value / 1000}K`,
          },
        ]}
        series={[
          {
            data: [250000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000, 1000000, 1100000, 1200000],
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
