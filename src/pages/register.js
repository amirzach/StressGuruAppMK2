import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css"; // Assuming you'll style it similarly to login.js

const Register = () => {
  const navigate = useNavigate();

  // State variables
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // Track password visibility
  const [errors, setErrors] = useState({});

  // Regex for password validation
  const PASSWORD_PATTERN = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=\\S+$).{6,}$/;

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!email) {
      newErrors.email = "Email cannot be empty.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Username validation
    if (!username) {
      newErrors.username = "Please enter your name.";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password cannot be empty.";
    } else if (!PASSWORD_PATTERN.test(password)) {
      newErrors.password = "Password must be at least 6 characters long and include letters and numbers.";
    }

    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = "You must confirm your password.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (validateForm()) {
      console.log("Register Successful");
      console.log({ email, username, password });
      // Perform any API call or logic here
      alert(`Welcome, ${username}!`);
      navigate("/"); // Redirect to main or login page after registration
    }
  };

  const handleExit = () => {
    const confirmExit = window.confirm("Are you sure you would like to exit?");
    if (confirmExit) {
      navigate("/"); // Redirect back to App.js
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <button className="back-arrow" onClick={handleExit}>
          &#8592; {/* Unicode for left arrow */}
        </button>
        <h1 className="register-title">Register</h1>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
          />
          {errors.username && <p className="error-message">{errors.username}</p>}
        </div>
        <div className="input-group">
          <label>Password</label>
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
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <div className="input-group">
          <label>Confirm Password</label>
          <input
            type={passwordVisible ? "text" : "password"} // Toggle between text and password
            id="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Password"
          />
            <button
              type="button"
              className="toggle-password circular-button"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? "👁️" : "🔒"}
            </button>
          {errors.confirmPassword && (
            <p className="error-message">{errors.confirmPassword}</p>
          )}
        </div>
        <button className="register-button" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
