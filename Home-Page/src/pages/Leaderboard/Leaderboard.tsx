import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import background from "../../assets/leaderboard-background.jpg";


export default function LeaderBoard() {
    const [activeTab, setActiveTab] = useState("All-Time"); // State to track the active tab
    const navigate = useNavigate();

    // placeholder values for score boxes
    const playerName = "Player Name";
    const score = "0";
    const gamesPlayed = "0";

    //temp data, will have to implement actual player data later
    const leaderboardData = [
        { rank: 1, name: "PlayerOne", score: 1000, guess: 10 },
        { rank: 2, name: "PlayerTwo", score: 900, guess: 9 },
        { rank: 3, name: "PlayerThree", score: 800, guess: 12 },
    ];


    const renderLeaderboard = () => {
        return (
            <div
                style={{
                    maxHeight: "400px",
                    overflowY: "auto",
                    width: "100%",
                    border: "2px solid rgba(225, 225, 225, 0.5)",
                    borderRadius: "10px",
                    backgroundColor: "transparent",
                }}
            >
                <table style={{ width: "100%", borderCollapse: "collapse", color: "#fff"}}>
                    <thead>
                        <tr style={{ borderBottom: "1px solid #666", color: "#fff" }}>
                            <th style={{ padding: "10px" }}>Rank</th>
                            <th style={{ padding: "10px" }}>Player</th>
                            <th style={{ padding: "10px" }}>Score</th>
                            <th style={{ padding: "10px" }}>Guess</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboardData.map((player) => (
                            <tr key={player.rank}>
                                <td style={{ textAlign: "center", padding: "10px" }}>{player.rank}</td>
                                <td style={{ textAlign: "center", padding: "10px" }}>{player.name}</td>
                                <td style={{ textAlign: "center", padding: "10px" }}>{player.score}</td>
                                <td style={{ textAlign: "center", padding: "10px" }}>{player.guess}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };


    return (
        <div style={{ backgroundImage: `url(${background})`, backgroundSize: "cover", overflow: "hidden", backgroundRepeat: "#no-repeat", height: "100vh", width: "100vw", position: "relative", }}>
            <div
                style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "20px",
                    width: "90%",
                }}
            >
                {/*Home Button*/}
            <button
                onClick={() => navigate("/")}
                style={{
                    top: "20px",
                    left: "20px",
                    background: "transparent",
                    color: "#fff",
                    border: "none",
                    width: "fit-content",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontSize:"1em",
                    padding: "5px 10px",
                }}
            >
                GeoGuessr
            </button>
            
            {/* Game title */}
            <h1 style={{ textAlign: "center", fontSize: "2.5em", color: "#fff", fontWeight: "normal" }}>Ghost Town GeoGuessr Leaderboard</h1>

            </div>
            {/* Tabs for navigation */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                {["All-Time", "monthly", "weekly", "daily", "friends"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            background: "transparent",
                            color: "#fff",
                            border: "2px solid rgba(225, 225, 225, 0.5)",
                            borderRadius: "10px 10px 0 0",
                            padding: "10px 15px",
                            margin: "0 5px -2px 5px",
                            cursor: "pointer",
                            backdropFilter: "blur(5px)"
                        }}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* Leaderboard body */}
            <div style={{ background: "transparent", padding: "10px", borderRadius: "10px", color: "transparent" }}>
                {renderLeaderboard()}
            </div>
        </div>
    );
}