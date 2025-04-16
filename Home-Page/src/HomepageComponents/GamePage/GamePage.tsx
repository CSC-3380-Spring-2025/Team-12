import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GamePage.css";
import { useAuth } from '../contexts/AuthContext';
import GeoGuessrGame from '../GeoGuessrGame';

const GamePage = () => {
  const navigate = useNavigate();
  const { username } = useAuth();
  const [gameMode, setGameMode] = useState<string | null>(null);

  return (
    <div className="game-page">
      {/* Black Header */}
      <div className="game-header">
        <h1 className="game-title">GeoGuessr</h1>
        <div className="game-nav-container">
          <div className="game-nav-columns">
            <div 
              className="game-nav-text"
              onClick={() => navigate("/")}
            >
              HOME
            </div>
            <div className="game-nav-text">PLAY WITH FRIENDS</div>
            <div className="player-info">
              <span className="player-label">PLAYER:</span>
              <span className="player-name">{username || 'Guest'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {!gameMode ? (
        <div className="game-layout">
          <div className="game-sidebar">
            <nav className="sidebar-nav">
              <div 
                className="sidebar-nav-text"
                onClick={() => navigate("/chat")}
              >
                CHAT
              </div>
              <div className="sidebar-nav-text">LEADERBOARD</div>
              <div 
                className="sidebar-nav-text"
                onClick={() => navigate("/explore")}
              >
                EXPLORE
              </div>
            </nav>
          </div>
          <div className="game-content">
            <div className="game-boxes">
              <div className="game-box-row">
                <div 
                  className="game-box-small"
                  onClick={() => setGameMode('easy')}
                >
                  EASY MODE
                </div>
                <div className="game-box-small">MEDIUM MODE</div>
                <div className="game-box-small">HARD MODE</div>
              </div>
              <div className="game-box-row">
                <div className="game-box-large">SPECIAL MODES</div>
                <div className="game-box-large">SPECIAL MODES</div>
              </div>
            </div>
          </div>
        </div>
      ) : gameMode === 'easy' ? (
        <GeoGuessrGame onExit={() => setGameMode(null)} />
      ) : null}
    </div>
  );
};

export default GamePage;