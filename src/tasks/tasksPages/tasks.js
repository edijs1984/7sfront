import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { AuthContext } from "../../context/auth";
import { apiUrl } from "../../config.json";
import Taskcomponent from "../tasksComponents/taskscomponent";
import TaskMenu from "../tasksComponents/taskMenu";
import { Post, fetch } from "./../../comonComponents/axiosFunctions";

const Tasks = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(15);
  const token = localStorage.getItem("JwtToken");
  useEffect(() => {
    const fetchResult = async () => {
      const res = await Axios.post(
        apiUrl + "/api/task/all",
        { company: user.company },
        { headers: { "auth-token": token } }
      );
      setPosts(res.data);
    };

    fetchResult();
  }, [user, token]);

  const removeTask = async props => {
    await Post({
      api: "/api/task/remove",
      data: {
        id: props
      },
      message: "Task archived"
    });
    const res = await fetch({ api: "/api/task/all" });

    setPosts(res.data);
  };

  const indexOfLastPost = currentPage * postPerPage;
  const indexofFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = posts.slice(indexofFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <React.Fragment>
      <TaskMenu />
      <Taskcomponent
        currentPosts={currentPosts}
        posts={posts}
        paginate={paginate}
        postsPerPage={postPerPage}
        removeTask={data => removeTask(data)}
      />
    </React.Fragment>
  );
};

export default Tasks;
