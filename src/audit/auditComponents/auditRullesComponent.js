import React from "react";
import { Button, Table, ListGroup } from "react-bootstrap";
import "./auditRulles.css";

import Pagin from "./../../comonComponents/pagination";
const AuditRullesComponent = ({
  setOpenModal,
  openModal,
  currentPosts,
  paginate,
  posts,
  postsPerPage,
  deleteData,
  setEditData,
  setEditOpenModal,
  editOpenModal
}) => {
  const openmodal = () => {
    setOpenModal(!openModal);
  };

  return (
    <React.Fragment>
      <div style={{ marginTop: "2%" }}>
        <h1 style={{ color: "#ff6600" }}>Audit rules</h1>
        <Table size="sm" bordered>
          <thead>
            <tr style={{ fontSize: 18, color: "#ff6600", textAlign: "center" }}>
              <td>Family</td>
              <td>Issue</td>
              <td>Inspectable</td>
              <td>Rulles</td>
              <td>Points</td>
              <td>
                {
                  <Button onClick={() => openmodal()} size="sm" variant="info">
                    Create New
                  </Button>
                }
              </td>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map(item => {
              return (
                <tr key={item._id}>
                  <td
                    style={{
                      fontWeight: "bold",
                      fontSize: 20,
                      verticalAlign: "middle",
                      textAlign: "center"
                    }}
                  >
                    {item.sofs}
                  </td>
                  <td
                    style={{
                      fontWeight: "bold",
                      fontSize: 15,
                      verticalAlign: "middle",
                      textAlign: "center"
                    }}
                  >
                    {item.issue}
                  </td>
                  <td
                    style={{
                      fontWeight: "bold",
                      fontSize: 15,
                      verticalAlign: "middle",
                      textAlign: "center"
                    }}
                  >
                    {item.inspectable}
                  </td>
                  <td>
                    <ul>
                      <li>{item.rating[0].rulle1}</li>
                      <li>{item.rating[1].rulle2}</li>
                      <li>{item.rating[2].rulle3}</li>
                    </ul>
                  </td>
                  <td>
                    <ListGroup>
                      <li>{item.rating[0].point1}</li>
                      <li>{item.rating[1].point2}</li>
                      <li>{item.rating[2].point3}</li>
                    </ListGroup>
                  </td>
                  <td
                    style={{
                      width: "7%",
                      verticalAlign: "middle",
                      textAlign: "center"
                    }}
                  >
                    <Button
                      size="sm"
                      variant="warning"
                      onClick={() => {
                        setEditData(item);
                        setEditOpenModal(!editOpenModal);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => deleteData(item._id)}
                    >
                      Delete
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
      </div>
    </React.Fragment>
  );
};

export default AuditRullesComponent;
