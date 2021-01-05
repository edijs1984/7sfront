import React, { useEffect } from 'react';
import {  Post } from '../comonComponents/axiosFunctions';
import { useState } from 'react';
import { Pie} from 'react-chartjs-3';
import 'chartjs-plugin-datalabels';


const ChartStatusPercent=({from,to})=>{
const [dataset,setDataset]=useState([]);
const [labels,setLabels]=useState([]);
useEffect(()=>{

const fetching=async()=>{   
    const res = await Post({api:"/api/quicktask/bystatus",data:{from,to},notifytrue:false});
    const value=res.filter(item=>item._id.status==="Done"|| item._id.status==="New"||item._id.status==="Updated");
     setDataset( value.map(item=>item.count))
     setLabels(value.map(item=>item._id.status==="New"?"Jauns":item._id.status==="Done"?"Pabeigts":"Iesākts"))
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
           backgroundColor: ["#ef255f","#fccf4d","#79bd8f"],
                      }           
        ]
      };
    return (
        <div>
          
<Pie
    data={data}
    width={50}
    height={400}
    options={{
        
        maintainAspectRatio: false,
        title: {
            display: true,
            text: 'Sadalījums pēc Statusa'
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

export default ChartStatusPercent;

