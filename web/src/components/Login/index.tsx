import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillFacebook } from "react-icons/ai";

import Button from "../Button";
import Input from "../Input";
import Or from "../Or";

import "./styles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="loginComponent">
      <Input
        label="Phone Number, username or email"
        id="input-login"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <Input
        label="Password"
        type="password"
        id="input-password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <Button>Log In</Button>

      <Or />

      <p className="facebookLogin">
        <AiFillFacebook />
        Log In With Facebook
      </p>

      <Link to="/" className="forgot">
        Forgot Password?
      </Link>
    </div>
  );
};

export default Login;
