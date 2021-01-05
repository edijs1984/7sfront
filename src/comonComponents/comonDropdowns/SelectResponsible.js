import React from "react";
import CustomDropdownDefault from "../customDropdownDefault";

const SelectResponsible = ({ defaultValue, name, mail, available, header }) => {
  return (
    <div>
      {header ? header : <h4>Responsible</h4>}
      <CustomDropdownDefault
        setValue={(res) => {
          name(res.description);
          mail(res.name);
        }}
        defaultValue={defaultValue}
        api={"/api/user/all"}
        jsonName={"name"}
        jsonName2={"email"}
        placeholders={"Select Responsible"}
        available={available}
      />
    </div>
  );
};

export default SelectResponsible;
