import { useState, useEffect } from "react";
import axios from "axios";
import { token, user } from "../stdcomponents";
import { apiUrl } from "../config.json";

const usePost = ({ api, data }) => {
  const [postResult, setResult] = useState([]);
  console.log(api);
  const post = async () => {
    try {
      const res = await axios.post(
        apiUrl + api,
        {
          data: { ...data, company: user.company },
        },
        { headers: { "auth-token": token } }
      );
      setResult(res.data);
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    post();
  }, []);

  return { postResult, post };
};

export default usePost;
