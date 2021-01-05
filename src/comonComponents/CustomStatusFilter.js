import React from "react";
import { Dropdown } from "semantic-ui-react";

const friendOptions = [
  {
    key: "New",
    text: "Jauns",
    value: "New",
  },

  {
    key: "Updated",
    text: "Iesākts",
    value: "Updated",
  },
  {
    key: "Done",
    text: "Pabeigts",
    value: "Done",
  },
  {
    key: "Aproved Done",
    text: "Apstiprināts pabeigts",
    value: "Aproved Done",
  },
];
const CustomStatusFilter = ({ prio, defaultValue, available }) => {
  const onChange = (event, result) => {
    const { value } = result || event.target;
    prio({ selected: value });
  };

  return (
    <Dropdown
      // defaultValue={defaultValue || ""}
      closeOnBlur
      selection
      clearable={true}
      options={friendOptions}
      onChange={onChange}
      disabled={available || false}
      value={defaultValue}
    />
  );
};
export default CustomStatusFilter;
