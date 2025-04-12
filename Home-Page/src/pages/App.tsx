import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Background from "../HomepageComponents/background/Background";
import Navbar from "../HomepageComponents/Navbar/Navbar";
import Hero from "../HomepageComponents/hero/Hero";
import Leaderboard from "./Leaderboard/Leaderboard";
import Play from "./Play";

interface HeroData {
  text1: string;
  text2: string;
}

function App() {
  // The text that will be animated
  const heroData: HeroData[] = [
    { text1: "Explore the ", text2: "unexplored" },
    { text1: "Chat and ", text2: "make new friends" },
    { text1: "Compete and ", text2: "fight for the top" },
  ];

  // To transition the image and text
  const [heroCount, setHeroCount] = useState<number>(0);

  // Function to handle video end
  const handleVideoEnd = () => {
    setHeroCount((prevCount) => (prevCount + 1) % heroData.length); // Move to the next video
  };

  return (
    <Router>
      <div>
        <Routes>
          {/*Main Page*/}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Background heroCount={heroCount} onVideoEnd={handleVideoEnd} />
                <Hero
                  heroData={heroData[heroCount]}
                  heroCount={heroCount}
                  setHeroCount={setHeroCount}
                />
              </>
            }
          />
          {/*Leaderboard Page */}
          <Route
            path="/leaderboard"
            element={<Leaderboard />}
          />

          {/*Game Page */}
          <Route
            path="/play"
            element={<Play />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;