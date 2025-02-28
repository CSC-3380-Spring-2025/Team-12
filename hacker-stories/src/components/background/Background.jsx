import React, { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Import prop-types
import './Background.css';
import video1 from '../../assets/203-135848350_small.mp4';
import video2 from '../../assets/76005-557381111_small.mp4';
import video3 from '../../assets/108415-680697565_small.mp4';

const Background = ({ heroCount = 0, onVideoEnd }) => {
  const [fadeOut, setFadeOut] = useState(false); // State for fade-out effect
  const currentVideoRef = React.useRef(null); // Reference to the current video
  const nextVideoRef = React.useRef(null); // Reference to the next video

  // List of videos
  const videos = [video1, video2, video3];
  const currentVideo = videos[heroCount];
  const nextVideo = videos[(heroCount + 1) % videos.length];

  // Handle video end event
  const handleVideoEnd = () => {
    setFadeOut(true); // Start fading out the current video
    setTimeout(() => {
      onVideoEnd(); // Transition to the next video after fade-out
      setFadeOut(false); // Reset fade-out state
    }, );
  };

  // Listen for the current video's end event
  useEffect(() => {
    const currentVideoElement = currentVideoRef.current; // Store ref value in a variable

    if (currentVideoElement) {
      currentVideoElement.addEventListener("ended", handleVideoEnd);
    }

    // Cleanup event listener
    return () => {
      if (currentVideoElement) {
        currentVideoElement.removeEventListener("ended", handleVideoEnd);
      }
    };
  }, [heroCount]); // Add heroCount to the dependency array

  // Preload the next video
  useEffect(() => {
    if (nextVideoRef.current) {
      nextVideoRef.current.load();
    }
  }, [nextVideo]); // Add nextVideo to the dependency array

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

// Add prop-type validation
Background.propTypes = {
  heroCount: PropTypes.number.isRequired, // heroCount must be a number and is required
  onVideoEnd: PropTypes.func.isRequired, // onVideoEnd must be a function and is required
};

export default Background;