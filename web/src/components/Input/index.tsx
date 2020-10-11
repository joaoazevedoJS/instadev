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

  useEffect(() => {
    handleSetSpanClass(value);
  }, [value]);

  function handleSetSpanClass(word: string) {
    const className = word.length > 0 ? "labeltop" : "";

    setSpanClass(className);
  }

  return (
    <div className="InputComponent">
      <span className={spanClass}>{label}</span>
      <input {...rest} value={value} id={id} />
    </div>
  );
};

export default Input;
