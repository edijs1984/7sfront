import React, { useState } from "react";
import { Form } from "react-bootstrap";

const CustomInput = ({ value, onChange, placeholder, type, required }) => {
  const [color, setColor] = useState("hsla(44, 0%, 60%, 0.5)");
  const [borderWidth, setBorderWidth] = useState(1);
  return (
    <div>
      <Form.Control
        dateStyle="short"
        required={required}
        placeholder={placeholder}
        type={type ? type : "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => setBorderWidth(1)}
        onFocus={() => setBorderWidth(2)}
        onMouseEnter={() => setColor("#aaaaaa")}
        onMouseLeave={() => setColor("hsla(44, 0%, 60%, 0.5)")}
        style={{
          boxShadow: "none",
          borderWidth: borderWidth,
          borderColor: color,
          fontSize: 15,
          height: 37,
        }}
      />
    </div>
  );
};
export default CustomInput;
