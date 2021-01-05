import React, { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import { Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
function DatumsFilter({ setDate, available,visual,values}) {
  // const [startDate, setStartDate] = useState(new Date());
  const ref = React.createRef();
  const [val, setVal] = useState("n");
  const [dt]=useState (new Date(values).toLocaleDateString("lt-LT"))

  const CustomDateInput = forwardRef(({ onClick, value }, ref) => (
    <Button
      onClick={onClick}
      onChange={onClick}
      ref={ref}
      style={{ fontSize: 15,paddingTop:"7%",paddingBottom:"7%" }}
      size="sm"
      variant={visual}
      disabled={available}
      
    >
      {val === "n" ? dt : value}
    </Button>
  ));
  return (
    <DatePicker

      dateFormat={"yyyy-MM-dd"}
      selected={values}
      onChange={date => {
        // setStartDate(date);
        setDate(date);
        setVal(date);
      }}
      customInput={<CustomDateInput ref={ref} />}
      disabled={available}
    />
  );
}

export default DatumsFilter;
