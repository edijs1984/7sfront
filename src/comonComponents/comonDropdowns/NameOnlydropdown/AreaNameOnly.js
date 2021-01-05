import React from "react";
import CustomDropdown from "./../../customDropdown";

const AreaNameOnly = ({ defaultValue, setName, available, header }) => {
  return (
    <div>
      {header ? header : <h4>Area</h4>}
      <CustomDropdown
        setValue={res => {
          setName(res.description);
        }}
        defaultValue={defaultValue}
        api={"/api/plant/all/area"}
        jsonName={"areaName"}
        jsonName2={"areaName"}
        placeholders={"Select Area"}
        available={available}
      />
    </div>
  );
};

export default AreaNameOnly;
