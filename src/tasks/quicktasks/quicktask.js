import React, { useEffect, useContext, useState } from "react";
import QuickTaskComponent from "./quickTaskComponent";
import Axios from "axios";
import { AuthContext } from "../../context/auth";
import { apiUrl } from "../../config.json";
import QuickTaskHead from "./quicktaskHead";
import QtSettingsModal from "./QtSettingsModal";
import QuickTaskCreateModal from "./qucikTaskCreateModal";

const QuickTask = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(15);
  const [modalStatus, setSettingsModal] = useState(false);
  const { user } = useContext(AuthContext);
  const [finalFilter, setFinalFilter] = useState([]);
  const [mySettings, setMysettings] = useState({});
  const [crModalStatus,setCrmodalStatus]=useState(false);

  const token = localStorage.getItem("JwtToken");

  useEffect(() => {
    const update = async () => {
      const result = await Axios.post(
        apiUrl + "/api/personalsettings/mysettings",
        {
          userId: user._id,
          company: user.company,
        },
        { headers: { "auth-token": token } }
      );
      if (result.data[0] === undefined) {
        return null;
      } else {
        setMysettings(result.data[0]);
      }
    };
    update();
  }, [user, token]);

  useEffect(() => {
    const fetchResult = async () => {
      const res = await Axios.post(
        apiUrl + "/api/quicktask/all",
        { company: user.company },
        { headers: { "auth-token": token } }
      );
      setPosts(res.data);
    };

    fetchResult();
  }, [user, token]);

  const removeQuickTask = async (id, image) => {
    const res = await Axios.post(
      apiUrl + "/api/quicktask/archive",
      { company: user.company, id: id, image: image },
      { headers: { "auth-token": token } }
    );
    if (res.status === 200) {
      const res = await Axios.post(
        apiUrl + "/api/quicktask/all",
        {
          company: user.company,
        },
        { headers: { "auth-token": token } }
      );
      setPosts(res.data);
    }
  };

  const updateList = async () => {
    const res = await Axios.post(
      apiUrl + "/api/quicktask/all",
      {
        company: user.company,
      },
      { headers: { "auth-token": token } }
    );
    setPosts(res.data);
  };

  const filter = async (props) => {
    try {
      const res = await Axios.post(
        apiUrl + "/api/quicktask/filter",
        {
          company: user.company,
          responsible: props.responsible,
          deadline: props.datums,
          status: props.Status,
          department: props.department,
          observation: props.obseravtion,
        },
        { headers: { "auth-token": token } }
      );
      setPosts(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const settingsModal = () => setSettingsModal(!modalStatus);
  const createModal=()=>setCrmodalStatus(!crModalStatus);
  const updateMysettings = async (value) => {
    try {
      const res = await Axios.post(
        apiUrl + "/api/personalsettings/create",
        {
          company: user.company,
          userId: user._id,
          area: value.myDepartments,
          statusPabeigts: value.pabeigts,
          statusApPabeigts: value.apsPabeigts,
          drosaRiciba: value.drošaRīcība,
        },
        { headers: { "auth-token": token } }
      );
      setMysettings(res.data[0]);
      console.log(res.data[0]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const filtredPosts =
      mySettings.area === undefined || mySettings.area.length === 0
        ? posts
        : posts.filter(
            (data) =>
              data.area === mySettings.area[0] ||
              data.area === mySettings.area[1] ||
              data.area === mySettings.area[2] ||
              data.area === mySettings.area[3] ||
              data.area === mySettings.area[4] ||
              data.area === mySettings.area[5] ||
              data.area === mySettings.area[6] ||
              data.area === mySettings.area[7] ||
              data.area === mySettings.area[9] ||
              data.area === mySettings.area[10] ||
              data.area === mySettings.area[11] ||
              data.area === mySettings.area[12] ||
              data.area === mySettings.area[13] ||
              data.area === mySettings.area[14] ||
              data.area === mySettings.area[16] ||
              data.area === mySettings.area[16]
          );

    const checkDrosaRiciba =
      mySettings.drosaRiciba === false
        ? filtredPosts.filter((data) => data.observation !== "Droša rīcība")
        : filtredPosts;

    const pabeigts =
      mySettings.statusPabeigts === false
        ? checkDrosaRiciba.filter((data) => data.status !== "Done")
        : checkDrosaRiciba;

    const pabeigtsAp =
      mySettings.statusApPabeigts === false
        ? pabeigts.filter((data) => data.status !== "Aproved Done")
        : pabeigts;

    setFinalFilter(pabeigtsAp);
  }, [mySettings, posts]);

  //tabula
  const indexOfLastPost = currentPage * postPerPage;
  const indexofFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = finalFilter.slice(indexofFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div>
      <QuickTaskHead
        filter={(props) => filter(props)}
        updateList={() => updateList()}
        settingsModal={settingsModal}
        createModal={()=>createModal()}

      />
      <QuickTaskComponent
        currentPosts={currentPosts}
        posts={finalFilter}
        paginate={paginate}
        postsPerPage={postPerPage}
        removeQuickTask={(id, image) => removeQuickTask(id, image)}
        updateList={() => updateList()}
      />
      <QtSettingsModal
        modalStatus={modalStatus}
        settingsModal={settingsModal}
      
        updateMysettings={(value) => updateMysettings(value)}
        Axios={Axios}
        apiUrl={apiUrl}
        user={user}
        token={token}
      />
      <QuickTaskCreateModal
      crModalStatus={crModalStatus}
      createModal={()=>createModal()}
      updatePage={updateList}
      />
    </div>
  );
};

export default QuickTask;
