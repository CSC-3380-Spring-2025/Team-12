import React from "react";
import { useNavigate } from "react-router-dom";
import "./ExploreNavbar.css";  
import { GiGhost } from "react-icons/gi";


const ExploreNavbar: React.FC = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");  // Navigate back to the homepage
  };

  const handleViewMapClick = () => {
    navigate("/map");  // Navigate to the map page (still need to incorporate our map)
  };

  return (
    <div className="explore-navbar">
        <h2 className="explore-title">
            <GiGhost className="ghost-icon" /> Welcome to the Explore Page!</h2>
        <div className="explore-buttons">
      <button onClick={handleHomeClick}>Home</button>
      <button onClick={handleViewMapClick}>Map</button>
      </div>
    </div>
  );
};

export default ExploreNavbar;
