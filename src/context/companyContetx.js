import React, { createContext, useState } from "react";

export const CompanyContext = createContext();
export const CompanyProvider = props => {
  const [activeTable, setActiveTable] = useState({ value: "plant" });
  return (
    <CompanyContext.Provider value={[activeTable, setActiveTable]}>
      {props.children}
    </CompanyContext.Provider>
  );
};
