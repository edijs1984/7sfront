import { FaTrash } from "react-icons/fa";
import { Button } from "react-bootstrap";
const DeleteBtn = ({ onClick }) => {
  return (
    <Button size="sm" onClick={onClick}>
      <FaTrash size="1rem" color="red" />
    </Button>
  );
};
export default DeleteBtn;
