import React, { useContext, useState } from "react";
import { Button, Table, ListGroup, Row } from "react-bootstrap";
import { AuditContext } from "../auditContext";
import SettingsMenuBar from "../../comonComponents/settingMenuBar";
import DeleteBtn from "../../comonComponents/buttons/deleteButton";
import { paginate } from "../../helpers/paginate";
import Paggination from "../../comonComponents/Paggination";
const RullesTable = () => {
  const { auditRulles, auditFunctions } = useContext(AuditContext);
  const [pageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (data) => {
    setCurrentPage(data);
  };
  const audit = paginate(auditRulles, currentPage, pageSize);

  return (
    <React.Fragment>
      <SettingsMenuBar />
      <div style={{ marginTop: "2%" }}>
        <h1
          style={{
            color: "#2f3c48",
            marginTop: "2%",

            marginBottom: "2%",
          }}
        >
          5S Audit Rulles
        </h1>
        <Button
          onClick={() => auditFunctions({ type: "createModal" })}
          size="sm"
          style={{ marginBottom: "1%" }}
        >
          Create New
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
              <td>Family</td>
              <td>Issue</td>
              <td>Inspectable</td>
              <td>Rulles</td>
              <td>Points</td>
              <td>Delete</td>
            </tr>
          </thead>
          <tbody>
            {audit.map((item) => {
              return (
                <tr
                  style={{ cursor: "pointer" }}
                  key={item._id}
                  onDoubleClick={() =>
                    auditFunctions({ type: "editRulles", payload: item })
                  }
                >
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                    }}
                  >
                    {item.sofs}
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                    }}
                  >
                    {item.issue}
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                    }}
                  >
                    {item.inspectable}
                  </td>
                  <td>
                    <ul>
                      <li>{item.rulle1}</li>
                      <li>{item.rulle2}</li>
                      <li>{item.rulle3}</li>
                    </ul>
                  </td>
                  <td>
                    <ListGroup>
                      <li>{item.point1}</li>
                      <li>{item.point2}</li>
                      <li>{item.point3}</li>
                    </ListGroup>
                  </td>
                  <td
                    style={{
                      width: "7%",
                      verticalAlign: "middle",
                      textAlign: "center",
                    }}
                  >
                    <DeleteBtn
                      onClick={() =>
                        auditFunctions({
                          type: "deleteRulles",
                          payload: item._id,
                        })
                      }
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Row className="justify-content-md-center">
          <Paggination
            pageSize={pageSize}
            count={auditRulles.length}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        </Row>
      </div>
    </React.Fragment>
  );
};

export default RullesTable;
