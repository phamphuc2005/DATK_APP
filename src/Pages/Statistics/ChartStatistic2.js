import React, { useEffect, useState } from 'react';
import { BarChart, LineChart } from 'react-native-chart-kit';

const ChartStatistic2 = (val) => {
    // console.log('+++',val, name, color);
    // console.log(val.val, val.name, val.color);
  const [data, setData] = useState ({
    labels: [],
    datasets: [
      {
        data: [0,0,0,0,0,0,0],
      },
    ],
  });

  useEffect(()=>{
    const add = ()=>{
        setData(()=>({
            labels: [],
            datasets: [
              {
                data: val.val,
              },
            ],
        }))}
        add();
  },[val])

  const [isColor, setIsColor] = useState(val.color);


  return (
    <BarChart
        // showValuesOnTopOfBars={true}
        data={data}
        fromZero={true}
        width={366}
        height={200}
        chartConfig={{
            backgroundGradientFrom: isColor,
            backgroundGradientTo: isColor,
            color: (opacity = 1) => '#000',   
            barPercentage: 0.25, 
        }}
        style= {{
            borderRadius: 5,
        }}
    />
  );
};

export default ChartStatistic2;
