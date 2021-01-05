import React from "react";
import { Dropdown } from "semantic-ui-react";
import "../tasksComponents/taseditor.css";

const friendOptions = [
  {
    key: "Low",
    text: "Low",
    value: "Low",
  },
  {
    key: "High",
    text: "High",
    value: "High",
  },
  {
    key: "Wery high",
    text: "Wery high",
    value: "Wery high",
  },
];
const PriorityDropdown = ({ prio, defaultValue, available }) => {
  const onChange = (event, result) => {
    const { value } = result || event.target;
    prio({ selected: value });
  };
  console.log(defaultValue);
  return (
    <Dropdown
      defaultValue={defaultValue}
      placeholder="Priority"
      closeOnBlur
      clearable={true}
      selection
      options={friendOptions}
      onChange={onChange}
      disabled={available}
      // value={defaultValue}
    />
  );
};
export default PriorityDropdown;
