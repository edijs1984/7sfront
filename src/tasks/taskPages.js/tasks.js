import React, { useContext, useEffect } from "react";
import CreateTask from "../createTask/CreateTask";
import { TaskContext } from "../taskContext";
import TaskTable from "./taskTable";

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
    </div>
  );
};

export default Tasks;
