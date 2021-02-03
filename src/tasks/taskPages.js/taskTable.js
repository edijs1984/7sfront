import React, { useContext, useState } from "react";
import { TaskContext } from "../taskContext";
import { Table, Button, Row } from "react-bootstrap";
import { changedate } from "../../helpers/editDate";
import ArchBtn from "../../comonComponents/buttons/archiveButton";
import { paginate } from "../../helpers/paginate";
import Paggination from "../../comonComponents/Paggination";

const TaskTable = () => {
  const { taskFunctions, tasks } = useContext(TaskContext);
  const [pageSize] = useState(14);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (data) => {
    setCurrentPage(data);
  };
  const task = paginate(tasks, currentPage, pageSize);

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
      <Row style={{ margin: "1%" }}>
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
              <td>Priority</td>
              <td>Deadline</td>
              <td>Archive</td>
            </tr>
          </thead>
          <tbody>
            {task.map((item) => {
              return (
                <tr
                  key={item._id}
                  style={{ textAlign: "center", cursor: "pointer" }}
                  onDoubleClick={() =>
                    taskFunctions({
                      type: "editTaskModal",
                      payload: {
                        id: item._id,
                        creator: item.creator,
                        issue: item.issue,
                        comment: item.comment,
                        deadline: item.deadline,
                        observationtype: {
                          value: item.observationtype._id,
                          label: item.observationtype.observationName,
                        },
                        place: {
                          value: item.place._id,
                          label: item.place.placeName,
                        },
                        priority: {
                          value: item.priority,
                          label: item.priority,
                        },
                        responsible: {
                          value: item.responsible._id,
                          label: item.responsible.name,
                        },
                        status: { value: item.status, label: item.status },
                      },
                    })
                  }
                >
                  <td>{item.seq}</td>
                  <td>{item.issue}</td>
                  <td>{item.place ? item.place.placeName : ""}</td>
                  <td>{item.responsible ? item.responsible.name : ""}</td>
                  <td>{item.comment}</td>
                  <td>
                    {item.observationtype
                      ? item.observationtype.observationName
                      : ""}
                  </td>
                  <td>{item.observationCategory}</td>
                  <td>{item.creator ? item.creator.name : ""}</td>
                  <td>{item.status}</td>
                  <td>{item.priority ? item.priority : ""}</td>
                  <td>{changedate(item.deadline)}</td>
                  <td>
                    <ArchBtn
                      onClick={() =>
                        taskFunctions({ type: "archive", payload: item._id })
                      }
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Row>
      <Row className="justify-content-md-center">
        <Paggination
          pageSize={pageSize}
          count={tasks.length}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </Row>
    </React.Fragment>
  );
};

export default TaskTable;
