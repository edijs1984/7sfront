import React, { useState, createContext } from "react";

export const EditTaskContext = createContext();
export const EditTaskProvider = props => {
  const [editTaskData, setEditTaskData] = useState("");

  return (
    <EditTaskContext.Provider value={[editTaskData, setEditTaskData]}>
      {props.children}
    </EditTaskContext.Provider>
  );
};
