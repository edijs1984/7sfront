import React from "react";
import { Popover } from "react-bootstrap";

const PopOver = ({ title, content, show }) => {
  return (
    <Popover show="false" id="popover-basic" placement="bottom-end">
      <Popover.Title as="h3">{title}</Popover.Title>
      <Popover.Content>{content}</Popover.Content>
    </Popover>
  );
};

export default PopOver;
