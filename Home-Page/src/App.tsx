import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Background from "./HomepageComponents/background/Background";
import Navbar from "./HomepageComponents/Navbar/Navbar";
import Hero from "./HomepageComponents/hero/Hero";
import GamePage from "./HomepageComponents/GamePage/GamePage";

interface HeroData {
  text1: string;
  text2: string;
}

function App() {
  const heroData: HeroData[] = [
    { text1: "Explore the ", text2: "unexplored" },
    { text1: "Chat and ", text2: "make new friends" },
    { text1: "Compete and ", text2: "fight for the top" },
  ];

  const [heroCount, setHeroCount] = useState<number>(0);

  const handleVideoEnd = () => {
    setHeroCount((prevCount) => (prevCount + 1) % heroData.length);
  };

  return (
    <Router>
      <div>
        {/* Conditionally render Navbar - only on homepage */}
        <Routes>
          <Route path="/" element={<Navbar />} />
        </Routes>
        
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Background heroCount={heroCount} onVideoEnd={handleVideoEnd} />
                <Hero
                  heroData={heroData[heroCount]}
                  heroCount={heroCount}
                  setHeroCount={setHeroCount}
                />
              </>
            }
          />
          <Route path="/game" element={<GamePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;