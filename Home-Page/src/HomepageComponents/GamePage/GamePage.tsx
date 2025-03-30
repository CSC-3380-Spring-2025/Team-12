import React from "react";
import { useNavigate } from "react-router-dom";
import "./GamePage.css";

const GamePage = () => {
  const navigate = useNavigate();

  return (
    <div className="game-page">
      {/* Black Header */}
      <div className="game-header">
        <h1 className="game-title">GeoGuessr</h1>
        <div className="game-nav">
          <button 
            className="game-nav-item" 
            onClick={() => navigate("/")}
          >
            HOME
          </button>
          <button className="game-nav-item">PLAY WITH FRIENDS</button>
          <div className="player-info">PLAYER: Player</div>
        </div>
      </div>

      {/* Main Content Area with Black Sidebar */}
      <div className="game-layout">
        <div className="game-sidebar">
          {/* Sidebar content can go here */}
        </div>
        <div className="game-content">
          <p>Game boxes will appear in this space</p>
        </div>
      </div>
    </div>
  );
};

export default GamePage;