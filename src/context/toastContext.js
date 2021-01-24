import React, { createContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const ToastContext = createContext();
export const ToastProvider = (props) => {
  const [btsToast, setBtsToast] = useState(false);

  toast.configure({
    autoClose: 3000,
    draggable: false,
  });

  const notify = (data) => toast.success(data);
  const badNotify = (data) => toast.error(data);

  return (
    <ToastContext.Provider value={{ notify, badNotify, btsToast, setBtsToast }}>
      {props.children}
    </ToastContext.Provider>
  );
};
