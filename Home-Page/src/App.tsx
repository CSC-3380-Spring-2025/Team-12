import React, { useState } from "react"; 
import Background from "./HomepageComponents/background/Background";
import Navbar from "./HomepageComponents/Navbar/Navbar";
import Hero from "./HomepageComponents/hero/Hero";


interface HeroData {
  text1: string;
  text2: string;
}

function App() {
  // The text that will be animated
  const heroData: HeroData[] = [
    { text1: "Explore the", text2: "unexplored" },
    { text1: "Chat and", text2: "make new friends" },
    { text1: "compete and", text2: "fight for the top" },
  ];

  // To transition the image and text
  const [heroCount, setHeroCount] = useState<number>(0);

  // Function to handle video end
  const handleVideoEnd = () => {
    setHeroCount((prevCount) => (prevCount + 1) % heroData.length); // Move to the next video
  };

  return (
    <div>
      <Navbar/>
      <Background heroCount={heroCount} onVideoEnd={handleVideoEnd} />
      <Hero
        heroData={heroData[heroCount]}
        heroCount={heroCount}
        setHeroCount={setHeroCount}
      />
    </div>
  );
}

export default App;