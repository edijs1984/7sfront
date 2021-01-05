import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Container } from "react-bootstrap";
import Pagin from "./../../comonComponents/pagination";
import { AuthContext } from "../../context/auth";
import { SingleAuditContext } from "./../../context/singleAuditContext";
import Axios from "axios";
import { apiUrl } from "../../config.json";

const Audit = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const token = localStorage.getItem("JwtToken");
  const { user } = useContext(AuthContext);
  const [, setEditAuditData] = useContext(SingleAuditContext);

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

  const indexOfLastPost = currentPage * postsPerPage;
  const indexofFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexofFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);
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
          {currentPosts.map(item => {
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
                        ...item
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
      <Pagin
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </Container>
  );
};

export default Audit;
