import React from "react";
import "./Navbar.css";

const Navbar: React.FC = () => {
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

  const handleLoginClick = () => {
    console.log("Login clicked");
    // Add functionality here (e.g., open a login modal)
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
        <li className="nav-sign" onClick={handleLoginClick}>
          Login
        </li>
        <li className="nav-sign" onClick={handleRegisterClick}>
          Register
        </li>
      </ul>
    </div>
  );
};

export default Navbar;