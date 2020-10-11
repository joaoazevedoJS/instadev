import React, { ButtonHTMLAttributes, FC } from "react";

import './styles.css'

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ ...rest }) => {
  return (
    <button {...rest} className="ButtonComponent">{rest.children}</button>
  )
};

export default Button;
