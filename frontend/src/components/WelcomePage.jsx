import React, { useState } from "react";
import { loginUser, registerUser } from "../utils/apis";
import { useNavigate } from "react-router-dom";

import "./WelcomePage.css";

const WelcomePage = () => {
  const [newEmployee, setNewEmployee] = useState(true);

  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [userRegister, setUserRegister] = useState({
    username: "",
    password: "",
    confirmpassword: "",
  });
  const navigate = useNavigate();

  const handlerEmployeeLogin = async (e) => {
    e.preventDefault();

    const { username, password } = user;

    const loggedInUser = await loginUser(username, password);
    console.log(loggedInUser);
    if (!loggedInUser.username) {
      alert("wrong username or password");
      setUser({
        username: "",
        password: "",
      });
      return;
    }
    if (loggedInUser.is_admin) {
      navigate("/admin");
    } else {
      navigate("/employee");
    }
    setUser({
      username: "",
      password: "",
    });
  };

  const handlerEmployeeRegister = async (e) => {
    e.preventDefault();

    const { username, password, confirmpassword } = userRegister;
    if (password !== confirmpassword) {
      alert("password and confirmpassword are not same");
      return;
    }

    const registeredUser = await registerUser(username, password);
    if (registeredUser.is_admin) {
      navigate("/admin");
    } else {
      navigate("/employee");
    }
    setUserRegister({
      username: "",
      password: "",
      confirmpassword: "",
    });
  };

  const changeLoginHandler = (e) => {
    setUser((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const registerHandler = (e) => {
    setUserRegister((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div className="wel-main-container">
        <main className="wel-form-container">
          {newEmployee ? (
            <>
              <h2 className="form-title">Login</h2>
              <form
                onSubmit={handlerEmployeeLogin}
                className="admin-login-form"
              >
                <label className="form-label">User Name :</label>
                <input
                  type="text"
                  name="username"
                  required
                  value={user.username}
                  placeholder="user name"
                  onChange={changeLoginHandler}
                  className="form-input"
                />
                <label className="form-label">Password :</label>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="password"
                  value={user.password}
                  onChange={changeLoginHandler}
                  className="form-input"
                />
                <button className="wel-nav-btn form-submit-btn" type="submit">
                  Submit
                </button>
                <p className="form-employee-text">
                  New Register?
                  <span
                    className="form-employee-text-span"
                    onClick={() => {
                      setNewEmployee(false);
                    }}
                  >
                    Register
                  </span>
                </p>
              </form>
            </>
          ) : (
            <>
              <h2 className="form-title">Register</h2>
              <form
                onSubmit={handlerEmployeeRegister}
                className="admin-login-form"
              >
                <label className="form-label">User Name :</label>
                <input
                  type="text"
                  name="username"
                  required
                  onChange={registerHandler}
                  value={userRegister.username}
                  placeholder="user name"
                  className="form-input"
                />
                <label className="form-label">Password :</label>
                <input
                  type="password"
                  name="password"
                  required
                  value={userRegister.password}
                  onChange={registerHandler}
                  placeholder="password"
                  className="form-input"
                />
                <label className="form-label">Confirm Password :</label>
                <input
                  type="password"
                  name="confirmpassword"
                  required
                  value={userRegister.confirmpassword}
                  onChange={registerHandler}
                  placeholder="confirm password"
                  className="form-input"
                />
                <button className="wel-nav-btn form-submit-btn" type="submit">
                  Submit
                </button>
                <p className="form-employee-text">
                  Already register?
                  <span
                    className="form-employee-text-span"
                    onClick={() => {
                      setNewEmployee(true);
                    }}
                  >
                    Login
                  </span>
                </p>
              </form>
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default WelcomePage;
