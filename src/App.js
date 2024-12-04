import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom"; // Added useNavigate for navigation
import Login from "./pages/login"; // Ensure this path is correct
import Register from "./pages/register"; // Ensure this path is correct
import "./App.css"; // Custom styles
import ExitButton from "./components/ExitButton";
import Logo from "./components/Logo";
import LoginButton from "./components/LoginButton";
import RegisterButton from "./components/RegisterButton";
import ResetPassword from "./pages/resetpassword";
import Menu from "./pages/menu"; 
import Evaluate from "./pages/evaluate"; // Import the evaluate page

function App() {
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handleExitClick = () => {
    const confirmExit = window.confirm("Are you sure you want to exit the application?");
    if (confirmExit) {
      if (window.opener) {
        window.close();
      } else {
        alert("This browser does not allow closing this window.");
      }
    } else {
      alert("Exit canceled.");
    }
  };

  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the login page
  };

  const handleRegisterClick = () => {
    navigate("/register"); // Navigate to the register page
  };

  return (
    <div className="main-container">
      <ExitButton onClick={handleExitClick} />
      <div className="logo-container">
        <Logo />
      </div>
      <div className="buttons-container">
        <LoginButton onClick={handleLoginClick} />
        <RegisterButton onClick={handleRegisterClick} />
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/evaluate" element={<Evaluate />} />
      {/* Add more routes as necessary */}
    </Routes>
  );
}

export default AppRoutes;
