import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./GamePage.css";
import { useAuth } from '../contexts/AuthContext';
import evilLaugh from "../../assets/evil-laugh.mp3"; // Adjust path if needed

const GamePage = () => {
  const navigate = useNavigate();
  const { username } = useAuth();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 1.0;

      // In case audio doesn't play
      audioRef.current.play().catch((e) =>
        console.log("Audio play failed:", e)
      );
    }
  }, []);

  return (
    <div className="game-page">
      {/* Audio element added */}
      <audio ref={audioRef} src={evilLaugh} />

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
      <div className="game-layout">
        <div className="game-sidebar">
          <nav className="sidebar-nav">
            <div
              className="sidebar-nav-text"
              onClick={() => navigate("/chat")}
            >
              CHAT
            </div>
            <div
              className="sidebar-nav-text"
              onClick={() => navigate("/leaderboard")}
            >
              LEADERBOARD
            </div>
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
              <div className="game-box-small">EASY MODE</div>
              <div className="game-box-small"
                onClick={() => window.location.href = "/game-medium.html"}>
                MEDIUM MODE</div>
              <div className="game-box-small"
              onClick={() => navigate("/game/HardMode")}>
                HARD MODE</div>
            </div>
            <div className="game-box-row">
              <div className="game-box-large">SPECIAL MODES</div>
              <div className="game-box-large">SPECIAL MODES</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
