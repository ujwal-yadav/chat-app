import "./signup.css";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { signupRoute } from "../../utils/APIRoutes";

export const SignupPage = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  const handleValidation = (e) => {
    const { username, email, password, confirmPassword } = values;

    if (password != confirmPassword) {
      toast.error("Password and Confirm Password should be same", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Password must be greater than 7 characters", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (handleValidation()) {
      const { username, email, password } = values;
      const { data } = await axios.post(signupRoute, {
        username,
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/setAvatar");
      }
    }
  };

  return (
    <div className="signuppage">
      <div className="wrapper">
        <div className="inner">
          <form action="" onSubmit={handleSubmit}>
            <h3>SIGN UP</h3>
            <div className="form-row">
              <div className="form-wrapper">
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  onChange={(e) => handleChange(e)}
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-wrapper">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={(e) => handleChange(e)}
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-wrapper">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={(e) => handleChange(e)}
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-wrapper">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  onChange={(e) => handleChange(e)}
                  className="form-control"
                />
              </div>
            </div>
            <div className="signup-btn-s">
              <button data-text="Sign Up">
                <span>Sign Up</span>
              </button>
            </div>
            <p>Already have an account ?</p>
            <Link to="/login">
              <div className="login-btn-s">
                <button data-text="Log in">
                  <span>Log in</span>
                </button>
              </div>
            </Link>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
