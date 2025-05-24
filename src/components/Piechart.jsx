import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function Piechart() {
  const originalData = [
    { id: 0, value: 100000, label: 'FnB' },
    { id: 1, value: 200000, label: 'Kosmetik' },
    { id: 2, value: 400000, label: 'Obat' },
    { id: 3, value: 250000, label: 'Tekstil' },
    { id: 4, value: 50000, label: 'Lainnya' },
  ];

  const total = originalData.reduce((sum, item) => sum + item.value, 0);

  const dataWithPercent = originalData.map((item) => ({
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
