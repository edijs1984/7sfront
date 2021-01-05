import React, { useState, useEffect, useContext } from "react";
import { apiUrl } from "../../config.json";
import Axios from "axios";
import CompanyDepartmentTable from "./copanyDepartmentTable";
import { CompanyContext } from "./../../context/companyContetx";
const CompanyTable = ({ company, token }) => {
  const [activeTable] = useContext(CompanyContext);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(15);



  useEffect(() => {
    const fetchResult = async () => {
      const res = await Axios.post(
        apiUrl + "/api/plant/all/department",
        { company: company },
        { headers: { "auth-token": token } }
      );
      setPosts(res.data);
    };

    fetchResult();
  }, [company, token, activeTable]);

  const updateTable = async () => {
    const res = await Axios.post(
      apiUrl + "/api/plant/all/department" ,
      { company: company },
      { headers: { "auth-token": token } }
    );
    setPosts(res.data);
  };


  


  const indexOfLastPost = currentPage * postPerPage;
  const indexofFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = posts.slice(indexofFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);

 
 return(
    <CompanyDepartmentTable
      currentPosts={currentPosts}
      posts={posts}
      paginate={paginate}
      postsPerPage={postPerPage}
      updateTable={() => updateTable()}
    />
  );
  
 

};
export default CompanyTable;
