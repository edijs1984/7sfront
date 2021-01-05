import React from "react";
import { Dropdown } from "semantic-ui-react";

const friendOptions = [
  {
    key: "Droša rīcība",
    text: "Droša rīcība",
    value: "Droša rīcība",
  },

  {
    key: "Nedroša rīcība",
    text: "Nedroša rīcība",
    value: "Nedroša rīcība",
  },
  {
    key: "Nedroša darba vide",
    text: "Nedroša darba vide",
    value: "Nedroša darba vide",
  },
  {
    key: "Idejas",
    text: "Idejas",
    value: "Idejas",
  },
  {key:"Citi",
   text:"Citi",
   value:"Citi"
}
];
const ObservationTypeDropdownClearable = ({ prio, defaultValue, available }) => {
  const onChange = (event, result) => {
    const { value } = result || event.target;
    prio({ selected: value });
  };

  return (
    <Dropdown
    //   defaultValue={defaultValue || ""}
      placeholder="Novērojums"
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
export default ObservationTypeDropdownClearable;