import React, { useContext } from "react";
import TaskEditorComponent from "../tasksComponents/taskEditorcomponent";
import { AuthContext } from "../../context/auth";
import { apiUrl } from "../../config.json";
import Axios from "axios";
import { ToastContext } from "./../../context/toastContext";

const TaskEditor = () => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("JwtToken");
  const { notify, badNotify } = useContext(ToastContext);
  const editData = async val => {
    console.log(val.editTaskData.area);
    try {
      await Axios.patch(
        apiUrl + "/api/task",
        {
          id: val.editTaskData._id,
          company: user.company,
          editedBy: user.name,
          task: val.editTaskData.task,
          cause: val.editTaskData.cause,
          issue: val.editTaskData.issue,
          name: val.editTaskData.name,
          area: val.editTaskData.area,
          subarea: val.editTaskData.subarea,
          responsible: val.name || val.editTaskData.responsible,
          priority: val.editTaskData.priority,
          newdeadline: val.editTaskData.rescheduled,
          status: val.editTaskData.status,
          estimatedTime: val.editTaskData.estimatedTime,
          comment: val.editTaskData.comment,
          completedHours: val.editTaskData.completedHours,
          email: val.email || val.editTaskData.email
        },
        { headers: { "auth-token": token } }
      );
      notify("Task is Updated");
    } catch (e) {
      badNotify(e.message);
    }
  };

  return <TaskEditorComponent editData={editData} />;
};

export default TaskEditor;
