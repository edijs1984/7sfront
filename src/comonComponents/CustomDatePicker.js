import React, { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import { Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
function Datums({ setDate, available, selectedDate }) {
  const [startDate, setStartDate] = useState(new Date());
  const ref = React.createRef();
  const [val, setVal] = useState("n");
  const [dt] = useState(new Date().toLocaleDateString("lt-LT"));

  const CustomDateInput = forwardRef(({ onClick, value }, ref) => (
    <Button
      onClick={onClick}
      onChange={onClick}
      ref={ref}
      style={{ fontSize: 15, paddingTop: "3%", paddingBottom: "3%" }}
      size="sm"
      variant="outline-primary"
      disabled={available}
    >
      {selectedDate
        ? new Date(selectedDate).toLocaleDateString("lt-LT")
        : val === "n"
        ? dt
        : value}
    </Button>
  ));
  return (
    <DatePicker
      dateFormat={"yyyy-MM-dd"}
      selected={startDate}
      onChange={(date) => {
        setStartDate(date);
        setDate(date);
        setVal(date);
      }}
      customInput={<CustomDateInput ref={ref} />}
      disabled={available}
    />
  );
}

export default Datums;
