import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { myAxios } from "../services/helper";
import "../images.png";
import "../css/login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Sending request to: /api/v1/target/auth/login");
      const response = await myAxios.post("/api/v1/target/auth/login", {
        username,
        password,
      });
      console.log("Response received:", response);

      if (response.data === "Invalid credentials") {
        alert("Password does not match");
      } else if (response.data === "Username not found") {
        alert("Username does not exists");
      } else if (response.status === 200) {
        alert("Successfully Logged In");
        navigate("/home", { state: { username } });
      } else {
        alert("Unexpected response status: " + response.status);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <img src={require("../images.png")} alt="Login" className="login-image" />
      <div className="login-wrapper">
        <div className="login-box">
          <h2>Sign-In</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username">
                <strong>Username</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Username"
                className="form-control rounded-0"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && (
                <span className="text-danger">{errors.username}</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className="form-control rounded-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <span className="text-danger">{errors.password}</span>
              )}
            </div>
            <button type="submit" className="btn btn-success w-100 rounded-0">
              <strong>Log In</strong>
            </button>
            <Link
              to="/signup"
              className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
            >
              <strong>Create Account</strong>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
