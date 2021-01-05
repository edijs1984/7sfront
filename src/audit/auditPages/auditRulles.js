import React, { useState, useContext, useEffect } from "react";
import AuditRullesComponent from "../auditComponents/auditRullesComponent";
import AuditRulleModal from "../auditComponents/auditRullesModal";
import Axios from "axios";
import { apiUrl } from "../../config.json";
import { AuthContext } from "../../context/auth";
import { ToastContext } from "./../../context/toastContext";
import EditAuditRulleModal from "./../auditComponents/editAuditRullesModal";

const AuditRulles = () => {
  const { notify, badNotify } = useContext(ToastContext);
  const token = localStorage.getItem("JwtToken");
  const { user } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [editOpenModal, setEditOpenModal] = useState(false);

  const familyOption = [
    { key: "Sort", value: "Sort", text: "Sort" },
    { key: "SetInOrder", value: "SetInOrder", text: "SetInOrder" },
    { key: "Shine", value: "Shine", text: "Shine" },
    { key: "Standardize", value: "Standardize", text: "Standardize" },
    { key: "Sustain", value: "Sustain", text: "Sustain" }
  ];
  const [sofs, setSofs] = useState("");
  const handle = (e, { value }) => setSofs(value);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(4);
  const [posts, setPosts] = useState([]);
  const [editData, setEditData] = useState({});

  const createData = async data => {
    try {
      await Axios.post(
        apiUrl + "/api/auditrulles",
        {
          sofs: sofs,
          issue: data.issue,
          inspectable: data.inspectable,
          rating: [
            { point1: data.point1value, rulle1: data.point1rulles },
            { point2: data.point2value, rulle2: data.point2rulles },
            { point3: data.point3value, rulle3: data.point3rulles }
          ],
          creator: user._id,
          company: user.company
        },
        { headers: { "auth-token": token } }
      );
      const res = await Axios.post(
        apiUrl + "/api/auditrulles/all",
        { company: user.company },
        { headers: { "auth-token": token } }
      );
      setPosts(res.data);
      notify("Created successefully");
    } catch (e) {
      badNotify("something went wrong");
    }
  };

  const handleEdit = async data => {
    try {
      const res = await Axios.post(
        apiUrl + "/api/auditrulles/edit",
        {
          id: editData._id,
          sofs: sofs === "" ? editData.sofs : sofs,
          issue: data.issue,
          inspectable: data.inspectable,
          rating: [
            { point1: data.point1value, rulle1: data.point1rulles },
            { point2: data.point2value, rulle2: data.point2rulles },
            { point3: data.point3value, rulle3: data.point3rulles }
          ],
          changedBy: user.name,
          company: user.company
        },
        {
          headers: { "auth-token": token }
        }
      );
      setPosts(res.data);
      notify("Rulle Updated");
    } catch (e) {
      badNotify("Something went wrong");
    }
  };

  const deleteData = async data => {
    try {
      await Axios.post(
        apiUrl + "/api/auditrulles/remove",
        { company: user.company, id: data },
        { headers: { "auth-token": token } }
      );
      const res = await Axios.post(
        apiUrl + "/api/auditrulles/all",
        { company: user.company },
        { headers: { "auth-token": token } }
      );
      setPosts(res.data);
      notify("Rulle Removed");
    } catch (e) {
      badNotify(e.message);
    }
  };

  useEffect(() => {
    const fetchResult = async () => {
      const res = await Axios.post(
        apiUrl + "/api/auditrulles/all",
        { company: user.company },
        { headers: { "auth-token": token } }
      );
      setPosts(res.data);
    };
    fetchResult();
  }, [user, token]);

  const indexOfLastPost = currentPage * postPerPage;
  const indexofFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = posts.slice(indexofFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);
  return (
    <React.Fragment>
      <AuditRullesComponent
        setOpenModal={setOpenModal}
        openModal={openModal}
        currentPosts={currentPosts}
        posts={posts}
        paginate={paginate}
        postsPerPage={postPerPage}
        deleteData={data => deleteData(data)}
        setEditData={data => setEditData(data)}
        setEditOpenModal={setEditOpenModal}
        editOpenModal={editOpenModal}
      />
      <AuditRulleModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        familyOption={familyOption}
        handle={handle}
        createData={data => {
          createData(data);
        }}
      />
      <EditAuditRulleModal
        editData={editData}
        setEditOpenModal={setEditOpenModal}
        editOpenModal={editOpenModal}
        handleEdit={data => handleEdit(data)}
        familyOption={familyOption}
        handle={handle}
        sofs={sofs}
      />
    </React.Fragment>
  );
};

export default AuditRulles;
