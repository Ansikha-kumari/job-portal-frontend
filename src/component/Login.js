import { useContext, useState } from "react";
import axios from "axios";

import { Redirect } from "react-router-dom";

import PasswordInput from "../lib/PasswordInput";
import EmailInput from "../lib/EmailInput";
import { SetPopupContext } from "../App";

import apiList from "../lib/apiList";
import isAuth from "../lib/isAuth";

import "./Login.css";

const Login = () => {
  const setPopup = useContext(SetPopupContext);

  const [loggedin, setLoggedin] = useState(isAuth());

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [inputErrorHandler, setInputErrorHandler] = useState({
    email: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
  });

  const handleInput = (key, value) => {
    setLoginDetails({
      ...loginDetails,
      [key]: value,
    });
  };

  const handleInputError = (key, status, message) => {
    setInputErrorHandler({
      ...inputErrorHandler,
      [key]: {
        error: status,
        message: message,
      },
    });
  };

  const handleLogin = () => {
    const verified = !Object.keys(inputErrorHandler).some((obj) => {
      return inputErrorHandler[obj].error;
    });

    if (verified) {
      axios
        .post(apiList.login, loginDetails)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("type", response.data.type);

          setLoggedin(isAuth());

          setPopup({
            open: true,
            severity: "success",
            message: "Logged in successfully",
          });
        })
        .catch((err) => {
          setPopup({
            open: true,
            severity: "error",
            message:
              err.response?.data?.message ||
              err.message ||
              "Error",
          });
        });
    } else {
      setPopup({
        open: true,
        severity: "error",
        message: "Incorrect Input",
      });
    }
  };

  if (loggedin) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-page">

      {/* Background Effects */}
      <div className="login-glow login-glow-one"></div>
      <div className="login-glow login-glow-two"></div>

      <div className="login-grid"></div>

      {/* Main Login Card */}
      <div className="login-card">

        {/* Left Side */}
        <div className="login-info">

          <div className="login-brand-icon">
            J
          </div>

          <div className="login-mini-title">
            JOB PORTAL
          </div>

          <h1>
            Welcome
            <span>Back.</span>
          </h1>

          <p>
            Continue your career journey and discover
            new opportunities waiting for you.
          </p>

          <div className="login-features">

            <div className="login-feature">
              <span>✓</span>
              <div>
                <b>Find Opportunities</b>
                <small>Discover jobs that match your skills.</small>
              </div>
            </div>

            <div className="login-feature">
              <span>✓</span>
              <div>
                <b>Build Your Career</b>
                <small>Manage your professional journey.</small>
              </div>
            </div>

            <div className="login-feature">
              <span>✓</span>
              <div>
                <b>Work From Anywhere</b>
                <small>Explore remote career opportunities.</small>
              </div>
            </div>

          </div>

        </div>

        {/* Right Side */}
        <div className="login-form-area">

          <div className="login-form-header">
            <span>ACCOUNT ACCESS</span>

            <h2>
              Sign in to
              <strong>JOB PORTAL</strong>
            </h2>

            <p>
              Enter your details to continue.
            </p>
          </div>

          <div className="login-input">

            <EmailInput
              label="Email"
              value={loginDetails.email}
              onChange={(event) =>
                handleInput(
                  "email",
                  event.target.value
                )
              }
              inputErrorHandler={inputErrorHandler}
              handleInputError={handleInputError}
            />

          </div>

          <div className="login-input">

            <PasswordInput
              label="Password"
              value={loginDetails.password}
              onChange={(event) =>
                handleInput(
                  "password",
                  event.target.value
                )
              }
            />

          </div>

          <button
            className="premium-login-button"
            onClick={handleLogin}
          >
            <span>Login to Job Portal</span>
            <b>→</b>
          </button>

          <div className="login-divider">
            <span></span>
            <small>SECURE ACCESS</small>
            <span></span>
          </div>

          <div className="login-bottom">

            <span>New to Job Portal?</span>

            <a href="/signup">
              Create Account →
            </a>

          </div>

          <button
            className="back-home-button"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            ← Back to Home
          </button>

        </div>

      </div>

      <div className="login-copyright">
        © 2026 JOB PORTAL • CAREER • OPPORTUNITY • FUTURE
      </div>

    </div>
  );
};

export default Login;