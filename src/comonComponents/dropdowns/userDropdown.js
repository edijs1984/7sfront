import React, { useContext } from "react";
import { Form } from "react-bootstrap";
import { UserContext } from "../../users/userContext";

const UserDropdown = ({ funk }) => {
  const { allUsers } = useContext(UserContext);
  return (
    <Form.Control
      size="sm"
      as="select"
      onClick={(e) => {
        funk(e.target.value);
      }}
    >
      <option>{"select user"}</option>
      {allUsers || allUsers.length > 0
        ? allUsers.map((item) => {
            return (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            );
          })
        : ""}
    </Form.Control>
  );
};

export default UserDropdown;
