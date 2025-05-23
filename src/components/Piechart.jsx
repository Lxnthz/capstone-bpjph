import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function Piechart() {
  return (
    <div className="flex items-center">
        <PieChart
        series={[
            {
            data: [
                { id: 0, value: 30, label: 'FnB' },
                { id: 1, value: 25, label: 'Kosmetik' },
                { id: 2, value: 25, label: 'Obat' },
                { id: 3, value: 10, label: 'Tekstil' },
                { id: 4, value: 10, label: 'Lainnya' },
            ],
            },
        ]}
        width={200}
        height={200}
        />
    </div>
    
  );
}
