import React from "react";
import { Dropdown } from "semantic-ui-react";

const friendOptions = [
  {
    key: "5S",
    text: "5S",
    value: "5S",
  },

  {
    key: "Safety",
    text: "Safety",
    value: "Safety",
  },
  {
    key: "Sugesstion",
    text: "Sugesstion",
    value: "Sugesstion",
  },
];
const ObservationTypeDropdown = ({ prio, defaultValue, available }) => {
  const onChange = (event, result) => {
    const { value } = result || event.target;
    prio({ selected: value });
  };

  return (
    <Dropdown
      defaultValue={defaultValue || ""}
      placeholder="Observation"
      closeOnBlur
      selection
      clearable={true}
      options={friendOptions}
      onChange={onChange}
      disabled={available || false}
    />
  );
};
export default ObservationTypeDropdown;
