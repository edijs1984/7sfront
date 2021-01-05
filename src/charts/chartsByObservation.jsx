import React from 'react';
import { useState } from 'react';
import {Bar} from 'react-chartjs-3';
import { useEffect } from 'react';
import { Post } from '../comonComponents/axiosFunctions';

const ChartByObservation=({from,to})=>{
const [dataSet,setDataSet]=useState([]);
const [labels,setlabels]=useState([]);

useEffect(()=>{
  const getData= async()=>{
       const result= await Post({api:"/api/quicktask/byobservations",data:{from,to},notifytrue:false});
       setDataSet(result.map(item=>item.count));
       setlabels(result.map(item=>item._id.observations))

      }
      getData();
  },[from,to])

    const data = {
         labels: labels,
        datasets: [
          {
          fill: true,
          lineTension: 0.1,
          data:dataSet,
          backgroundColor:["#8293e3","#49beb7","#fccf4d","#ef255f","#cb73bb"],
                      }  
        ]
      };
    return (
        <div>
<Bar
    data={data}
    width={50}
    height={400}
    options={{
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Sadalījums pa Novērojumiem'
      },
      legend: {
        display: false,
    },
    plugins: {
      datalabels: {
         display: true,
         color: 'white'
      }
   }
    }}
/>
        </div>
    )
}
export default ChartByObservation;