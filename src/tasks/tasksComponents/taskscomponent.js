import React, { useContext } from "react";
import { Table, Button } from "react-bootstrap";
import Pagin from "../../comonComponents/pagination";
import { EditTaskContext } from "./../../context/editTaskContext";
import { Link } from "react-router-dom";
const Taskcomponent = ({
  currentPosts,
  paginate,
  posts,
  postsPerPage,
  removeTask
}) => {
  const [, setEditTaskData] = useContext(EditTaskContext);

  return (
    <React.Fragment>
      <Table size="sm">
        <thead>
          <tr style={{ fontSize: 18, color: "#ff6600" }}>
            <td>Name</td>
            <td>Area</td>
            <td>Responsible</td>
            <td>Status</td>
            <td>Priority</td>
            <td>Deadline</td>
            <td>Postponed</td>
            <td>Creator</td>
            <td>View</td>
          </tr>
        </thead>

        <tbody>
          {currentPosts.map(item => {
            return (
              <tr key={item._id}>
                <td>{item.name} </td>
                <td>{item.area}</td>
                <td>{item.responsible}</td>
                <td>{item.status}</td>
                <td>{item.priority}</td>
                <td>{new Date(item.deadline).toLocaleDateString("fr-CA")}</td>
                <td>
                  {new Date(item.newdeadline).toLocaleDateString("fr-CA")}
                </td>
                <td>{item.creator}</td>
                <td>
                  <Button
                    as={Link}
                    to="/taskeditor"
                    size="sm"
                    variant="success"
                    onClick={() =>
                      setEditTaskData({
                        ...item
                      })
                    }
                  >
                    View
                  </Button>

                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => removeTask(item._id)}
                    disabled={item.status === "Aproved Done" ? false : true}
                  >
                    Archive
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Pagin
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </React.Fragment>
  );
};
export default Taskcomponent;
