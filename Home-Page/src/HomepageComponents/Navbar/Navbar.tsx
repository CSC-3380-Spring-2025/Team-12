import React, { useState } from "react";
import "./Navbar.css";
import LoginForm from "../LoginForm/LoginForm";
import RegistrationForm from "../Registration/registrationForm"; // Import the RegistrationForm
// import Chat from "../Chat/Chat";
// import Explore from "../Explore/Explore";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, username, logout } = useAuth();

  const handleLeaderboardClick = () => {
    navigate("/leaderboard")
  };

  const handleChatClick = () => {
    navigate("/chat");
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

  const handleLogout = async () => {
    try {
      await logout();
      //Redirect to home page after logout
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="nav">
      <div className="nav-logo">GeoGuessr</div>
      <ul className="nav-menu">
        <li onClick={handleLeaderboardClick}>Leaderboard</li>
        <li onClick={handleChatClick}>Chat</li>
        <li onClick={handleExploreClick}>Explore</li>
        
        {/* Authentication Section */}
        {isAuthenticated ? (
          <>
            <li className="nav-user">Welcome, {username}</li>
            <li className="nav-sign" onClick={handleLogout}>
              Logout
            </li>
          </>
        ) : (
          <>
            <li className="nav-sign" onClick={handleLoginClick}>
              Login
            </li>
            <li className="nav-sign" onClick={handleRegisterClick}>
              Register
            </li>
          </>
        )}
      </ul>

      {/* REMOVED: Chat and Explore modal since we're using a separate page now */}
      <LoginForm isOpen={isLoginOpen} onClose={handleCloseLogin} />
      {/* <Explore isOpen={isExploreOpen} onClose={() => setIsExploreOpen(false)} /> */}
      <RegistrationForm isOpen={isRegisterOpen} onClose={handleCloseRegister} />
    </div>
  );
};

export default Navbar;
