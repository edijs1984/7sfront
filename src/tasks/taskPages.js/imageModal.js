import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { Api, token } from "../../helpers/axioPost";
import { getimg } from "../../apiLinks/httpImg";
import ModalImage from "react-modal-image";
const ImageModal = ({ openImgModal, setOpenImgModal, img }) => {
  const [image, setimage] = useState("");
  const [nextImg, setNextImg] = useState(1);
  const [size, setSize] = useState("sm");
  const [loading, setLoading] = useState("");
  const enlarge = () => {
    size === "sm" ? setSize("lg") : setSize("sm");
  };

  //
  const GetImage = async (value) => {
    setLoading(true);
    try {
      await Axios.get(Api + getimg + img[value], {
        responseType: "arraybuffer",
        headers: { "auth-token": token },
      }).then((response) => {
        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        setimage("data:;base64," + base64);
      });
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  const nextImage = () => {
    if (img.length < 2) return;
    if (img.length - 1 !== nextImg) {
      setNextImg(nextImg + 1);
    } else {
      setNextImg(0);
    }

    GetImage(nextImg);
  };

  return (
    <div>
      <Modal show={openImgModal} size={size} onShow={() => GetImage(0)}>
        <Modal.Header>
          <h1 style={{ fontWeight: "bold", color: "#ff6600" }}></h1>
          <Modal.Title>
            <div style={{ flexDirection: "row", display: "flex" }}>
              <Button
                size="sm"
                variant="danger"
                onClick={() => {
                  setOpenImgModal(!openImgModal);
                  setimage();
                  setSize("sm");
                  setNextImg(1);
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
                {size === "sm" ? "Enlarge" : "Minimize"}
              </Button>
              <Button size="sm" variant="info" onClick={nextImage}>
                Next
              </Button>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "center" }}>
          {loading ? (
            <h3>Loading...</h3>
          ) : (
            <ModalImage small={image} alt="" showRotate />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};
// ...

export default ImageModal;
