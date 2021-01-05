import React from "react";
import { Table, Button } from "react-bootstrap";

const ResponsibleTable = ({ value, remove }) => {
  return (
    <div>
      <Table size="sm">
        <thead>
          <tr style={{ fontSize: 15 }}>
            <td>Responsible for place:</td>
            <td>Remove</td>
          </tr>
        </thead>
        <tbody>
          {value.map((item) => {
            return (
              <tr key={item}>
                <td>{item}</td>
                <td>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => remove(value.indexOf(item))}
                  >
                    x
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default ResponsibleTable;
