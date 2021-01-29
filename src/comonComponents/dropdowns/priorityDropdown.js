import React from "react";
import Select from "react-select";

const PriorityDropdown = ({ placeholder, valueSelected, onChange }) => {
  var options = [
    { value: "Low", label: "Low" },
    { value: "High", label: "High" },
    { value: "Very High", label: "Very High" },
  ];

  return (
    <Select
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

export default PriorityDropdown;
