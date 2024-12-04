import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // Track password visibility
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=\S+$).{6,}$/;

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validateEmail() || !validatePassword()) {
      return;
    }

    console.log("Email:", email);
    console.log("Password:", password);

    // Redirect to menu.js
    navigate("/menu");
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const validateEmail = () => {
    if (email === "") {
      setEmailError("Email cannot be empty");
      return false;
    } else if (!emailPattern.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const validatePassword = () => {
    if (password === "") {
      setPasswordError("Password cannot be empty");
      return false;
    } else if (!passwordPattern.test(password)) {
      setPasswordError("Password is weak");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <button className="back-button" onClick={handleBack}>
          ←
        </button>
        <h2 className="login-title">LOGIN</h2>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            {emailError && <span className="error-message">{emailError}</span>}
          </div>

          <div className="input-group password-group">
            <input
              type={passwordVisible ? "text" : "password"} // Toggle between text and password
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button
              type="button"
              className="toggle-password circular-button"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? "👁️" : "🔒"}
            </button>
            {passwordError && <span className="error-message">{passwordError}</span>}
          </div>

          <button type="submit" className="login-button">
            CONFIRM
          </button>
        </form>

        <button
          className="forgot-password"
          onClick={() => navigate("/resetpassword")}
        >
          Forgot Password?
        </button>
      </div>
    </div>
  );
};

export default Login;
