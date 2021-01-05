import React from "react";
import { Dropdown } from "semantic-ui-react";

const friendOptions = [
  {
    key: "New",
    text: "New",
    value: "New",
  },

  {
    key: "Updated",
    text: "Updated",
    value: "Updated",
  },
  {
    key: "Done",
    text: "Done",
    value: "Done",
  },
  {
    key: "Aproved Done",
    text: "Approved Done",
    value: "Aproved Done",
  },
];
const CustomStatus = ({ prio, defaultValue, available }) => {
  const onChange = (event, result) => {
    const { value } = result || event.target;
    prio({ selected: value });
  };

  return (
    <Dropdown
      defaultValue={defaultValue || ""}
      closeOnBlur
      selection
      clearable={true}
      options={friendOptions}
      onChange={onChange}
      disabled={available || false}
      // value={defaultValue}
    />
  );
};
export default CustomStatus;
