import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { GetImage } from "./helpers/axioPost";
import ModalImage from "react-modal-image";
import Axios from "axios";

const Test = () => {
  const token = localStorage.getItem("JwtToken");
  const [Img, setimg] = useState("");
  const [count, setState] = useState(0);

  const getImg = async () => {
    try {
      await Axios.get("http://localhost:3001/api/images/123.jpg", {
        responseType: "arraybuffer",
      }).then((response) => {
        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        setimg("data:;base64," + base64);
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getImg();
  }, []);

  return (
    <div>
      <button onClick={() => setState(count + 1)}>click</button>
      <h2>{count}</h2>
      <img alt="" src={Img} />
      {/* <ModalImage medium={img} showRotate /> */}
    </div>
  );
};
export default Test;
