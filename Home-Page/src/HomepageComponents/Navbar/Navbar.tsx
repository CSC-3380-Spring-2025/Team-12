import React, { useState } from "react";
import "./Navbar.css";
import LoginForm from "../LoginForm/LoginForm";
import RegistrationForm from "../Registration/registrationForm"; // Import the RegistrationForm
// import Chat from "../Chat/Chat";
// import Explore from "../Explore/Explore";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const navigate = useNavigate();  // Initialize the navigate function

  // REMOVED: isChatOpen state since we're using navigation now

  const handleLeaderboardClick = () => {
    console.log("Leaderboard clicked");
    // Add functionality here (e.g., navigate to the leaderboard page)
  };

  const handleChatClick = () => {
    navigate("/chat");  // Changed to use navigation instead of modal
  };

  const handleExploreClick = () => {
    navigate("/explore")
  };

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
        <li onClick={handleChatClick}>Chat</li>  {/* Now navigates to /chat */}
        <li onClick={handleExploreClick}>Explore</li> {/* Handles navigation to explore */}
        <li className="nav-sign" onClick={handleLoginClick}>Login</li>
        <li className="nav-sign" onClick={handleRegisterClick}>Register</li>
      </ul>

      {/* REMOVED: Chat and Explore modal since we're using a separate page now */}
      <LoginForm isOpen={isLoginOpen} onClose={handleCloseLogin} />
      {/* <Explore isOpen={isExploreOpen} onClose={() => setIsExploreOpen(false)} /> */}
      <RegistrationForm isOpen={isRegisterOpen} onClose={handleCloseRegister} />
    </div>
  );
};

export default Navbar;
