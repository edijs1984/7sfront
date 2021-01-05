import React, { useState, useContext } from "react";
import { fetch, Post } from "../../comonComponents/axiosFunctions";
import { Table, Button } from "react-bootstrap";
import CustomInputObject from "./../../comonComponents/CustomInputObjejct";
import CustomCheckBox from "../../comonComponents/customCheckBox";
import { ModalContext } from "./../../context/modalContext";
import ReusableModal from "../../comonComponents/reusableModal";
import CustomInput from "../../comonComponents/customInput";

const Result = () => {
  const [modalStatus, setModalStatus] = useContext(ModalContext);

  const shit = [
    { name: "item1", surname: 5, type: "check" },
    { name: "item2", surname: 6, type: "text" },
    { name: "item3", surname: 7, type: "text" },
    { name: "item4", surname: 8, type: "check" },
    { name: "item5", surname: 9, type: "text" }
  ];
  const [shaft, setShaft] = useState({});

  const getUsers = async () => {
    const shit = await fetch("/api/user/all");
    console.log(shit.data);
  };

  const postuser = async () => {
    const post = await Post({
      api: "/api/user/test",
      data: {
        name: "edijs",
        surname: "vo ble"
      },
      message: "you did it"
    });
    console.log(post);
  };

  return (
    <React.Fragment>
      <div style={{ width: "10%" }}>
        <Table bordered>
          <tbody>
            {shit.map(item => {
              if (item.type === "text") {
                return (
                  <tr key={item.surname}>
                    <td>
                      <h3>{item.name}</h3>

                      <CustomInputObject
                        handl={val => {
                          setShaft({ ...shaft, [item.name]: val });
                        }}
                      />
                    </td>
                  </tr>
                );
              } else {
                return (
                  <tr key={item.surname}>
                    <td>
                      <h3>{item.name}</h3>

                      <CustomCheckBox
                        handlStatus={val => {
                          setShaft({ ...shaft, [item.name]: val });
                        }}
                      />
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </Table>
        <Button onClick={getUsers}>fetch</Button>
        <Button onClick={postuser}>post</Button>
        <Button onClick={() => setModalStatus(!modalStatus)}>modal</Button>
        <ReusableModal
          header={"This is header"}
          body={
            <div>
              <CustomInput />
              <CustomInput />
              <CustomInput />
            </div>
          }
        />
      </div>
    </React.Fragment>
  );
};
export default Result;
