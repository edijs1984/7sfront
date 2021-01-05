import React from "react";
import { Dropdown } from "semantic-ui-react";




const month=[
    {from:new Date().getFullYear()+"-01-01T00:00:59.000Z",to:new Date().getFullYear()+"-02-01T00:59:59.000Z"},
    {from:new Date().getFullYear()+"-02-01T00:00:59.000Z",to:new Date().getFullYear()+"-03-01T00:59:59.000Z"},
    {from:new Date().getFullYear()+"-03-01T00:00:59.000Z",to:new Date().getFullYear()+"-04-01T00:59:59.000Z"},
    {from:new Date().getFullYear()+"-04-01T00:00:59.000Z",to:new Date().getFullYear()+"-05-01T00:59:59.000Z"},
    {from:new Date().getFullYear()+"-05-01T00:00:59.000Z",to:new Date().getFullYear()+"-06-01T00:59:59.000Z"},
    {from:new Date().getFullYear()+"-06-01T00:00:59.000Z",to:new Date().getFullYear()+"-07-01T00:59:59.000Z"},
    {from:new Date().getFullYear()+"-07-01T00:00:59.000Z",to:new Date().getFullYear()+"-08-01T00:59:59.000Z"},
    {from:new Date().getFullYear()+"-08-01T00:00:59.000Z",to:new Date().getFullYear()+"-09-01T00:59:59.000Z"},
    {from:new Date().getFullYear()+"-09-01T00:00:59.000Z",to:new Date().getFullYear()+"-10-01T00:59:59.000Z"},
    {from:new Date().getFullYear()+"-10-01T00:00:59.000Z",to:new Date().getFullYear()+"-11-01T00:59:59.000Z"},
    {from:new Date().getFullYear()+"-11-01T00:00:59.000Z",to:new Date().getFullYear()+"-12-01T00:59:59.000Z"},
    {from:new Date().getFullYear()+"-12-01T00:00:59.000Z",to:new Date().getFullYear()+1+"-01-01T00:59:59.000Z"}
]





const friendOptions = [
  {
    key: 0,
    text: "Jan",
    value: 1
  },

  {
    key: 1,
    text: "February",
    value: 2,
  },
  {
    key: 2,
    text: "March",
    value: 3
  },
  {
    key: 3,
    text: "April",
    value: 4
  },
  {
    key: 4,
    text: "May",
    value: 5
  },

  {
    key: 5,
    text: "June",
    value: 6,
  },
  {
    key: 6,
    text: "July",
    value: 7
  },
  {
    key: 7,
    text: "August",
    value: 8
  },
  {
    key: 8,
    text: "September",
    value: 9
  },

  {
    key: 9,
    text: "October",
    value: 10,
  },
  {
    key: 10,
    text: "November",
    value: 11
  },
  {
    key: 11,
    text: "December",
    value: 12
  },
];
const CustomMonthDropdown = ({  defaultValue, available,setDates }) => {
  const onChange = (event, result) => {
    const { value } = result || event.target;
    // prio({ selected: value });
     setDates(month[value-1])
    
  };

  return (
    <Dropdown
      defaultValue={defaultValue || ""}
      closeOnBlur
      selection
    //   clearable={true}
      options={friendOptions}
      onChange={onChange}
      disabled={available || false}
      // value={defaultValue}
    />
  );
};
export default CustomMonthDropdown;