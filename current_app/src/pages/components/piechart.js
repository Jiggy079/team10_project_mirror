import React from 'react';
import { PieChart, Pie} from 'recharts';
import countAnnotations from '../validation';
  
  
export default function PieChartAnn () {
  
    countAnnotations(); 
  
  
return (
        <PieChart width={700} height={700}>
          <Pie data={data} dataKey="annotationCnt" outerRadius={250} fill="green" />
        </PieChart>
);
}
