import React, { useState, useEffect, useContext } from "react";
import { Input, List } from "semantic-ui-react";
import { apiUrl } from "../config.json";
import Axios from "axios";
import { AuthContext } from "../context/auth";
const AutoCompleteInput = ({ url, mapvalue }) => {
  const token = localStorage.getItem("JwtToken");
  const { user } = useContext(AuthContext);
  const [suggestion, setSuggestion] = useState([]);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const get = async () => {
      const res = await Axios.post(
        apiUrl + url,
        {
          company: user.company
        },
        { headers: { "auth-token": token } }
      );
      const result = res.data.map(value => {
        return `${value[mapvalue]}`;
      });
      setItems(result);
    };
    get();
  }, [user, token, mapvalue, url]);

  const handleChange = e => {
    const value = e.target.value;
    setSearch(value);
    if (value.length === 0) {
    }
    setSuggestion([]);
    if (value.length > 0) {
      const regex = new RegExp(`${value}`, "i");
      const result = items.sort().filter(val => regex.test(val));
      setSuggestion(result);
    }
  };

  const renderSuggestion = () => {
    if (suggestion.length === 0) {
      return null;
    }
    return (
      <div>
        <List size="tiny">
          {suggestion.map(item => (
            <List.Item key={item} onClick={() => suggestionSelected(item)}>
              {item}
            </List.Item>
          ))}
        </List>
      </div>
    );
  };

  const suggestionSelected = value => {
    setSearch(value);
    setSuggestion([""]);
  };

  return (
    <div style={{ width: 100 }}>
      <Input value={search} onChange={handleChange} type="text" />
      {renderSuggestion()}
    </div>
  );
};

export default AutoCompleteInput;
