import React from "react";
import Select from "react-select";

const StatusDropdown = ({ placeholder, valueSelected, onChange }) => {
  var options = [
    { value: "New", label: "New" },
    { value: "Updated", label: "Updated" },
    { value: "Approved", label: "Approved" },
    { value: "Approved confirmed", label: "Approved confirmed" },
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

export default StatusDropdown;
