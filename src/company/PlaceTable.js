import React, { useContext, useState } from "react";
import { CompanyContext } from "./companyContetx";
import { paginate } from "../helpers/paginate";
import { Row, Table } from "react-bootstrap";
import Paggination from "../comonComponents/Paggination";
import EditPlaceModal from "./EditPlaceModal";
import EditBtn from "../comonComponents/buttons/editButton";
import DeleteBtn from "../comonComponents/buttons/deleteButton";

const PlaceTabel = () => {
  const { placeFunctions, places } = useContext(CompanyContext);
  const [selected, setSelected] = useState({});
  const [pageSize] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (data) => {
    setCurrentPage(data);
  };
  const place = paginate(places, currentPage, pageSize);

  return (
    <div>
      <Row className="justify-content-md-center">
        {place.length < 1 ? (
          ""
        ) : (
          <React.Fragment>
            <Table striped bordered hover size="sm">
              <thead
                style={{
                  backgroundColor: "#2f3c48",
                  color: "white",
                  textAlign: "center",
                }}
              >
                <tr>
                  <td>Place Name</td>
                  <td>Users assigned</td>
                  <td>Responsible</td>
                  <td>Edit</td>
                  <td>Delete</td>
                </tr>
              </thead>
              <tbody>
                {place.map((pla) => {
                  return (
                    <tr key={pla._id} style={{ textAlign: "center" }}>
                      <td>{pla.placeName}</td>
                      <td></td>
                      <td>
                        {pla.responsible !== null ? (
                          pla.responsible.name
                        ) : (
                          <h6 style={{ color: "red" }}>No responsible</h6>
                        )}
                      </td>
                      <td>
                        <EditBtn
                          onClick={() => {
                            placeFunctions({
                              type: "setEditModal",
                              payload: {
                                id: pla._id,
                                placeName: pla.placeName,
                                user: {
                                  value: pla.responsible
                                    ? pla.responsible._id
                                    : null,
                                  label: pla.responsible
                                    ? pla.responsible.name
                                    : null,
                                },
                              },
                            });
                          }}
                        />
                      </td>
                      <td>
                        <DeleteBtn
                          onClick={() =>
                            placeFunctions({
                              type: "deletePlace",
                              payload: {
                                id: pla._id,
                                userId: pla.responsible
                                  ? pla.responsible._id
                                  : "",
                              },
                            })
                          }
                          style={{ marginLeft: "1%" }}
                        >
                          Delete
                        </DeleteBtn>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Paggination
              pageSize={pageSize}
              count={places.length}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          </React.Fragment>
        )}
      </Row>

      <EditPlaceModal selected={selected} />
    </div>
  );
};
export default PlaceTabel;
