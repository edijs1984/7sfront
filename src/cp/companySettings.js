import React, { useState, useEffect, useContext } from "react";
import { Table, Form, Container, Button, Row } from "react-bootstrap";
import Axios from "axios";
import { apiUrl } from "../config.json";
import { AuthContext } from "../context/auth";
import { ToastContext } from "./../context/toastContext";
import Pagin from "../comonComponents/pagination";
import axios from "axios";

const CompanySettings = () => {
  const token = localStorage.getItem("JwtToken");
  const [place, setPlace] = useState([]);
  const { user } = useContext(AuthContext);
  const [newPlace, setNewPlace] = useState("");
  const { notify, badNotify } = useContext(ToastContext);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchResult();
    getUsers();
  }, [count]);
  const fetchResult = async () => {
    const res = await Axios.post(
      apiUrl + "/api/plant/all/department",
      { company: user.company },
      { headers: { "auth-token": token } }
    );
    setPlace(res.data);
  };

  const getUsers = async () => {
    const res = await axios.post(
      apiUrl + "/api/user/all",
      {
        company: user.company,
      },
      { headers: { "auth-token": token } }
    );
    setUsers(res.data);
  };
  console.log(users);

  const Submit = async (e) => {
    e.preventDefault();
    if (!newPlace) {
      return badNotify("Plase enter place name");
    }
    try {
      await Axios.post(
        apiUrl + "/api/plant/create/department",
        {
          company: user.company,
          creator: user.name,
          departmentName: newPlace,
        },
        { headers: { "auth-token": token } }
      );
      notify("Created successfully");
      setNewPlace("");
      setCount(1 + count);
    } catch (e) {
      badNotify(e.message);
    }
  };

  const RemovePlace = async (data) => {
    try {
      const res = await Axios.post(
        apiUrl + "/api/plant/delete/department",
        {
          id: data,
        },
        { headers: { "auth-token": token } }
      );
      notify("Deleted sucessfully");
      setCount(count + 1);
    } catch (e) {
      badNotify(e.message);
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexofFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = place.slice(indexofFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <Container fluid="sm">
      <Row className="justify-content-md-center">
        <div style={{ width: "50%" }}>
          <h1 style={{ color: "#ff6600", marginTop: "2%", marginBottom: "2%" }}>
            Places
          </h1>
          <div style={{ width: "20%" }}>
            <Form onSubmit={Submit}>
              <Form.Group controlId="place">
                <Form.Label>Place</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter place name"
                  value={newPlace}
                  onChange={(e) => setNewPlace(e.target.value)}
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>
              <Button type="submit">Create Place</Button>
            </Form>
          </div>
          <div style={{ margin: "2%" }} />
          {currentPosts.length < 1 ? (
            ""
          ) : (
            <Table striped bordered hover size="sm" style={{ width: "80%" }}>
              <thead>
                <tr>
                  <th>Place Name</th>
                  <th>Responsible</th>
                  <th>Delete</th>
                </tr>
              </thead>
              {currentPosts.map((pla) => {
                return (
                  <tbody>
                    <tr key={pla._id}>
                      <td>{pla.departmentName}</td>
                      <td>{pla.responsible}</td>
                      <td>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => RemovePlace(pla._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                    <tr></tr>
                  </tbody>
                );
              })}
            </Table>
          )}
          <Pagin
            postsPerPage={postsPerPage}
            totalPosts={place.length}
            paginate={paginate}
          />
        </div>
      </Row>
    </Container>
  );
};

export default CompanySettings;
