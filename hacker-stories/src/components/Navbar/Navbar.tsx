import React, { useState } from "react";
import "./Navbar.css";
import LoginForm from "../LoginForm/LoginForm";
import RegistrationForm from "../Registration/registrationForm"; // Import the RegistrationForm

const Navbar: React.FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleLoginClick = () => {
    console.log("Login clicked");
    setIsLoginOpen(true);
  };

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
  };

  const handleRegisterClick = () => {
    console.log("Register clicked");
    setIsRegisterOpen(true);
  };

  const handleCloseRegister = () => {
    setIsRegisterOpen(false);
  };

  return (
    <div className="nav">
      <div className="nav-logo">GeoGuessr</div>
      <ul className="nav-menu">
        <li className="nav-sign" onClick={handleLoginClick}>
          Login
        </li>
        <li className="nav-sign" onClick={handleRegisterClick}>
          Register
        </li>
      </ul>

      {/* Render LoginForm when isLoginOpen is true */}
      <LoginForm isOpen={isLoginOpen} onClose={handleCloseLogin} />

      {/* Render RegistrationForm when isRegisterOpen is true */}
      <RegistrationForm isOpen={isRegisterOpen} onClose={handleCloseRegister} />
    </div>
  );
};

export default Navbar;
