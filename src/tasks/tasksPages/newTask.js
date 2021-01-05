import React, { useContext } from "react";
import NewTaskComponent from "../tasksComponents/newTaskcomponent";
import { AuthContext } from "../../context/auth";
import { apiUrl } from "../../config.json";
import Axios from "axios";
import { ToastContext } from "./../../context/toastContext";

const NewTask = () => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("JwtToken");
  const { notify, badNotify } = useContext(ToastContext);
  const createData = async ({ val }) => {
    try {
      await Axios.post(
        apiUrl + "/api/task",
        {
          company: user.company,
          creator: user.name,
          task: val.values.task,
          cause: val.values.cause,
          issue: val.values.issue,
          name: val.taskName,
          area: val.area,
          subarea: val.workcenter,
          responsible: val.name,
          email: val.email,
          priority: val.priority.selected,
          deadline: val.deadline,
          status: "New"
        },
        { headers: { "auth-token": token } }
      );
      notify("Created");
    } catch (e) {
      badNotify(e.message);
    }
  };

  return <NewTaskComponent createData={val => createData({ val })} />;
};

export default NewTask;
