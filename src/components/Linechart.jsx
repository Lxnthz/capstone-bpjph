import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function Linechart() {
  return (
    <LineChart
      className="-ml-5"
      xAxis={[
        {
          scaleType: 'band',
          data: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
        },
      ]}
      yAxis={[
        {
          min: 0,
          valueFormatter: (value) => `${value / 1000}K`,
        },
      ]}
      series={[
        {
          data: [300000, 200000, 400000, 350000, 500000, 400000, 600000],
          curve: 'linear',
          showMark: false,
          color: '#8BA0EA',
        },
      ]}
      grid={{
        horizontal: true,        // aktifkan garis horizontal
      }}
      sx={{
          '& .MuiChartsGrid-line': {
         strokeDasharray: '4 4',
        },
      }}
      height={300}
    />
  );
}
