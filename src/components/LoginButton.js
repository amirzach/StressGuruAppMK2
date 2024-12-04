import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router

function LoginButton() {
  const navigate = useNavigate(); // Get the navigate function

  const handleClick = () => {
    navigate("/login"); // Navigate to the login page
  };

  return (
    <button className="button login-button" onClick={handleClick}>
      Login
    </button>
  );
}

export default LoginButton;
