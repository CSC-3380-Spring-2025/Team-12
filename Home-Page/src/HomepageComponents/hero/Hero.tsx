// src/HomepageComponents/hero/Hero.tsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import evilLaugh from "../../assets/evil-laugh.mp3";
import "./hero.css";

interface HeroData { text1: string; text2: string; }
interface HeroProps {
  heroData: HeroData;
  heroCount: number;
  setHeroCount: (count: number) => void;
}

const Hero: React.FC<HeroProps> = ({ heroData, heroCount, setHeroCount }) => {
  const [displayText1, setDisplayText1] = useState("");
  const [displayText2, setDisplayText2] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const navigate = useNavigate();

  // Typing effect
  useEffect(() => {
    const { text1, text2 } = heroData;
    if (typingIndex < text1.length) {
      const t = setTimeout(() => {
        setDisplayText1(d => d + text1[typingIndex]);
        setTypingIndex(i => i + 1);
      }, 100);
      return () => clearTimeout(t);
    }
    if (typingIndex < text1.length + text2.length) {
      const t = setTimeout(() => {
        setDisplayText2(d => d + text2[typingIndex - text1.length]);
        setTypingIndex(i => i + 1);
      }, 100);
      return () => clearTimeout(t);
    }
  }, [typingIndex, heroData]);

  // Reset on new data
  useEffect(() => {
    setDisplayText1("");
    setDisplayText2("");
    setTypingIndex(0);
  }, [heroData]);

  const handlePlayClick = () => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    audio.play().catch(e => console.log("Audio play failed:", e));

    const onEnded = () => {
      audio.removeEventListener("ended", onEnded);
      navigate("/game");
    };
    audio.addEventListener("ended", onEnded);
  };

  return (
    <div className="hero">
      <div className="hero-text">
        <span>{displayText1}</span><span>{displayText2}</span>
      </div>
      <div className="hero-play-text" onClick={handlePlayClick}>
        Play
      </div>
      <audio ref={audioRef} src={evilLaugh} />
    </div>
  );
};

export default Hero;
