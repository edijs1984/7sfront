import React, { createContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const ToastContext = createContext();
export const ToastProvider = props => {
  toast.configure({
    autoClose: 3000,
    draggable: false
  });

  const notify = data => toast.success(data);
  const badNotify = data => toast.error(data);

  return (
    <ToastContext.Provider value={{ notify, badNotify }}>
      {props.children}
    </ToastContext.Provider>
  );
};
