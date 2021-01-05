import React, { useState, useEffect } from 'react';
import ChartByObservation from './chartsByObservation';
import ChartDepartment from './chartDepartment';
import ChartStatusPercent from './chartStatusPercent';
import { Col, Row,Button} from "react-bootstrap";
import YTDChart from './countChart';
import CustomInput from '../comonComponents/customInput';
import CustomCheckBox from '../comonComponents/customCheckBox';
import DatumsFilter from '../comonComponents/DatePickerFilter';
import { fetch,Company} from '../comonComponents/axiosFunctions';
import { apiUrl } from "../config.json";
import Axios from 'axios';
import CustomMonthDropdown from '../comonComponents/CustomMonthDropdown';
const ChartDashboard=()=>{
    const token = localStorage.getItem("JwtToken");
    var sogad=new Date().getFullYear()+"-12-31T23:59:59.000Z";
    var paggad=new Date().getFullYear()-1+"-12-31T23:59:59.000Z"
const [udpate,setUpdate]=useState(1);
const [showbar,setSwho]=useState(false);
const [from,setFrom]=useState(paggad);
const [to,setTo]=useState(sogad);
const [emp,setEmp]=useState({
    totalYear:10,
    totalMonth:10,
    _id:Company
})

const updateEmployees=async()=>{
const res=await Axios.post(apiUrl+"/api/others/totalusers/update",{
emp
},
{ headers: { "auth-token": token } }
);

setEmp({
    totalYear:res.data.totalUsersYear,
    totalMonth:res.data.totalUsersMonth,
    _id:Company
   

})
setUpdate(udpate+1)

};

useEffect(()=>{

const getUseres=async()=>{
const res= await fetch({api:"/api/others/totalusers"});



 
    setEmp({
        totalYear:res.data.totalUsersYear ,
        totalMonth:res.data.totalUsersMonth,
        _id:Company
    
    })


}
getUseres()
},[])    


return(
    <div>
        {showbar=== true?
        <Row style={{backgroundColor:"#f2e8c6"}}>
            <div style={{marginTop:"0.5%",marginLeft:"1%"}}>
                <CustomCheckBox value={showbar} change={()=>setSwho(!showbar)}/>
            </div>
                <div style={{marginTop:"0.5%",marginLeft:"1%"}}>
                <h6>Settings</h6>
              
            </div>

        <div style={{marginTop:"0.5%",marginLeft:"3%"}}>
        <CustomMonthDropdown setDates={res=>{setFrom(res.from);setTo(res.to)}}/>
        <h6>Select Month</h6>
        </div>
        <div style={{marginTop:"0.5%",marginLeft:"3%"}}>
        <DatumsFilter visual={"primary"} setDate={(date)=>setFrom(date)} values={new Date(from)}/>
        <h6>From</h6>
        </div>
        <div style={{marginTop:"0.5%",marginLeft:"3%"}}>
        <DatumsFilter visual={"primary"} setDate={(date)=>setTo(date)} values={new Date(to)}/>
        <h6>To</h6>
        </div>
        <div style={{marginTop:"0.5%",marginLeft:"3%"}}>
        <CustomInput currentValue={emp.totalYear} handl={val=>setEmp({totalYear:val,totalMonth:emp.totalMonth,_id:emp._id})} type="number"/>
        <h6>AVG Emp/Year</h6>
        </div>
        <div style={{marginTop:"0.5%"}}>
        <CustomInput currentValue={emp.totalMonth} handl={(val)=>setEmp({totalMonth:val,totalYear:emp.totalYear,_id:emp._id})} type="number"/>
        <h6>AVG Emp/Now</h6>
        </div>
        <div style={{marginTop:"0.5%",marginLeft:"-2%"}}>
        <Button onClick={updateEmployees}>Save</Button>
     
        </div>
        </Row>:
        <Row>
           <div style={{marginTop:"0.5%",marginLeft:"1%"}}>
                <CustomCheckBox value={showbar} change={()=>setSwho(!showbar)}/>
            </div>
                <div style={{marginTop:"0.5%",marginLeft:"1%"}}>
                <h6>Settings</h6>
              
            </div>
        </Row>
        }
        <Row>
        <Col>
    <ChartByObservation  from={from} to={to}/>
        
        </Col>
        <Col>
        
    <ChartStatusPercent from={from} to={to}/>
        </Col>

        </Row>
        <Row>

        <Col>
    <ChartDepartment from={from} to={to}/>
        </Col>
        <Col>
    <YTDChart update={udpate}/>
        </Col>
        </Row>
    </div>
)
};
export default ChartDashboard;