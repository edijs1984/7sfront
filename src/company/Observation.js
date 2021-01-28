import React, { useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import UserDropdown from "../comonComponents/dropdowns/userDropdown";
import { UserContext } from "../users/userContext";
const ObservationType = () => {
  const { userDropdownValue, dispatch } = useContext(UserContext);

  useEffect(() => {
    dispatch({
      type: "setDropdownValue",
      payload: { value: "dfghs", label: "label ble" },
    });
  }, []);
  return (
    <div>
      <h1>{userDropdownValue.value}</h1>

      <UserDropdown />
      <Button
        onClick={() => dispatch({ type: "setDropdownValue", payload: "" })}
      >
        click me
      </Button>
    </div>
  );
};

export default ObservationType;
