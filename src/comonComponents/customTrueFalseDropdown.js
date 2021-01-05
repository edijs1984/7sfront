import React from "react";
import { Dropdown } from "semantic-ui-react";

const friendOptions = [
  {
    key: "false",
    text: "False",
    value: "false",
  },

  {
    key: "true",
    text: "True",
    value: "true",
  },
];
const CustomTrueFalseDropdown = ({ prio, defaultValue, available }) => {
  const onChange = (event, result) => {
    const { value } = result || event.target;
    prio({ selected: value });
  };

  return (
    <Dropdown
      defaultValue={defaultValue || ""}
      placeholder="status"
      closeOnBlur
      selection
      clearable={true}
      options={friendOptions}
      onChange={onChange}
      disabled={available || false}
    />
  );
};
export default CustomTrueFalseDropdown;
