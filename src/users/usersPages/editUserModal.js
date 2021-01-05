import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Form, Dropdown } from "semantic-ui-react";
import { useForm, Controller } from "react-hook-form";
import CustomDropdown from "./../../comonComponents/customDropdown";
import { Post } from "../../comonComponents/axiosFunctions";
import ResponsibleTable from "./reponsibleTable";

const EditUserModal = ({ openModal, modalManage, selected, updateUser }) => {
  const [admin, setAdmin] = useState("");
  const [department, setDepartment] = useState("");
  const [maneger, setManeger] = useState("");
  const [responsible, setResponsible] = useState([]);
  const [selectedDep, setSelectedDep] = useState("");
  // const [responsible,setResponsible]=useState([""]);

  const { control, handleSubmit } = useForm({ selected });
  const onSubmit = async (data) => {
    console.log(responsible);
    await Post({
      api: "/api/user/change",
      data: {
        id: selected._id,
        name: data.name,
        email: data.email,
        isAdmin: admin === "" ? selected.isAdmin : admin,
        maneger: maneger === "" ? selected.maneger : maneger,
        department: department === "" ? selected.department : department,
        responsible: responsible === "" ? selected.responsible : responsible,
      },
      message: "User Updated",
    });
    updateUser();
    modalManage();
  };

  const remove = (val) => {
    responsible.splice(val, 1);
    setResponsible([...responsible]);
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

  const addResposibilities = (value) => {
    setResponsible([...responsible, value]);
  };

  useEffect(() => {
    setResponsible(!selected.responsible ? "" : selected.responsible);
  }, [selected]);

  return (
    <Modal show={openModal}>
      <Modal.Header>
        <h3 style={{ fontWeight: "bold", color: "#ff6600" }}>Edit User</h3>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <label>Name:</label>
          <Form.Group inline>
            <Controller
              as={<Form.Input placeholder="Name" />}
              name="name"
              control={control}
              defaultValue={selected.name}
            />
          </Form.Group>
          <label>Email:</label>
          <Form.Group inline>
            <Controller
              as={<Form.Input placeholder="Email" />}
              name="email"
              control={control}
              defaultValue={selected.email}
            />
          </Form.Group>
          <label>Place:</label>
          <Form.Group inline>
            <CustomDropdown
              api={"/api/plant/all/department"}
              placeholders={"Department"}
              setValue={(value) => setDepartment(value.name)}
              jsonName2="departmentName"
              jsonName="departmentName"
              defaultValue={selected.department}
            />
          </Form.Group>
          <label>Admin:</label>
          <Form.Group inline>
            <Dropdown
              defaultValue={selected.isAdmin}
              selection
              name="admin"
              options={adminOptions}
              onChange={onChange}
            />
          </Form.Group>
          <label>Maneger:</label>
          <Form.Group inline>
            <Dropdown
              defaultValue={selected.maneger}
              placeholder="Select"
              selection
              name="maneger"
              options={adminOptions}
              onChange={onManeger}
            />
          </Form.Group>
          <label>Select Place user responsible:</label>
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

          {!selected.responsible ? (
            ""
          ) : (
            <div>
              <label>Responsible:</label>
              <ResponsibleTable
                value={!responsible ? [] : responsible}
                remove={(val) => remove(val)}
              />
            </div>
          )}
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

export default EditUserModal;
