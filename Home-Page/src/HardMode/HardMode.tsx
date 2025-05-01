import React, { useState, useEffect, useRef } from 'react';
import './HardMode.css'; // assuming we reuse the same CSS

interface Location {
  lat: number;
  lng: number;
  country: string;
}

interface HardModeProps {
  onExit: () => void;
}

const locations: Location[] = [
  { lat: 60.171001, lng: 24.939350, country: 'Finland' },
  { lat: 48.858093, lng: 2.294694, country: 'France' },
  { lat: 51.510020, lng: -0.134730, country: 'United Kingdom' },
  { lat: 41.8902, lng: 12.4922, country: 'Italy' },
  { lat: 25.195302, lng: 55.272879, country: 'United Arab Emirates' },
  { lat: 1.283404, lng: 103.863134, country: 'Singapore' },
  { lat: 29.976768, lng: 31.135538, country: 'Egypt' },
  { lat: 40.757876, lng: -73.985592, country: 'United States' },
];

declare global {
  interface Window {
    google: any;
  }
}

const HardMode: React.FC<HardModeProps> = ({ onExit }) => {
  const [score, setScore] = useState(0);
  const [location, setLocation] = useState<Location | null>(null);
  const [guess, setGuess] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const streetViewRef = useRef<HTMLDivElement>(null);
  const panoramaRef = useRef<any>(null);

  const API_KEY = "AIzaSyCgi17uXKvtR8TOwZYq99xZwERDq--R088"; // Replace with your real API key

  useEffect(() => {
    loadRandomLocation();
  }, []);

  useEffect(() => {
    if (window.google && location && streetViewRef.current) {
      panoramaRef.current = new window.google.maps.StreetViewPanorama(
        streetViewRef.current,
        {
          position: { lat: location.lat, lng: location.lng },
          pov: { heading: 165, pitch: 0 },
          zoom: 1,
        }
      );
    }
  }, [location]);

  const loadRandomLocation = () => {
    const randomLoc = locations[Math.floor(Math.random() * locations.length)];
    setLocation(randomLoc);
    setGuess('');
    setResult(null);
  };

  const handleSubmit = () => {
    if (!location) return;
    const normalizedGuess = guess.trim().toLowerCase();
    const normalizedAnswer = location.country.trim().toLowerCase();

    if (normalizedGuess === normalizedAnswer) {
      setResult('Correct!');
      setScore(prev => prev + 100);
      setTimeout(() => loadRandomLocation(), 1500);
    } else {
      setResult(`Incorrect! It was ${location.country}`);
      setScore(0);
      setTimeout(() => loadRandomLocation(), 2000);
    }
  };

  return (
    <div className="game-content" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h2 style={{ color: '#000', margin: 0 }}>Hard Mode</h2>
        <div style={{ color: '#000', fontWeight: 'bold' }}>Score: {score}</div>
      </div>

      <div style={{ marginBottom: '2rem', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <div id="street-view" ref={streetViewRef} style={{ width: '100%', height: '400px', filter: 'invert(1)' }} />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Enter country name"
          style={{
            width: '100%',
            padding: '1rem',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
            marginBottom: '1rem'
          }}
          disabled={!!result}
        />

        <button
          className="game-box-small"
          style={{
            width: '100%',
            backgroundColor: '#000',
            color: 'white',
            border: 'none',
            padding: '1rem',
            cursor: 'pointer',
            fontSize: '1rem',
            borderRadius: '8px'
          }}
          onClick={handleSubmit}
          disabled={!guess || !!result}
        >
          Submit Guess
        </button>
      </div>

      {result && (
        <div style={{
          padding: '1rem',
          marginBottom: '1.5rem',
          backgroundColor: result.startsWith('Correct') ? '#4CAF50' : '#f44336',
          color: 'white',
          borderRadius: '4px',
          textAlign: 'center'
        }}>
          {result}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        <button
          style={{
            background: 'none',
            border: 'none',
            color: '#000',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
          onClick={onExit}
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
};

export default HardMode;
