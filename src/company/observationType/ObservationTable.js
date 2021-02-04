import React, { useContext, useState } from "react";
import { Table, Row } from "react-bootstrap";
import DeleteBtn from "../../comonComponents/buttons/deleteButton";
import { CompanyContext } from "../companyContetx";
import { TaskContext } from "../../tasks/taskContext";
import { paginate } from "../../helpers/paginate";
import Paggination from "../../comonComponents/Paggination";
import { countObsTypes } from "../../helpers/countUsers";
import ObsTypeCreate from "./ObsTypeCreate";
import obsFunc from "../funcTypes/obsFunc";
import ObsTypeEdit from "./ObsTypeEdit";

const ObsTabel = () => {
  const { obsFunctions, obsTypes } = useContext(CompanyContext);
  const { tasks } = useContext(TaskContext);
  const [pageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (data) => {
    setCurrentPage(data);
  };
  const obsType = paginate(obsTypes, currentPage, pageSize);

  return (
    <div>
      <Row className="justify-content-md-center">
        {obsType.length < 1 ? (
          ""
        ) : (
          <React.Fragment>
            <Table striped bordered size="sm" style={{ width: "70%" }}>
              <thead
                style={{
                  backgroundColor: "#2f3c48",
                  color: "white",
                  textAlign: "center",
                }}
              >
                <tr style={{ textAlign: "center" }}>
                  <td>Observation type</td>
                  <td>Sub-type</td>
                  <td>Open observations</td>
                  <td>Delete</td>
                </tr>
              </thead>
              <tbody>
                {obsType.map((item) => {
                  return (
                    <tr
                      style={{ cursor: "pointer", textAlign: "center" }}
                      key={item._id}
                      onDoubleClick={() =>
                        obsFunctions({
                          type: obsFunc.editObservationtypeModal,
                          payload: {
                            observationName: item.observationName,
                            id: item._id,
                            observationCategory: item.observationCategory,
                          },
                        })
                      }
                    >
                      <td
                        style={{
                          verticalAlign: "middle",
                          textAlign: "center",
                        }}
                      >
                        {item.observationName}
                      </td>
                      <td>
                        {item.observationCategory !== []
                          ? item.observationCategory.map((value, index) => {
                              return (
                                value +
                                (index !== item.observationCategory.length - 1
                                  ? " ,"
                                  : " .")
                              );
                            })
                          : ""}
                      </td>
                      <td>{countObsTypes(tasks, item._id)}</td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          textAlign: "center",
                          width: "10%",
                        }}
                      >
                        <DeleteBtn
                          onClick={() =>
                            obsFunctions({
                              type: obsFunc.deleteObservationtype,
                              payload: item._id,
                            })
                          }
                        >
                          Delete
                        </DeleteBtn>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <ObsTypeEdit />
          </React.Fragment>
        )}
      </Row>
      <Row className="justify-content-md-center">
        <Paggination
          pageSize={pageSize}
          count={obsTypes.length}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </Row>
    </div>
  );
};
export default ObsTabel;
