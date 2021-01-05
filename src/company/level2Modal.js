import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Post } from "../comonComponents/axiosFunctions";
import CreateModal from "./../comonComponents/comonDropdowns/CreateModal";
import CreateInput from "../comonComponents/CreateInput";
const Level2Modal = ({ modal2Status, openModal2 }) => {
  const [departmentName, setDepartmentName] = useState("");
  // const [description, setDescription] = useState("");

  const [count, setCount] = useState(0);
  const createCase = async () => {
    await Post({
      api: "/api/plant/create/department",
      data: {
        // description: description,
        departmentName: departmentName,
      },
      message: "Department updated",
    });

    setCount(count + 1);
  };
  return (
    <CreateModal
      modalStatus={modal2Status}
      header={"Create Department"}
      body={
        <div>
          <div>
            <h4>Place Name</h4>
            <CreateInput
              handl={(res) => setDepartmentName(res)}
              count={count}
            />
          </div>
        </div>
      }
      exitButton={
        <Button onClick={() => openModal2()} size="sm" variant="danger">
          Exit
        </Button>
      }
      submitButton={
        <Button onClick={() => createCase()} variant="success" size="sm">
          Submit
        </Button>
      }
    />
  );
};

export default Level2Modal;
