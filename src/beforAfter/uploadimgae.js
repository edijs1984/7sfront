import React, { useRef, useState, useEffect } from "react";
import { Button, Image } from "semantic-ui-react";
import "./beforeafter.css";
const UploadImage = () => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [, setIsvalid] = useState(false);

  const filePickerRef = useRef(null);

  const pickImageHnadler = () => {
    filePickerRef.current.click();
  };

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickHandler = event => {
    if (event.target.files || event.target.files.length === 1) {
      const pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsvalid(true);
    } else {
      setIsvalid(false);
    }
  };
  console.log(file);
  return (
    <div>
      <Button
        type="button"
        onClick={pickImageHnadler}
        floated="right"
        color="purple"
      >
        Pick Image
      </Button>
      <div className="imagepickercontainer">
        <input
          ref={filePickerRef}
          style={{ display: "none" }}
          type="file"
          accept=".jpg,.png,.jpeg"
          onChange={pickHandler}
        />
        <div>
          {previewUrl && (
            <Image src={previewUrl} alt="preview" bordered size="massive" />
          )}
          {!previewUrl && <p>Pleas select image</p>}
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
