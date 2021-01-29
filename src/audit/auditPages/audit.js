import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Container } from "react-bootstrap";
import { AuthContext } from "../../context/auth";
import { SingleAuditContext } from "./../../context/singleAuditContext";
import Axios from "axios";
import { apiUrl } from "../../config.json";

const Audit = () => {
  const token = localStorage.getItem("JwtToken");
  const { user } = useContext(AuthContext);
  const [, setEditAuditData] = useContext(SingleAuditContext);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchResult = async () => {
      const res = await Axios.post(
        apiUrl + "/api/audit/all",
        { company: user.company },
        { headers: { "auth-token": token } }
      );
      setPosts(res.data);
    };

    fetchResult();
  }, [user, token]);

  return (
    <Container>
      <h1 style={{ fontSize: 40, color: "#ff6600", fontWeight: "bold" }}>
        Audit List
      </h1>
      <Table size="sm">
        <thead>
          <tr style={{ fontSize: 18, color: "#ff6600" }}>
            <td>Name</td>
            <td>Place</td>
            <td>Audit Date</td>
            <td>Status</td>
            <td>View</td>
          </tr>
        </thead>
        <tbody>
          {posts.map((item) => {
            return (
              <tr key={item._id}>
                <td>{item.name} </td>
                <td>{item.area}</td>
                <td>{new Date(item.createdAt).toLocaleDateString("fr-CA")}</td>
                <td>{item.status}</td>
                <td>
                  <Button
                    as={Link}
                    to="/auditresult"
                    size="sm"
                    variant="success"
                    onClick={() =>
                      setEditAuditData({
                        ...item,
                      })
                    }
                  >
                    View
                  </Button>
                  <Button size="sm" variant="danger">
                    Archive
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default Audit;
