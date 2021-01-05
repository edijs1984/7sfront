import React from "react";
import { Menu, Input } from "semantic-ui-react";

const AuditMenu = () => {
  return (
    <div className="menutop">
      <Menu size="tiny" color="orange">
        <Menu.Item fitted={true}>
          <div className="QuickTaskName">
            <h1>Audit</h1>
          </div>
        </Menu.Item>
        <Menu.Item>
          <div className="marginleft"></div>
          <Input className="icon" icon="search" placeholder="Search..." />
        </Menu.Item>
      </Menu>
    </div>
  );
};
export default AuditMenu;
