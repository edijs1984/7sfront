import React from "react";
import CustomDropdown from "./../../customDropdown";

const ResponsibleNameOnly = ({ defaultValue, setName, header, available }) => {
  return (
    <div>
      {header ? header : <h4>Responsible</h4>}
      <CustomDropdown
        setValue={res => setName(res.name)}
        defaultValue={defaultValue}
        api={"/api/user/all"}
        jsonName={"name"}
        jsonName2={"name"}
        placeholders={"Select Responsible"}
        available={available}
      />
    </div>
  );
};

export default ResponsibleNameOnly;
