import React from "react";
import { Radio } from "semantic-ui-react";
const CustomCheckBox = ({ value, change }) => {
  return <Radio toggle onChange={change} defaultChecked={value} />;
};
export default CustomCheckBox;
