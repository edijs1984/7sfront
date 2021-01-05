import React, { useState, useEffect, useContext } from "react";
import { Dropdown } from "semantic-ui-react";
import Axios from "axios";
import { apiUrl } from "../../src/config.json";
import { AuthContext } from "../context/auth";
const CustomDropdownDefault = ({
  setValue,
  api,
  jsonName,
  jsonName2,
  placeholders,
  defaultValue,
  available,
}) => {
  const [data, setData] = useState([]);
  const [db, setDb] = useState([]);
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("JwtToken");
  useEffect(() => {
    const fetchResult = async () => {
      const fetched = await Axios.post(
        apiUrl + api,
        {
          company: user.company,
        },
        {
          headers: { "auth-token": token },
        }
      );
      setDb(fetched.data);
    };
    fetchResult();
  }, [api, user, token]);

  useEffect(() => {
    const options = db.map((val) => {
      return {
        key: val._id,
        value: val[jsonName2],
        text: val[jsonName],
      };
    });
    setData(options);
  }, [db, jsonName, jsonName2]);

  const handleChange = (event, result) => {
    const { value } = result || event.target;
    setValue({ name: value, description: event.target.innerText });
  };

  return (
    <Dropdown
      placeholder={placeholders}
      selection
      search
      name={data.name}
      clearable={true}
      onChange={handleChange}
      options={data}
      disabled={available || false}
      // value={defaultValue}
      defaultValue={defaultValue}
    />
  );
};
export default CustomDropdownDefault;
