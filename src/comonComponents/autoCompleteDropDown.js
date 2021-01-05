import React, { useContext, useState, useEffect } from "react";
import { Dropdown } from "semantic-ui-react";
import { apiUrl } from "../config.json";
import Axios from "axios";
import { AuthContext } from "../context/auth";

const CustomAutoCompleteDropdown = () => {
  const token = localStorage.getItem("JwtToken");
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const get = async () => {
      const res = await Axios.post(
        apiUrl + "/api/user/all",
        {
          company: user.company
        },
        { headers: { "auth-token": token } }
      );
      const result = res.data.map(value => {
        return { key: value._id, value: value.name, text: value.name };
      });
      setItems(result);
    };
    get();
  }, [user, token]);
  return <Dropdown placeholder="Search" search selection options={items} />;
};
export default CustomAutoCompleteDropdown;
