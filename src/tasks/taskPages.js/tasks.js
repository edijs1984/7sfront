import React, { useContext, useEffect } from "react";
import CreateTask from "../createTask/CreateTask";
import TaskTable from "./taskTable";
import EditTask from "../editTask/EditTask";
import { TaskContext } from "../taskContext";

const Tasks = () => {
  const { taskFunctions } = useContext(TaskContext);

  useEffect(() => {
    taskFunctions({ type: "getTasks" });
  }, []);

  return (
    <div>
      <h1 style={{ fontWeight: "bold", color: "#2f3c48", padding: "1%" }}>
        Observations
      </h1>

      <TaskTable />
      <CreateTask />
      <EditTask />
    </div>
  );
};

export default Tasks;
