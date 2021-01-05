import React, { useState, useEffect } from "react";
// import { Image } from "semantic-ui-react";
import { Modal, Button } from "react-bootstrap";
import { apiUrl } from "../../config.json";

import ModalImage from "react-modal-image";
const ImageModal = ({ openImgModal, setOpenImgModal, img, place }) => {
  //
  const [pic, setNextPicture] = useState();
  const [num, setNum] = useState(1);
  const [size, setSize] = useState("sm");
  const enlarge = () => setSize("lg");

  //
  const sorce = apiUrl + "/api/mnt/volume_fra1_01/images/" + pic;
  //
  useEffect(() => {
    if (!img) return;

    if (img.length === 1) {
      setNextPicture(img);
    }
    setNextPicture(img[num - 1]);
  }, [img, num]);

  ///
  const next = () => {
    const totalImages = img.length;
    if (totalImages < 2) return;
    if (num === img.length) {
      setNum(1);
    } else {
      setNum(num + 1);
    }
    setNextPicture(img[num]);
  };
  //
  return (
    <div>
      <Modal show={openImgModal} size={size}>
        <Modal.Header>
          <h1 style={{ fontWeight: "bold", color: "#ff6600" }}>
            {place.length > 10 ? place.substring(0, 10) + ".." : place}
          </h1>
          <Modal.Title>
            <div style={{ flexDirection: "row", display: "flex" }}>
              <Button
                size="sm"
                variant="danger"
                onClick={() => {
                  setOpenImgModal(!openImgModal);
                  setSize("mini");
                  setNum(1);
                }}
                style={{ marginRight: "2%" }}
              >
                Close
              </Button>
              <Button
                size="sm"
                variant="success"
                onClick={() => enlarge()}
                style={{ marginRight: "2%" }}
              >
                Enlarge
              </Button>
              <Button size="sm" variant="info" onClick={next}>
                Next
              </Button>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "center" }}>
          <ModalImage small={sorce} alt="" />
        </Modal.Body>
      </Modal>
    </div>
  );
};
// ...

export default ImageModal;
