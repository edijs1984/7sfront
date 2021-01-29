import React, { useContext, useEffect } from "react";
import Select from "react-select";
import { CompanyContext } from "../../company/companyContetx";

const PlaceMultipleDropdown = ({ placeholder, valueSelected, onChange }) => {
  const { places, placeFunctions } = useContext(CompanyContext);

  var options = [];

  useEffect(() => {
    placeFunctions({ type: "getAllPlaces" });
  }, []);

  if (places)
    places
      .filter((i) => !i.responsible)
      .forEach((i) => {
        options.push({ value: i._id, label: i.placeName });
      });

  //default value if has
  return (
    <Select
      isClearable
      isMulti
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

export default PlaceMultipleDropdown;
