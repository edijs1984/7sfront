import React from "react";
import Select from "react-select";

const FiveSDropdown = ({ placeholder, valueSelected, onChange }) => {
  var options = [
    { value: "Sort", label: "Sort" },
    { value: "Set In Order", label: "Set In Order" },
    { value: "Standardize", label: "Standardize" },
    { value: "Shine", label: "Shine" },
    { value: "Sustain", label: "Sustain" },
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

export default FiveSDropdown;
