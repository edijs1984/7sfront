import { Button } from "react-bootstrap";
import { RiFileEditFill } from "react-icons/ri";

const EditBtn = ({ onClick }) => {
  return (
    <Button size="sm" onClick={onClick}>
      <RiFileEditFill size="1rem" color="#f7ca44" />
    </Button>
  );
};
export default EditBtn;
