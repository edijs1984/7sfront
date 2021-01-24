import React from "react";
import { Button } from "react-bootstrap";
import { IoArchiveSharp } from "react-icons/io5";

const ArchBtn = ({ onClick }) => {
  return (
    <Button size="sm" onClick={onClick}>
      <IoArchiveSharp size="1rem" color="#ff7f50" />
    </Button>
  );
};
export default ArchBtn;
