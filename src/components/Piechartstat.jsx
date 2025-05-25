import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function Piechartstat() {
  const originalData = [
    { id: 0, value: 20000, label: 'FnB' },
    { id: 1, value: 100000, label: 'Kosmetik' },
    { id: 2, value: 40000, label: 'Obat' },
    { id: 3, value: 2500, label: 'Tekstil' },
    { id: 4, value: 5000, label: 'Lainnya' },
  ];

  const colors = ['#1565C0', '#1E88E5', '#42A5F5', '#7CABEE', '#E5EAFC'];

  const total = originalData.reduce((sum, item) => sum + item.value, 0);

  const dataWithPercent = originalData.map((item, index) => ({
    ...item,
    label: `${item.label} (${((item.value / total) * 100).toFixed(1)}%)`,
    color: colors[index],
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
