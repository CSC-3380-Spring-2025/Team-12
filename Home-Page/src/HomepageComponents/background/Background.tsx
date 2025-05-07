import React, { useEffect, useState, useRef } from "react";
import './Background.css';
import video1 from '@assets/203-135848350_small.mp4'; 
import video2 from '@assets/76005-557381111_small.mp4'; 
import video3 from '@assets/108415-680697565_small.mp4'; 

interface BackgroundProps {
  heroCount: number;
  onVideoEnd: () => void;
}

const Background: React.FC<BackgroundProps> = ({ heroCount, onVideoEnd }) => {
  const [fadeOut, setFadeOut] = useState<boolean>(false); // State for fade-out effect
  const currentVideoRef = useRef<HTMLVideoElement>(null); // Reference to the current video
  const nextVideoRef = useRef<HTMLVideoElement>(null); // Reference to the next video

  const videos: string[] = [video1, video2, video3];
  const currentVideo: string = videos[heroCount];
  const nextVideo: string = videos[(heroCount + 1) % videos.length];

  // Handle video end event
  const handleVideoEnd = () => {
    setFadeOut(true); // Start fading out the current video
    setTimeout(() => {
      onVideoEnd(); // Transition to the next video after fade-out
      setFadeOut(false); // Reset fade-out state
    }); // Adjust the delay to match the fade-out duration
  };

  // Listen for the current video's end event
  useEffect(() => {
    const currentVideoElement = currentVideoRef.current; // Store ref value in a variable

    if (currentVideoElement) {
      currentVideoElement.addEventListener("ended", handleVideoEnd);
    }

    return () => {
      if (currentVideoElement) {
        currentVideoElement.removeEventListener("ended", handleVideoEnd);
      }
    };
  }, [heroCount]);

  // Preload the next video
  useEffect(() => {
    if (nextVideoRef.current) {
      nextVideoRef.current.load();
    }
  }, [nextVideo]); 

  return (
    <>
      {/* Current video (fading out) */}
      <video
        ref={currentVideoRef}
        key={`current-${heroCount}`}
        className={`background ${fadeOut ? "fade-out" : ""}`}
        autoPlay
        muted
      >
        <source src={currentVideo} type='video/mp4' />
      </video>

      {/* Next video (fading in) */}
      <video
        ref={nextVideoRef}
        key={`next-${(heroCount + 1) % videos.length}`}
        className={`background ${fadeOut ? "fade-in" : "hidden"}`}
        autoPlay
        muted
      >
        <source src={nextVideo} type='video/mp4' />
      </video>
    </>
  );
};

export default Background;