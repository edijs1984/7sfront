import React from "react";
import { Dropdown } from "semantic-ui-react";


const friendOptions = [
  {
    key: "Zema",
    text: "Zema",
    value: "Zema",
  },
  {
    key: "Vidēja",
    text: "Vidēja",
    value: "Vidēja",
  },
  {
    key: "Augsta",
    text: "Augsta",
    value: "Augsta",
  },
];
const PriorityDropdownClearable = ({ prio, defaultValue, available }) => {
  const onChange = (event, result) => {
    const { value } = result || event.target;
    prio({ selected: value });
  };
console.log(defaultValue)
  return (
    <Dropdown
      // defaultValue={defaultValue}
      placeholder="Prioritāte"
      closeOnBlur
      clearable={true}
      selection
      options={friendOptions}
      onChange={onChange}
      disabled={available}
      value={defaultValue}
    />
  );
};
export default PriorityDropdownClearable;
