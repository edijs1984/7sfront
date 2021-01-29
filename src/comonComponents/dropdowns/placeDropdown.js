import React, { useContext, useEffect } from "react";
import Select from "react-select";
import { CompanyContext } from "../../company/companyContetx";

const PlaceDropdown = ({
  placeholder,
  valueSelected,
  onChange,
  multi,
  clear,
}) => {
  const { places, placeFunctions } = useContext(CompanyContext);

  var options = [];

  useEffect(() => {
    placeFunctions({ type: "getAllPlaces" });
  }, []);

  if (places)
    places.forEach((i) => {
      options.push({ value: i._id, label: i.placeName });
    });

  //default value if has
  return (
    <Select
      isClearabl={clear}
      isMulti={multi}
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

export default PlaceDropdown;
