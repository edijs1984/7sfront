import React, { useState, createContext } from "react";

export const SingleAuditContext = createContext();
export const SingleAuditProvider = props => {
  const [editAuditData, setEditAuditData] = useState("");

  return (
    <SingleAuditContext.Provider value={[editAuditData, setEditAuditData]}>
      {props.children}
    </SingleAuditContext.Provider>
  );
};
