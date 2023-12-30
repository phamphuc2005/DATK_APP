import React, { useEffect, useState } from 'react';
import { LineChart } from 'react-native-chart-kit';

const Chart = (val) => {
    // console.log('+++',val, name, color);
    // console.log(val.val, val.name, val.color);
  const [param, setParam] = useState([val.val]);
  const [data, setData] = useState ({
    labels: [],
    datasets: [
      {
        data: param,
      },
    ],
  });

  useEffect(()=>{
    const add = setInterval(()=>{
      setParam((data)=>
        [...data, val.val]
      
    );
    if (param.length  === 12) {
      setParam(param.slice(1));
    }
    }, 1000);
    return () => {
        clearInterval(add);
        // clearInterval(remove);
      }
  },[val, param])

  useEffect(()=>{
    setData({
      labels: [],
      datasets: [
        {
          data: param,
        },
      ],
    })
  }, [param])

  const [isColor, setIsColor] = useState(val.color);


  return (
    <LineChart
      withShadow={false}
      data={data}
      fromZero={true}
      width={370}
      height={200}
      yAxisLabel=""
      chartConfig={{
        backgroundGradientFrom: isColor,
        backgroundGradientTo: isColor,
        color: (opacity = 1) => '#000',
        
      }}
      style= {{
        borderRadius: 5,
      }}
    />
  );
};

export default Chart;
