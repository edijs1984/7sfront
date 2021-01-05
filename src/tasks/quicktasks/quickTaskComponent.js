import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import Pagin from "../../comonComponents/pagination";
import ImageModal from "./imageModal";
import { UserName, Admin, User } from "../../comonComponents/axiosFunctions";
import QuickTaskEditModal from "./quickTaskEditModal";
import { Icon, Popup } from "semantic-ui-react";
const QuickTaskComponent = ({
  currentPosts,
  paginate,
  posts,
  postsPerPage,
  removeQuickTask,
  updateList,
}) => {
  const [img, setImg] = useState(0);
  const [openImgModal, setOpenImgModal] = useState(false);
  const [place, setPlace] = useState("");

  const [responsible] = useState("");

  const [creator] = useState("");

  const [modal, setModal] = useState(false);
  const [item, setItem] = useState([]);

  const available =
    responsible === UserName || creator === UserName ? false : true;

  return (
    <React.Fragment>
      <div>
        <Table size="sm" hover>
          <thead>
            <tr
              textalign="center"
              style={{ fontSize: 18, color: "#ff6600", textAlign: "center" }}
            >
              <td>Nr.</td>
              <td>Created</td>
              <td>Place</td>
              <td>Description</td>
              <td>Person</td>
              <td>Actions</td>
              <td>Foto</td>
              <td>Status</td>
              <td>Responsible</td>
              <td>Deadline</td>
              <td>Priority</td>
              <td>Observation</td>
              <td>Safety category</td>
              <td>Created by</td>
              <td>Creator from...</td>
              <td>Options</td>
            </tr>
          </thead>

          <tbody>
            {currentPosts.map((item, index) => {
              return (
                <tr key={item._id} style={{ textAlign: "center" }}>
                  <td>{item.seq[0]}</td>
                  <td>
                    {new Date(item.createdAt).toLocaleDateString("fr-CA")}
                    <Icon
                      name="circle thin"
                      color={
                        parseInt(
                          (new Date() - new Date(item.createdAt)) /
                            (1000 * 60 * 60 * 24),
                          10
                        ) > 20
                          ? "red"
                          : parseInt(
                              (new Date() - new Date(item.createdAt)) /
                                (1000 * 60 * 60 * 24),
                              10
                            ) < 11
                          ? "green"
                          : "yellow"
                      }
                    />
                  </td>

                  <td>{item.area}</td>
                  <Popup
                    trigger={<td>{item.issue.substring(0, 20) + ".."} </td>}
                    content={item.issue}
                    position="top left"
                  />
                  <td>{User.maneger ? item.personName : ""}</td>
                  <td>
                    {item.coment ? item.coment.substring(0, 20) + ".." : ""}
                  </td>
                  <td>
                    {item.image.length === 0 ? (
                      <Button
                        variant="primary"
                        size="sm"
                        style={{ paddingLeft: "35%", paddingRight: "35%" }}
                      >
                        <h5 style={{ fontWeight: "bold" }}>
                          {item.image.length}
                        </h5>
                      </Button>
                    ) : (
                      <Button
                        style={{ paddingLeft: "35%", paddingRight: "35%" }}
                        variant="info"
                        size="sm"
                        onClick={() => {
                          setImg(item.image);
                          setPlace(item.area);
                          setOpenImgModal(!openImgModal);
                        }}
                      >
                        <h5 style={{ fontWeight: "bold" }}>
                          {item.image.length}
                        </h5>
                      </Button>
                    )}
                  </td>
                  <td>{item.status}</td>
                  <td>{item.responsible}</td>
                  <td>
                    {item.deadline
                      ? new Date(item.deadline).toLocaleDateString("fr-CA")
                      : null}
                  </td>
                  <td>{item.priority}</td>
                  <td>{item.observation}</td>
                  <td>{item.safetyCategory}</td>
                  <td>{item.creator}</td>
                  <td>{item.creatorDep}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="success"
                      onClick={() => {
                        setModal(!modal);
                        setItem(item);
                        setImg(item.image);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => removeQuickTask(item._id, item.image)}
                      disabled={Admin ? false : true}
                    >
                      Archive
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Pagin
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
        />
        <ImageModal
          openImgModal={openImgModal}
          setOpenImgModal={setOpenImgModal}
          img={img}
          place={place}
        />
        <QuickTaskEditModal
          modal={modal}
          item={item}
          available={available}
          updatePage={() => updateList()}
          img={img}
        />
      </div>
    </React.Fragment>
  );
};
export default QuickTaskComponent;
