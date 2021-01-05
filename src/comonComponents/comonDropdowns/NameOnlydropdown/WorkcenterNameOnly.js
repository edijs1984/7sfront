import React from "react";
import CustomDropdown from "./../../customDropdown";

const WorkcenterNameOnly = ({ defaultValue, setName, available, header }) => {
  return (
    <div>
      {header ? header : <h4>Workcenter</h4>}
      <CustomDropdown
        setValue={res => {
          setName(res.description);
        }}
        defaultValue={defaultValue}
        api={"/api/plant/all/workcenter"}
        jsonName={"workcenterName"}
        jsonName2={"workcenterName"}
        placeholders={"Select Workcenter"}
        available={available}
      />
    </div>
  );
};

export default WorkcenterNameOnly;
