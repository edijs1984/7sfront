import React, { useContext, useEffect } from "react";
import Select from "react-select";
import { TaskContext } from "../../tasks/taskContext";

const ObservationTypeDropdown = ({
  placeholder,
  valueSelected,
  onChange,
  clear,
}) => {
  const { observationtype, taskFunctions } = useContext(TaskContext);

  var options = [];
  //get users
  useEffect(() => {
    taskFunctions({ type: "getObservationTypes" });
  }, []);
  //map users to state
  observationtype.forEach((i) => {
    options.push({ value: i._id, label: i.observationName });
  });
  //default value if has

  return (
    <Select
      isClearable={clear}
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

export default ObservationTypeDropdown;
