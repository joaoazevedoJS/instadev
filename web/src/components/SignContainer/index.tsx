import React, { FC, ReactNode } from "react";
import { Link } from 'react-router-dom'

import Logo from "../../assets/img/instadev.svg";

import "./styles.css";

interface Props {
  redirectTo: {
    text: string;
    to: string;
    description: string;
  };
  children: ReactNode;
}

const SignContainer: FC<Props> = ({ redirectTo, children }) => {
  return (
    <div className="SignContainerComponent">
      <div className="container">
        <h1>
          <img className="logo" src={Logo} alt="instadev" />
        </h1>

        {children}
      </div>

      <div className="redirectTo">
        <p>
          {redirectTo.text}{" "}
          <Link to={redirectTo.to}>{redirectTo.description}</Link>
        </p>
      </div>
    </div>
  );
};

export default SignContainer;
