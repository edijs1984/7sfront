import React, { useEffect } from 'react';
import {  Post } from '../comonComponents/axiosFunctions';
import { useState } from 'react';
import {Bar} from 'react-chartjs-3';

const ChartDepartment=({from,to})=>{
const [dataset,setDataset]=useState([]);
const [labels,setLabels]=useState([]);




useEffect(()=>{

const fetching=async()=>{   
    const res = await Post({api:"/api/quicktask/bydepartment",data:{from,to},notifytrue:false});
     setDataset( res.map(item=>item.count))
     setLabels(res.map(item=>item._id.department))
}
fetching();
},[from,to]);



    const data = {
        labels: labels,
        datasets: [
          {
           label: "Total",
          fill: true,
          lineTension: 0.1,
          data:dataset,
           backgroundColor: "#8293e3",
                      }           
        ]
      };
    return (
        <div>
<Bar
    data={data}
    width={10}
    height={400}
    options={{
        maintainAspectRatio: false,
        title: {
            display: true,
            text: 'Sadalījums pa Departamentiem'

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

export default ChartDepartment;