import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

function Login() {
  const email = useRef();
  const password = useRef();
  const { dispatch } = useContext(AuthContext);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <img
            className="socialapplogo"
            src="/assests/logo/logo-dark.png"
            alt=""
          />
          <span className="loginDesc">
            Connect with friends and world around you on Social App
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleLoginSubmit}>
            <input
              ref={email}
              required
              placeholder="Email"
              type="email"
              className="loginInput"
            />
            <input
              ref={password}
              required
              placeholder="Password"
              type="password"
              className="loginInput"
            />
            <button type="Submit" className="loginButton">
              Login
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <Link className="d-flex flex-column" to="/signup">
              <button className="loginRegisterButton">
                Create a New Account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
