import React, { useState} from "react";
import "./Navbar.css";
import LoginForm from "../LoginForm/LoginForm";
import Chat from "../Chat/Chat"; 
import Explore from "../Explore/Explore";

const Navbar: React.FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  // Define click handlers for each button
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);

  const handleLeaderboardClick = () => {
    console.log("Leaderboard clicked");
    // Add functionality here (e.g., navigate to the leaderboard page)
  };

  const handleChatClick = () => {
    console.log("Chat clicked");
    setIsChatOpen(true);
    // Add functionality here (e.g., open a chat window)
  };

  const handleExploreClick = () => {
    console.log("Explore clicked");
    setIsExploreOpen(true);
    // Add functionality here (e.g., navigate to the explore page)
  };

  const handleLoginClick = () => {
    console.log("Login clicked");
    setIsLoginOpen(true);
    // Add functionality here (e.g., open a login modal)
  };

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
  };

  const handleRegisterClick = () => {
    console.log("Register clicked");
    // Add functionality here (e.g., open a registration modal)
  };

  return (
    <div className="nav">
      <div className="nav-logo">GeoGuessr</div>
      <ul className="nav-menu">
        <li onClick={handleLeaderboardClick}>Leaderboard</li>
        <li onClick={handleChatClick}>Chat</li>
        <li onClick={handleExploreClick}>Explore</li>
        <li className="nav-sign" onClick={handleLoginClick}>Login</li>
        <li className="nav-sign" onClick={handleRegisterClick}>Register</li>
      </ul>

      {/* Modals */}
      <LoginForm isOpen={isLoginOpen} onClose={handleCloseLogin} />
      <Chat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)}/>
      <Explore isOpen={isExploreOpen} onClose={() => setIsExploreOpen(false)} /> 
    </div>
  );
};

export default Navbar;