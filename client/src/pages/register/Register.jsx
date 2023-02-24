import axios from "axios";
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";

function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmpassword = useRef();
  const navigate = useNavigate();

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (password.current.value !== confirmpassword.current.value) {
      confirmpassword.current.setCustomValidity("Password don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      axios
        .post(`${process.env.REACT_APP_SERVER_DOMAIN}/auth/signup`, user)
        .then((res) => {
          console.log(res.data.msg);
          navigate("/login");
        })
        .catch((err) => {
          console.log(err.response.data.msg);
        });
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          {/* <h3 className="loginLogo">Social App</h3> */}
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
          <form className="loginBox" onSubmit={handleSignupSubmit}>
            <input
              required
              ref={username}
              placeholder="Username"
              type="text"
              className="loginInput"
            />
            <input
              required
              ref={email}
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
            <input
              ref={confirmpassword}
              required
              placeholder="Confirm Password"
              type="password"
              className="loginInput"
            />
            <button type="Submit" className="loginButton">
              Sign Up
            </button>
            <Link className="d-flex flex-column" to="/login">
              <button className="loginRegisterButton">
                Already have an account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
