import React, { useState } from "react";
import Button from "../Button";

import Input from "../Input";

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

      <p className="line">OR</p>

      <p className="facebookLogin">Log In With Facebook</p>

      <p className="forgot">Forgot Password?</p>
    </div>
  );
};

export default Login;
