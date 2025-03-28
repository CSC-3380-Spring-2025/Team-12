import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./hero.css";

interface HeroData {
  text1: string;
  text2: string;
}

interface HeroProps {
  heroData: HeroData;
  heroCount: number;
  setHeroCount: (count: number) => void;
}

const Hero: React.FC<HeroProps> = ({ heroData, heroCount }) => {
  const navigate = useNavigate();
  const [displayText1, setDisplayText1] = useState<string>("");
  const [displayText2, setDisplayText2] = useState<string>("");
  const [typingIndex, setTypingIndex] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Simulate typing effect
  useEffect(() => {
    const fullText1 = heroData.text1;
    const fullText2 = heroData.text2;

    if (typingIndex < fullText1.length) {
      const timeout = setTimeout(() => {
        setDisplayText1((prev) => prev + fullText1[typingIndex]);
        setTypingIndex((prev) => prev + 1);
      }, 100);

      return () => clearTimeout(timeout);
    } else if (typingIndex < fullText1.length + fullText2.length) {
      const timeout = setTimeout(() => {
        setDisplayText2((prev) => prev + fullText2[typingIndex - fullText1.length]);
        setTypingIndex((prev) => prev + 1);
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [typingIndex, heroData]);

  // Reset typing effect when heroData changes
  useEffect(() => {
    setDisplayText1("");
    setDisplayText2("");
    setTypingIndex(0);
  }, [heroData]);

  // Handle play button click - now navigates to /game
  const handlePlayClick = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
    navigate("/game"); // Add this line to navigate
  };

  return (
    <div className="hero">
      <div className="hero-text">
        <span>{displayText1}</span>
        <span>{displayText2}</span>
      </div>

      <div className="hero-play-text" onClick={handlePlayClick}>
        Play
      </div>

      <audio ref={audioRef} src="src/assets/evil-laugh (mp3cut.net).mp3"></audio>
    </div>
  );
};

export default Hero;