import React from "react";
import "./Explore.css";

interface ExploreProps {
  isOpen: boolean;
  onClose: () => void;
}

const Explore: React.FC<ExploreProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="explore-modal">
        <span className="close-x" onClick={onClose}>&times;</span>
        <h2>Welcome to the GeoGuessr Explore Page!</h2>
        <p>Discover ghost towns, hidden locations, and more.</p>
        
        {/* Fun fact section */}
        <div className="fun-fact">
            <h3>Fun Fact</h3>
          🏚️ Did you know? There are over **3,800 ghost towns** in the U.S. alone!
        </div>

        {/* Button to view the map */}
        <button className="map-button">View Map</button>
      </div>
    </div>
  );
};

export default Explore;
