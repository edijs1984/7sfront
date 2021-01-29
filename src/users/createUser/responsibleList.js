import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import BootstrapDropdown from "../../comonComponents/dropdowns/BootstarpDropdown";
import { Post } from "../../helpers/axioPost";
import * as ApiPlaces from "../../apiLinks/httpPlaces";

const ResponsibleList = ({ user, setUser }) => {
  const [count, setCount] = useState([]);
  const [placesWithoutMan, setPlacesWithoutMAn] = useState([]);
  useEffect(() => {
    getPlaceWitoutManager();
  }, []);

  const getPlaceWitoutManager = async () => {
    const res = await Post({ api: ApiPlaces.placesWithoutMan });
    setPlacesWithoutMAn(res);
  };

  return count !== "" ? (
    <div>
      <Button
        variant="warning"
        onClick={() => setCount([...count, new Date().getTime()])}
      >
        Add places
      </Button>
      <h6 style={{ marginTop: "1%", marginBottom: "1%" }}>
        Places responsible for:
      </h6>
      <Form.Group controlId="formListOfInputs">
        <div style={{ marginTop: "2%" }}>
          {count !== ""
            ? count.map((item, index) => {
                return (
                  <div
                    key={item}
                    style={{
                      marginTop: "2%",
                      display: "table",
                    }}
                  >
                    <div
                      style={{
                        display: "table-cell",
                        width: "90%",
                        marginRight: "5%",
                      }}
                    >
                      <BootstrapDropdown
                        value={placesWithoutMan}
                        funk={(e) =>
                          user.responsibleForPlace.splice(index, 1, e)
                        }
                      />
                    </div>
                    <div
                      style={{
                        display: "table-cell",
                        width: "5%",
                      }}
                    ></div>
                    <div
                      style={{
                        display: "table-cell",
                      }}
                    >
                      <Button
                        variant="danger"
                        onClick={() => {
                          count.splice(index, 1);
                          setCount([...count]);
                          user.responsibleForPlace.splice(index, 1);
                          setUser({ ...user });
                        }}
                      >
                        X
                      </Button>
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
      </Form.Group>
    </div>
  ) : (
    ""
  );
};

export default ResponsibleList;
