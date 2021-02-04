import React, { useState, createContext } from "react";
import { Post, User, Company, PostImage } from "../helpers/axioPost";
import * as Api from "../apiLinks/httpTasks";
import * as Obs from "../apiLinks/httpCompany";
//
export const TaskContext = createContext();
//
export const TaskProvider = (props) => {
  const [tasks, setTasks] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [editTaskModal, setEditTaskModal] = useState(false);
  const [observationtype, setobservationtype] = useState([]);
  const [selectedTask, setSelectedTask] = useState("");

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
    if (dataposted.fileSelected !== "") {
      await PostImage({
        file: dataposted.fileSelected,
        fileName: dataposted.image[0],
      });
    }
    await Post({
      api: Api.taskCreateApi,
      data: { ...dataposted, creatorId: User._id },
    });

    getTasks();
  };

  const editTask = async () => {
    const res = await Post({
      api: Api.editTaskApi,
      data: {
        id: selectedTask.id,
        issue: selectedTask.issue,
        comment: selectedTask.comment,
        placeId: selectedTask.place.value,
        responsibleId: selectedTask.responsible.value,
        observationId: selectedTask.observationtype.value,
        priority: selectedTask.priority.value,
        status: selectedTask.status.value,
        deadline: selectedTask.deadline,
        creator: selectedTask.creator,
      },
    });
    setEditTaskModal(!editTaskModal);
    if (!res.error) {
      setTasks(res);
    }
  };

  const archive = async (data) => {
    const res = await Post({
      api: Api.archiveTaskApi,
      data: { id: data },
    });
    if (!res.error) {
      setTasks(res);
    }
  };

  const taskFunctions = async (data) => {
    switch (data.type) {
      //queries
      case "getTasks":
        getTasks();
        break;
      case "getObservationTypes":
        getObservations();
        break;
      //create
      case "createModal":
        setCreateModal(!createModal);
        break;
      case "createTask":
        createTask(data.payload);
        break;
      // edit task
      case "editTaskModal":
        setEditTaskModal(!editTaskModal);
        setSelectedTask(data.payload);
        break;
      case "editSelectedTask":
        setSelectedTask(data.payload);
        break;
      case "editTask":
        editTask();
        break;
      case "closeEditTaskModal":
        setEditTaskModal(!editTaskModal);
        break;
      case "archive":
        archive(data.payload);
        break;
      default:
        console.log(data.type);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        taskFunctions,
        tasks,
        createModal,
        observationtype,
        selectedTask,
        editTaskModal,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};
