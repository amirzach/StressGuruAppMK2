import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router

function RegisterButton({ onClick }) {
  const navigate = useNavigate(); // Get the navigate function

  const handleClick = () => {
    navigate("/register"); // Navigate to the login page
  };

  return (
    <button className="button register-button" onClick={handleClick}>
      Register
    </button>
  );
}

export default RegisterButton;
