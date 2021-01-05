import React, { useEffect } from 'react';
import { fetch } from '../comonComponents/axiosFunctions';
import { useState } from 'react';
import {Bar} from 'react-chartjs-3';

const YTDChart=({update})=>{

const [countMonth,setCountMonth]=useState(1);
const [countYear,setCountYear]=useState(1);
const [empYear,setEmpYear]=useState(1);
const [empMonth,setEmpMonth]=useState(1);

useEffect(()=>{

const fetching=async()=>{   
    const res = await fetch({api:"/api/quicktask/countbyyear"});
   setCountYear(res.data[0].n)
     const year=await fetch({api:"/api/quicktask/countbymonth"});
    setCountMonth(year.data[0].n)
    
    const emp=await fetch({api:"/api/others/totalusers"});
    

        setEmpYear(emp.data.totalUsersYear);
        setEmpMonth(emp.data.totalUsersMonth);

}
fetching();
},[countMonth,countYear,update]);

    const data = {
         labels: ["YTD","MTD"],
        datasets: [
          {
           label: "YTD",
          fill: true,
          lineTension: 0.1,
          data:[(countYear/empYear*12).toFixed(2),(countMonth/empMonth*12).toFixed(2)],
           backgroundColor: ["red","orange"],
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
             text: 'Novērojumu skaits / darbinieku sakitu / 12mēneši'

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

export default YTDChart;