import React from "react";
import { useNavigate } from "react-router-dom";
import "./menu.css"; // Use the provided menu.css file for styles

const Menu = () => {
  const navigate = useNavigate();

  return (
    <div className="menu-container">
      {/* Title */}
      <h1 className="menu-title">StressGuru</h1>

      {/* Icon */}
      <div className="icon-container">
        <div className="icon-circle"></div>
        <div className="icon-triangle"></div>
      </div>

      {/* Welcome Text */}
      <p className="welcome-text">Welcome, user</p>

      {/* Buttons */}
      <button className="evaluate-button" onClick={() => navigate("/evaluate")}>
        Evaluate
      </button>
      <button className="evaluate-button" onClick={() => navigate("/")}>
        Logout
      </button>
    </div>
  );
};

export default Menu;
