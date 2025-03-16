import React, { useState } from "react";
import "./Navbar.css";
import LoginForm from "../LoginForm/LoginForm";
import RegistrationForm from "../Registration/registrationForm"; // Import the RegistrationForm

const Navbar: React.FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  // Define click handlers for each button
  const handleLeaderboardClick = () => {
    console.log("Leaderboard clicked");
    // Add functionality here (e.g., navigate to the leaderboard page)
  };

  const handleChatClick = () => {
    console.log("Chat clicked");
    // Add functionality here (e.g., open a chat window)
  };

  const handleExploreClick = () => {
    console.log("Explore clicked");
    // Add functionality here (e.g., navigate to the explore page)
  };
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
        <li onClick={handleLeaderboardClick}>Leaderboard</li>
        <li onClick={handleChatClick}>Chat</li>
        <li onClick={handleExploreClick}>Explore</li>
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
