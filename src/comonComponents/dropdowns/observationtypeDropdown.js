import React, { useContext, useEffect } from "react";
import { Form } from "react-bootstrap";
import { TaskContext } from "../../tasks/taskContext";

const ObservationDropdown = ({ funk, dunk }) => {
  const { taskFunctions, observationtype } = useContext(TaskContext);
  useEffect(() => {
    taskFunctions({ type: "getObservations" });
  }, []);

  return (
    <Form.Control size="sm" as="select" onClick={(e) => funk(e.target.value)}>
      <option>{"select Observation Type"}</option>
      {!observationtype || observationtype.length > 0
        ? observationtype.map((item) => {
            return (
              <option key={item._id} value={item._id} txt={item}>
                {item.observationName}
              </option>
            );
          })
        : ""}
    </Form.Control>
  );
};

export default ObservationDropdown;
