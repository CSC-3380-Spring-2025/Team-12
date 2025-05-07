import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./hero.css";
import evilLaugh from "../../assets/evil-laugh.mp3";

interface HeroData {
  text1: string;
  text2: string;
}

interface HeroProps {
  heroData: HeroData;
  heroCount: number;
  setHeroCount: (count: number) => void;
}

const Hero: React.FC<HeroProps> = ({ heroData, heroCount, setHeroCount }) => {
  const [displayText1, setDisplayText1] = useState<string>("");
  const [displayText2, setDisplayText2] = useState<string>("");
  const [typingIndex, setTypingIndex] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const navigate = useNavigate();

  // Typing effect
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
        setDisplayText2(
          (prev) => prev + fullText2[typingIndex - fullText1.length]
        );
        setTypingIndex((prev) => prev + 1);
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [typingIndex, heroData]);

  // Reset on heroData change
  useEffect(() => {
    setDisplayText1("");
    setDisplayText2("");
    setTypingIndex(0);
  }, [heroData]);

  const handlePlayClick = () => {
    // Play audio
    if (audioRef.current) {
      audioRef.current
        .play()
        .catch((e) => console.log("Audio play failed:", e));
    }

    // Navigate to game page
    navigate("/game");
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

      {/* Updated Audio Reference */}
      <audio ref={audioRef} src={evilLaugh}></audio>
    </div>
  );
};

export default Hero;
