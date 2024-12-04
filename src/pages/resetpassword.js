import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./resetpassword.css"; // Use the same or similar CSS as the login page

const ResetPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const handleReset = (e) => {
    e.preventDefault();

    // Validate inputs
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email cannot be empty";
    }

    if (!newPassword) {
      newErrors.newPassword = "Password cannot be empty";
    } else if (newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Reset successful:", { email, newPassword });
      navigate("/login"); // Navigate to login page after successful reset
    }
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <button className="back-button" onClick={handleBack}>
          ←
        </button>
        <h2 className="login-title">RESET PASSWORD</h2>

        <form onSubmit={handleReset}>
          <div className="input-group">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="input-group password-group">
            <input
              type={passwordVisible ? "text" : "password"}
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              required
            />
            <button
              type="button"
              className="toggle-password circular-button"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? "👁️" : "🔒"}
            </button>
            {errors.newPassword && <span className="error-message">{errors.newPassword}</span>}
          </div>

          <div className="input-group password-group">
            <input
              type={passwordVisible ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password"
              required
            />
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>

          <button type="submit" className="login-button">
            RESET PASSWORD
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
