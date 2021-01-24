import React, { useContext } from "react";
import { Button, Table, ListGroup } from "react-bootstrap";
import { AuditContext } from "../auditContext";
import SettingsMenuBar from "../../comonComponents/settingMenuBar";
const RullesTable = () => {
  const { auditRulles, auditFunctions } = useContext(AuditContext);

  return (
    <React.Fragment>
      <SettingsMenuBar />
      <div style={{ marginTop: "2%" }}>
        <h1
          style={{
            color: "#2f3c48",
            marginTop: "2%",
            fontWeight: "bold",
            marginBottom: "2%",
          }}
        >
          Audit Rulles
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
              <td>Edit</td>
            </tr>
          </thead>
          <tbody>
            {auditRulles.map((item) => {
              return (
                <tr key={item._id}>
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
                      textAlign: "center",
                    }}
                  >
                    <Button
                      size="sm"
                      variant="warning"
                      onClick={() =>
                        auditFunctions({ type: "editRulles", payload: item })
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() =>
                        auditFunctions({
                          type: "delteRulles",
                          payload: item._id,
                        })
                      }
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </React.Fragment>
  );
};

export default RullesTable;
