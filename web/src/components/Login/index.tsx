import React from 'react'

const Login = () => {
  return (
    <div id="login">
      <input type="text" name="login" id="login" />
      <input type="password" name="password" id="password" />

      <button>Log In</button>

      <p className="line">OR</p>
      
      <p className="facebookLogin">Log In With Facebook</p>

      <p className="forgot">Forgot Password?</p>
    </div>
  )
}

export default Login