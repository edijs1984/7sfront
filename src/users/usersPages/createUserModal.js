import React, { useState, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { Form, Dropdown } from "semantic-ui-react";
import { useForm, Controller } from "react-hook-form";
import { AuthContext } from "../../context/auth";
import Axios from "axios";
import { apiUrl } from "../../config.json";
import CustomDropdown from "./../../comonComponents/customDropdown";
import { ToastContext } from "./../../context/toastContext";
import ResponsibleTable from "./reponsibleTable";

const CreateUserModal = ({ openModal, modalManage, setPosts }) => {
  const { notify, badNotify } = useContext(ToastContext);
  const token = localStorage.getItem("JwtToken");
  const { user } = useContext(AuthContext);
  const [admin, setAdmin] = useState(false);
  const [department, setDepartment] = useState("");
  const [maneger, setManeger] = useState(false);
  const [responsible, setResponsible] = useState([]);
  const [selectedDep, setSelectedDep] = useState("");

  const defaultValues = {
    name: "",
    email: "",
  };

  const { control, reset, handleSubmit } = useForm({ defaultValues });

  const addResposibilities = (value) => {
    setResponsible([...responsible, value]);
  };
  const onSubmit = async (data) => {
    try {
      await Axios.post(
        apiUrl + "/api/user/create",
        {
          company: user.company,
          email: data.email,
          name: data.name,
          password: Math.random().toString(36).replace("0.", ""),
          isAdmin: admin,
          maneger: maneger,
          department: department.name,
          responsible: responsible,
        },
        { headers: { "auth-token": token } }
      );
      const res = await Axios.post(
        apiUrl + "/api/user/all",
        { company: user.company },
        { headers: { "auth-token": token } }
      );
      setPosts(res.data);

      reset(defaultValues);
      setAdmin(false);
      notify("User Created");
    } catch (e) {
      badNotify("something went wrong");
    }
  };

  const adminOptions = [
    {
      key: "False",
      text: "False",
      value: false,
    },
    {
      key: "True",
      text: "True",
      value: true,
    },
  ];
  const onChange = (event, result) => {
    const { value } = result || event.target;
    setAdmin(value);
  };
  const onManeger = (event, result) => {
    const { value } = result || event.target;
    setManeger(value);
  };

  const remove = (val) => {
    responsible.splice(val, 1);
    setResponsible([...responsible]);
  };

  return (
    <Modal show={openModal}>
      <Modal.Header>
        <h3 style={{ fontWeight: "bold", color: "#ff6600" }}>Create User</h3>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <label>Name:</label>
          <Form.Group inline>
            <Controller
              as={<Form.Input placeholder="Name" />}
              name="name"
              control={control}
            />
          </Form.Group>
          <label>Email:</label>
          <Form.Group inline>
            <Controller
              as={<Form.Input placeholder="Email" />}
              name="email"
              control={control}
            />
          </Form.Group>
          <label>Working Place:</label>
          <Form.Group inline>
            <CustomDropdown
              api={"/api/plant/all/department"}
              placeholders={"Place"}
              setValue={(value) => setDepartment(value)}
              jsonName2="departmentName"
              jsonName="departmentName"
            />
          </Form.Group>
          <label>Admin:</label>
          <Form.Group inline>
            <Dropdown
              defaultValue={false}
              selection
              name="admin"
              options={adminOptions}
              onChange={onChange}
            />
          </Form.Group>
          <label>Manager:</label>
          <Form.Group inline>
            <Dropdown
              defaultValue={false}
              placeholder="Select"
              selection
              name="maneger"
              options={adminOptions}
              onChange={onManeger}
            />
          </Form.Group>

          {maneger === true ? (
            <div>
              <label>Select Place User is responsible for:</label>
              <Form.Group inline>
                <CustomDropdown
                  api={"/api/plant/all/department"}
                  placeholders={"Place"}
                  setValue={(value) => setSelectedDep(value.name)}
                  jsonName2="departmentName"
                  jsonName="departmentName"
                />
                <Button
                  onClick={() => addResposibilities(selectedDep)}
                  style={{ marginLeft: "2%" }}
                >
                  Add
                </Button>
              </Form.Group>
              <ResponsibleTable
                value={responsible}
                remove={(val) => remove(val)}
              />
            </div>
          ) : null}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          size="sm"
          floated="left"
          variant="danger"
          onClick={() => modalManage()}
        >
          Exit
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          color="blue"
          size="sm"
          variant="success"
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateUserModal;
