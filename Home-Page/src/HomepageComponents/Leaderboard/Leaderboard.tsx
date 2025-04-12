import React from 'react';
import './Leaderboard.css';

interface LeaderboardProps {
  isOpen: boolean;
  onClose: () => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Sample leaderboard data (can replace this with dynamic data later)
  const leaderboardData = [
    { username: 'Player1', rank: 1, score: 1500 },
    { username: 'Player2', rank: 2, score: 1300 },
    { username: 'Player3', rank: 3, score: 1200 },
    { username: 'Player4', rank: 4, score: 1000 },
    { username: 'Player5', rank: 5, score: 900 },
  ];

  return (
    <div className="leaderboard-modal">
      <div className="leaderboard-content">
        <span className="close-x" onClick={onClose}>&times;</span>
        <h2>Leaderboard</h2>

        <div className="leaderboard-list">
          {leaderboardData.map((player, index) => (
            <div
              key={index}
              className={`leaderboard-item ${player.rank <= 3 ? `rank-${player.rank}` : ''}`}
            >
              <div className="rank">{player.rank <= 3 ? (
                <span className={`rank-medal rank-${player.rank}`}>{player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : '🥉'}</span>
              ) : player.rank}</div>

              <div className="username">{player.username}</div>
              <div className="score">{player.score} points</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
