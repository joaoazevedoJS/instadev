import React from "react";

import SignContainer from "../../components/SignContainer";
import LoginComponent from "../../components/Login";

import "./styles.css";

const Login = () => {
  return (
    <SignContainer
      redirectTo={{ text: "Don't have an account?", to: "/signup", description: "Sign up" }}
      children={<LoginComponent />}
    />
  );
};

export default Login;
