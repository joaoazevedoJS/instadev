import React from "react";

import SignContainer from "../../components/SignContainer";
import LoginComponent from "../../components/Login";

import "./styles.css";

const Login = () => {
  return (
    <SignContainer
      redirectTo={{ description: "Don't have an account?", link: "/signup", linkText: "Sign up" }}
      children={<LoginComponent />}
    />
  );
};

export default Login;
