import React, { useEffect, useState, useRef } from "react";
import {Link} from "react-router-dom";
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
  const [displayText1, setDisplayText1] = useState<string>("");
  const [displayText2, setDisplayText2] = useState<string>("");
  const [typingIndex, setTypingIndex] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null); // Reference to the audio element

  // Simulate typing effect
  useEffect(() => {
    const fullText1 = heroData.text1;
    const fullText2 = heroData.text2;

    if (typingIndex < fullText1.length) {
      const timeout = setTimeout(() => {
        setDisplayText1((prev) => prev + fullText1[typingIndex]);
        setTypingIndex((prev) => prev + 1);
      }, 100); // Adjust typing speed (100ms per character)

      return () => clearTimeout(timeout);
    } else if (typingIndex < fullText1.length + fullText2.length) {
      const timeout = setTimeout(() => {
        setDisplayText2((prev) => prev + fullText2[typingIndex - fullText1.length]);
        setTypingIndex((prev) => prev + 1);
      }, 100); // Adjust typing speed (100ms per character)

      return () => clearTimeout(timeout);
    }
  }, [typingIndex, heroData]);

  // Reset typing effect when heroData changes
  useEffect(() => {
    setDisplayText1("");
    setDisplayText2("");
    setTypingIndex(0);
  }, [heroData]);

  // Handle play button click
  const handlePlayClick = () => {
    if (audioRef.current) {
      audioRef.current.play(); // Play audio when clicked
    }
  };

  return (
    <div className="hero">
      <div className="hero-text">
        <span>{displayText1}</span>
        <span>{displayText2}</span>
      </div>

      {/* Clickable "Play" text */}
      <div className="hero-play-text" >
        <Link to="/play" className="no-underline"
        onClick={handlePlayClick}
        >
          Play
        </Link>
      </div>

      {/* Audio element */}
      <audio ref={audioRef} src="src/assets/evil-laugh (mp3cut.net).mp3"></audio>
    </div>
  );
};

export default Hero;