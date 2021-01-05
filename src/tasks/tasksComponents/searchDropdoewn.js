import React from "react";
import { Dropdown } from "semantic-ui-react";
import "../tasksComponents/taseditor.css";
const SearchDropdown = () => {
  const friendOptions = [
    {
      key: "Name",
      text: "Name",
      value: "name"
    },
    {
      key: "Responsible",
      text: "Responsible",
      value: "Responsible"
    },
    {
      key: "Area",
      text: "Area",
      value: "Area"
    }
  ];
  return (
    <Dropdown
      placeholder="Search By"
      closeOnBlur
      selection
      options={friendOptions}
    />
  );
};
export default SearchDropdown;
