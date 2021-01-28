import { Button } from "react-bootstrap";
import { FaExpeditedssl } from "react-icons/fa";

const ResetBtn = ({ onClick }) => {
  return (
    <Button size="sm" onClick={onClick} variant="danger">
      <FaExpeditedssl size="1rem" color="white" />
    </Button>
  );
};
export default ResetBtn;
