import React from "react";
import { useNavigate } from "react-router-dom";
import "./Leaderboard.css";

const Leaderboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-topbar">
        <button className="home-button" onClick={() => navigate("/")}>
          Home
        </button>
      </div>

      <div className="leaderboard-header">
        <h1 className="main-title">GHOST TOWN GUESSR</h1>
        <h2 className="leaderboard-title">Leaderboard</h2>
      </div>

      <div className="leaderboard-filters">
        <button>All-Time</button>
      </div>

      <div className="leaderboard-columns">
        <span>Rank</span>
        <span>Player</span>
        <span>Score</span>
      </div>

      {/* Hardcoded Data for now */}
      <div className="leaderboard-rows">
        <div className="leaderboard-row">
          <span>1</span>
          <span>Player One</span>
          <span>1200</span>
        </div>
        <div className="leaderboard-row">
          <span>2</span>
          <span>Player Two</span>
          <span>1000</span>
        </div>
        <div className="leaderboard-row">
          <span>3</span>
          <span>Player Three</span>
          <span>900</span>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
