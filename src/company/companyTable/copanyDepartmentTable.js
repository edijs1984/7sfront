import React, { useContext, useState } from "react";
import { Table, Button, Container, Row } from "react-bootstrap";
import Pagin from "../../comonComponents/pagination";
import ReusableModal from "../../comonComponents/reusableModal";
import CustomInput from "../../comonComponents/customInput";
import { ModalContext } from "./../../context/modalContext";
import { Post } from "../../comonComponents/axiosFunctions";

const CompanyDepartmentTable = ({
  currentPosts,
  paginate,
  posts,
  postsPerPage,
  updateTable,
}) => {
  const [editData, setEditData] = useState({});
  const [modalStatus, setModalStatus] = useContext(ModalContext);

  const updateCase = async () => {
    await Post({
      api: "/api/plant/update/department",
      data: {
        id: editData._id,
        departmentName: editData.departmentName,
        description: editData.description,
      },
      message: "Department updated",
    });
    updateTable();
    setModalStatus(!modalStatus);
  };

  const deleteCase = async (data) => {
    await Post({
      api: "/api/plant/delete/department",
      data: { id: data },
      message: "Department deleted",
    });
    updateTable();
  };
  console.log(currentPosts);
  return (
    <Container>
      <Row className="justify-content-md-center">
        <div style={{ width: "50%" }}>
          <Table size="sm">
            <thead>
              <tr style={{ fontSize: 18, color: "#ff6600" }}>
                <td>Place Name</td>
                <td>Edit</td>
              </tr>
            </thead>

            <tbody>
              {currentPosts.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>{item.departmentName}</td>
                    <td>
                      <Button
                        size="sm"
                        variant="warning"
                        onClick={() => {
                          setModalStatus(!modalStatus);
                          setEditData(item);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => deleteCase(item._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
              <ReusableModal
                header={"Edit Place"}
                body={
                  <div>
                    <h4>Place Name</h4>
                    <CustomInput
                      currentValue={editData.departmentName}
                      handl={(res) =>
                        setEditData({ ...editData, departmentName: res })
                      }
                    />
                  </div>
                }
                submitButton={
                  <Button
                    onClick={() => updateCase()}
                    variant="success"
                    size="sm"
                  >
                    Update
                  </Button>
                }
              />
            </tbody>
          </Table>
          <Pagin
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
          />
        </div>
      </Row>
    </Container>
  );
};
export default CompanyDepartmentTable;
