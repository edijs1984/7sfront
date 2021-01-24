import React, { useContext } from "react";
import { TaskContext } from "../taskContext";
import { Table, Button } from "react-bootstrap";
import { changedate } from "../../helpers/editDate";
import { MdUnarchive } from "react-icons/md";
import ArchBtn from "../../comonComponents/buttons/archiveButton";
import EditBtn from "../../comonComponents/buttons/editButton";
const TaskTable = () => {
  const { taskFunctions, tasks } = useContext(TaskContext);

  return !tasks ? (
    "...Loding"
  ) : (
    <React.Fragment>
      <Button
        style={{ marginBottom: "1%", marginLeft: "1%" }}
        size="sm"
        onClick={() => taskFunctions({ type: "createModal" })}
      >
        Create Observation
      </Button>
      <Table striped bordered hover size="sm">
        <thead
          style={{
            backgroundColor: "#2f3c48",
            color: "white",
            textAlign: "center",
          }}
        >
          <tr>
            <td>Nr</td>
            <td>Issue</td>
            <td>Place</td>
            <td>Responsible</td>
            <td>Comment</td>
            <td>Observation</td>
            <td>Observation Category</td>
            <td>Creator</td>
            <td>Status</td>
            <td>Deadline</td>
            <td>Edit</td>
            <td>Archive</td>
          </tr>
        </thead>
        <tbody>
          {tasks.map((item) => {
            return (
              <tr key={item._id} style={{ textAlign: "center" }}>
                <td>{item.seq}</td>
                <td>{item.issue}</td>
                <td>{item.place.placeName}</td>
                <td>{item.responsible.name}</td>
                <td>{item.comment}</td>
                <td>{item.observationtype.observationName}</td>
                <td>{item.observationCategory}</td>
                <td>{item.creator.name}</td>
                <td>{item.status}</td>
                <td>{changedate(item.deadline)}</td>
                <td>
                  <EditBtn />
                </td>
                <td>
                  <ArchBtn onclick={() => console.log("yes")} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </React.Fragment>
  );
};

export default TaskTable;
