import React, { useState, createContext } from "react";
import { Post, User } from "../helpers/axioPost";
import * as Api from "../apiLinks/httpTasks";
import * as Obs from "../apiLinks/httpPlaces";
//
export const TaskContext = createContext();
export const TaskProvider = (props) => {
  const [tasks, setTasks] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [observationtype, setobservationtype] = useState([]);

  const getTasks = async () => {
    const res = await Post({
      api: Api.tasksAllApi,
    });
    setTasks(res);
  };
  const getObservations = async () => {
    const res = await Post({
      api: Obs.obsTypeAllApi,
    });
    setobservationtype(res);
  };

  const createTask = async (dataposted) => {
    await Post({
      api: Api.taskCreateApi,
      data: { ...dataposted, creatorId: User._id },
    });
    getTasks();
  };

  const taskFunctions = async (data) => {
    switch (data.type) {
      case "getTasks":
        getTasks();
        break;
      case "createModal":
        setCreateModal(!createModal);
        break;
      case "getObservations":
        getObservations();
        break;
      case "createTask":
        createTask(data.payload);
        break;
      default:
        console.log(data.type);
    }
  };

  return (
    <TaskContext.Provider
      value={{ taskFunctions, tasks, createModal, observationtype }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};
