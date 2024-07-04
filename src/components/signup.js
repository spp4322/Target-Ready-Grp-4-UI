import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { myAxios } from "../services/helper";
import "../css/signup.css";
import isEmail from "validator/lib/isEmail";
import { isMobilePhone } from "validator";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    const address = null;
    event.preventDefault();
    setErrors({});
    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !email ||
      !username ||
      !password
    ) {
      setErrors({
        firstName: !firstName && "First Name is required",
        lastName: !lastName && "Last Name is required",
        phoneNumber: !phoneNumber && "Phone Number is required",
        email: !email && "Email is required",
        username: !username && "Username is required",
        password: !password && "Password is required",
      });
      return;
    }
    if (!isEmail(email)) {
      setMessage("Please enter a valid Email");
      setErrors({ email: "Invalid email address" });
      return;
    } else setMessage("");
    if (!isMobilePhone(phoneNumber)) {
      setMessage("Please enter a valid Phone Number");
      setErrors({ phoneNumber: "Invalid phone number" });
      return;
    } else setMessage("");

    try {
      const response = await myAxios.post("/api/v1/target/auth/signup", {
        firstName,
        lastName,
        phoneNumber,
        email,
        username,
        password,
        address,
      });
      console.log(response.data);
      if (response.data === "User Already Exists") {
        alert("User Already exists");
      } else {
        alert("Successfully Signed up. Redirecting to login page.");
        navigate("/", { state: { username } });
      }
    } catch (error) {
      if (error.response) {
        console.error("Response error:", error.response.data);
        setErrors({ form: error.response.data.message });
      } else if (error.request) {
        console.error("Request error:", error.request);
        setErrors({ form: "Request error. Please try again later." });
      } else {
        console.error("Error:", error.message);
        setErrors({ form: error.message });
      }
    }
  };

  return (
    <div className="container_signup">
      <div className="left-panel">
        <img
          src={require("../images.png")}
          alt="logo"
          className="signup-image"
        />
        <div className="button-container">
          <button className="button" type="submit" onClick={handleSubmit}>
            Sign Up
          </button>
          <Link className="login-link" to="/">
            Login
          </Link>
        </div>
      </div>
      <div className="right-panel">
        <div className="form-wrapper">
          <div className="signup-box">
            <h2>Sign-Up</h2>
            <form className="form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="label" htmlFor="firstName">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Enter First Name"
                  name="firstName"
                  className={`input ${errors.firstName ? "input-error" : ""}`}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && (
                  <span className="error-message">{errors.firstName}</span>
                )}
              </div>
              <div className="form-group">
                <label className="label" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  name="lastName"
                  className={`input ${errors.lastName ? "input-error" : ""}`}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && (
                  <span className="error-message">{errors.lastName}</span>
                )}
              </div>
              <div className="form-group">
                <label className="label" htmlFor="phoneNumber">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="Enter Phone Number"
                  name="phoneNumber"
                  className={`input ${errors.phoneNumber ? "input-error" : ""}`}
                  value={phoneNumber}
                  onChange={(e) => setPhonenumber(e.target.value)}
                />
                {errors.phoneNumber && (
                  <span className="error-message">{errors.phoneNumber}</span>
                )}
              </div>
              <div className="form-group">
                <label className="label" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  className={`input ${errors.email ? "input-error" : ""}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>
              <div className="form-group">
                <label className="label" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Enter Username"
                  name="username"
                  className={`input ${errors.username ? "input-error" : ""}`}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && (
                  <span className="error-message">{errors.username}</span>
                )}
              </div>
              <div className="form-group">
                <label className="label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  className={`input ${errors.password ? "input-error" : ""}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}
                <span className="password-tooltip">
                  Password must be at least 8 characters long
                </span>
              </div>
              {errors.form && (
                <span className="error-message">{errors.form}</span>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
