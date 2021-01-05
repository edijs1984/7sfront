import React, { useState, createContext } from "react";

export const CustomInputContext = createContext();
export const CustomInputProvider = props => {
  const [values, setValue] = useState("");

  return (
    <CustomInputContext.Provider value={[values, setValue]}>
      {props.children}
    </CustomInputContext.Provider>
  );
};
