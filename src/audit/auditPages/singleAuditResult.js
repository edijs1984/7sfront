import React, { useContext, useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { SingleAuditContext } from "./../../context/singleAuditContext";
import { AuthContext } from "../../context/auth";
import Axios from "axios";
import { apiUrl } from "../../config.json";
import Pagin from "./../../comonComponents/pagination";
import ImageModal from "./../../tasks/quicktasks/imageModal";
import { Container } from "react-bootstrap";
import AuditCreateTAskModal from "./AuditCreateTaskModal";

const SingleAuditResult = () => {
  const token = localStorage.getItem("JwtToken");
  const { user } = useContext(AuthContext);
  const [editAuditData] = useContext(SingleAuditContext);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [openImgModal, setOpenImgModal] = useState(false);
  const [img, setImg] = useState([]);
  const [modal, setModal] = useState(false);
  const [item, setItem] = useState([]);

  useEffect(() => {
    const fetchResult = async () => {
      const res = await Axios.post(
        apiUrl + "/api/audit/single",
        { company: user.company, id: editAuditData._id },
        { headers: { "auth-token": token } }
      );
      if (editAuditData) {
        setPosts(res.data[0].audit);
      }
    };

    fetchResult();
  }, [editAuditData, user, token]);

  if (!posts.length > 0) {
    return (
      <div>
        <h1>No Audit selected</h1>
      </div>
    );
  } else {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexofFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexofFirstPost, indexOfLastPost);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
      <Container>
        <h1 style={{ fontSize: 40, color: "#ff6600", fontWeight: "bold" }}>
          Audit
        </h1>
        <Table size="sm">
          <thead>
            <tr style={{ fontSize: 18, color: "#ff6600" }}>
              <td>Name</td>
              <td>Place</td>
              <td>Family</td>
              <td>Issue</td>
              <td>Result</td>
              <td>Images</td>
              <td>CreateTask</td>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{editAuditData.name} </td>
                  <td>{editAuditData.area}</td>
                  <td>{item.sofs}</td>
                  <td>{item.issue}</td>
                  <td>{item.result}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="warning"
                      onClick={() => {
                        setOpenImgModal(!openImgModal);
                        setImg(item.image);
                      }}
                    >
                      {"Images:" + item.image.length}
                    </Button>
                  </td>
                  <td>
                    <Button
                      size="sm"
                      variant="info"
                      onClick={() => {
                        setModal(!modal);
                        setItem(item);
                        setImg(item.image);
                        console.log(item);
                      }}
                    >
                      Create task
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
        <ImageModal
          openImgModal={openImgModal}
          setOpenImgModal={setOpenImgModal}
          img={img}
          place={editAuditData.area}
        />
        <AuditCreateTAskModal
          modal={modal}
          item={item}
          img={img}
          place={editAuditData.area}
        />
      </Container>
    );
  }
};

export default SingleAuditResult;
