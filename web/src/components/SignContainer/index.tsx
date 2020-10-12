import React, { FC, ReactNode } from "react";
import { Link } from "react-router-dom";

import Logo from "../../assets/img/instadev.svg";

import GooglePlay from "../../assets/img/google.png";
import AppStore from "../../assets/img/apple.png";

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

      <div className="GetApp">
        <p>Get the app.</p>

        <div className="store">
          <Link to="/">
            <img src={GooglePlay} alt="Google Play" />
          </Link>

          <Link to="/">
            <img src={AppStore} alt="App Store" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignContainer;
