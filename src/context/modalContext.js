import React, { createContext, useState } from "react";

export const ModalContext = createContext();
export const ModalProvider = props => {
  const [modalStatus, setModalStatus] = useState(false);

  return (
    <ModalContext.Provider value={[modalStatus, setModalStatus]}>
      {props.children}
    </ModalContext.Provider>
  );
};
