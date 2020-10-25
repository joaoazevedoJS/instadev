import React, { FC, InputHTMLAttributes, useEffect, useState } from "react";

import "./styles.css";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
  id: string;
  onChange: React.Dispatch<React.SetStateAction<any>>;
}

const Input: FC<Props> = ({ label, id, value, ...rest }) => {
  const [spanClass, setSpanClass] = useState("");
  const [type, setType] = useState(rest.type);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    handleSetSpanClass(value);
  }, [value]);

  function hanldeShowPassword() {
    const type = showPassword ? "password" : "text";

    setType(type);
    setShowPassword(!showPassword);
  }

  function handleSetSpanClass(world: string) {
    const className = world.length > 0 ? "labeltop" : "";

    setSpanClass(className);
  }

  return (
    <div className="InputComponent">
      <span className={spanClass}>{label}</span>
      <input {...rest} type={type} value={value} id={id} />

      { rest.type === "password"  && value.length > 0 && (
          <p className="showAndHidden" onClick={hanldeShowPassword}>{showPassword ? "Hide" : "Show"}</p>
        )
      }
    </div>
  );
};

export default Input;
