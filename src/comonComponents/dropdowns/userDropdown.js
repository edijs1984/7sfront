import React, { useContext, useEffect } from "react";
import Select from "react-select";
import { UserContext } from "../../users/userContext";

const UserDropdown = ({ placeholder, valueSelected, onChange, clear }) => {
  const { allUsers, userFunctions } = useContext(UserContext);
  const plch = <h6>Select user</h6>;
  var options = [];
  //get users
  useEffect(() => {
    userFunctions({ type: "getAllUsers" });
  }, []);
  //map users to state
  allUsers.forEach((i) => {
    options.push({ value: i._id, label: i.name });
  });
  //default value if has

  return (
    <Select
      isClearable={clear}
      options={options}
      onChange={(value) => onChange(value)}
      placeholder={placeholder}
      value={valueSelected}
      theme={(theme) => ({
        ...theme,
        borderRadius: 4,
        borderThickness: 1,

        colors: {
          ...theme.colors,
          boxShadow: "#aaaaaa",
          primary: "#aaaaaa",
          primary25: "neutral5",
        },
      })}
    />
  );
};

export default UserDropdown;
