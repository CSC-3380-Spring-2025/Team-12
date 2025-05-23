import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Background from "./HomepageComponents/background/Background";
import Navbar from "./HomepageComponents/Navbar/Navbar";
import Hero from "./HomepageComponents/hero/Hero";
import Chat from "./HomepageComponents/Chat/Chat";
import GamePage from "./HomepageComponents/GamePage/GamePage";
import { AuthProvider } from "./HomepageComponents/contexts/AuthContext";
import ResetPassword from "./HomepageComponents/forgotPassword/ResetPassword";
import Explore from "./HomepageComponents/Explore/Explore";
import Leaderboard from "./HomepageComponents/Leaderboard/Leaderboard";
import GhostTownMap from "./HomepageComponents/Explore/GhostTownMap";
import HardMode from "./HomepageComponents/GamePage/HardMode/HardMode";
import MediumMode from "./HomepageComponents/GamePage/MediumMode/MediumMode";
import SpecialMode2 from "./HomepageComponents/GamePage/SpecialMode2/SpecialMode2";
import Lsu from "./HomepageComponents/GamePage/LsuMode/LsuMode";
import Easy from "./HomepageComponents/GamePage/EasyMode/EasyMode";

interface HeroData {
  text1: string;
  text2: string;
}

function AppWrapper() {
  return (
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  );
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
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage 
              heroCount={heroCount}
              handleVideoEnd={handleVideoEnd}
              heroData={heroData[heroCount]}
              setHeroCount={setHeroCount}
            />
          }
        />
        <Route path="/game" element={<GamePage />} />
        <Route path="/game/MediumMode" element={<MediumMode />} />
        <Route path="/game/HardMode" element={<HardMode />} /> 
        <Route path="/game/NoPanMode" element={<SpecialMode2 />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/reset-password/:uidb64/:token" element={<ResetPassword />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/map" element={<GhostTownMap />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/game/EasyMode" element={<Easy />} />
        <Route path="/game/lsu" element={<Lsu />} />
      </Routes>
    </div>
  );
}

interface HomePageProps {
  heroCount: number;
  handleVideoEnd: () => void;
  heroData: HeroData;
  setHeroCount: React.Dispatch<React.SetStateAction<number>>;
}

const HomePage: React.FC<HomePageProps> = ({
  heroCount,
  handleVideoEnd,
  heroData,
  setHeroCount
}) => {
  return (
    <>
      <Navbar />
      <Background heroCount={heroCount} onVideoEnd={handleVideoEnd} />
      <Hero
        heroData={heroData}
        heroCount={heroCount}
        setHeroCount={setHeroCount}
      />
    </>
  );
};

export default AppWrapper;