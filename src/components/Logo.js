import React from "react";
import logo from "./logo.png"; // Correctly import the logo

function Logo() {
  return (
    <img
      src={logo} // Use the imported logo
      alt="App Logo"
      className="logo"
    />
  );
}

export default Logo;
