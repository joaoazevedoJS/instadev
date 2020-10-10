import React, { FC, ReactNode } from "react";

import "./styles.css";

interface Props {
  redirectTo: {
    description: string;
    linkText: string;
    link: string;
  };
  children: ReactNode;
}

const SignContainer: FC<Props> = ({ redirectTo, children }) => {
  return (
    <>
      <div id="SignContainer">
        <h1>
          <img
            className="logo"
            src="http://files.joaoazevedojs.com.br/instadev/logo.svg"
            alt="instadev"
          />
        </h1>

        {children}
      </div>

      <div className="redirectTo">
        <p>
          {redirectTo.description}{" "}
          <a href={redirectTo.link}>{redirectTo.linkText}</a>
        </p>
      </div>
    </>
  );
};

export default SignContainer;
