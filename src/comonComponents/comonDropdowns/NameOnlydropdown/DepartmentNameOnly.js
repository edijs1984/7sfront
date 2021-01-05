import React from "react";
import CustomDropdown from "./../../customDropdown";

const DepartmentNameOnly = ({ defaultValue, setName, available, header }) => {
  return (
    <div>
      {header ? header : <h4>Department</h4>}
      <CustomDropdown
        setValue={res => {
          setName(res.description);
        }}
        defaultValue={defaultValue}
        api={"/api/plant/all/department"}
        jsonName={"departmentName"}
        jsonName2={"departmentName"}
        placeholders={"Select Department"}
        available={available}
      />
    </div>
  );
};

export default DepartmentNameOnly;
