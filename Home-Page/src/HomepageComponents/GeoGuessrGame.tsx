import React, { useState, useEffect } from 'react';
import './GamePage/GamePage.css';

interface Location {
  lat: number;
  lng: number;
  name: string;
  country: string;
}

interface GeoGuessrGameProps {
  onExit: () => void;
}

const GeoGuessrGame: React.FC<GeoGuessrGameProps> = ({ onExit }) => {
  const [score, setScore] = useState(0);
  const [location, setLocation] = useState<Location | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const API_KEY = 'putkeyhere'; //PUT KEY HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE or someone make a .env file for it

  const locations: Location[] = [
    { lat: 40.7128, lng: -74.0060, name: 'New York', country: 'United States' },
    { lat: 34.0522, lng: -118.2437, name: 'Los Angeles', country: 'United States' },
    { lat: 51.5074, lng: -0.1278, name: 'London', country: 'United Kingdom' }
  ];

  const loadRandomLocation = () => {
    const randomLoc = locations[Math.floor(Math.random() * locations.length)];
    setLocation(randomLoc);
    setSelectedOption(null);
    setResult(null);
    
    // Generate 2 wrong options (total 3 choices)
    const wrongOptions = locations
      .filter(loc => loc.name !== randomLoc.name)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2)
      .map(loc => `${loc.name}, ${loc.country}`);
    
    setOptions([
      `${randomLoc.name}, ${randomLoc.country}`,
      ...wrongOptions
    ].sort(() => 0.5 - Math.random()));
  };

  useEffect(() => {
    loadRandomLocation();
  }, []);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (!selectedOption || !location) return;

    const isCorrect = selectedOption === `${location.name}, ${location.country}`;
    setResult(isCorrect ? 'Correct!' : `Incorrect! It was ${location.name}, ${location.country}`);

    if (isCorrect) {
      setScore(score + 100);
      setTimeout(() => loadRandomLocation(), 1500);
    }
  };

  return (
    <div className="game-content" style={{ padding: '2rem' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        marginBottom: '2rem'
      }}>
        <h2 style={{ color: '#000', margin: 0 }}>GeoGuessr</h2>
        <div style={{ color: '#000', fontWeight: 'bold' }}>Score: {score}</div>
      </div>

      {location && (
        <div style={{ 
          marginBottom: '2rem',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <iframe
            width="100%"
            height="400"
            src={`https://www.google.com/maps/embed/v1/streetview?key=${API_KEY}&location=${location.lat},${location.lng}&heading=210&pitch=10&fov=90`}
            allowFullScreen
          ></iframe>
        </div>
      )}

      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        {options.map((option, index) => (
          <div
            key={index}
            className="game-box-small"
            style={{
              backgroundColor: selectedOption === option ? '#333' : '#000',
              cursor: result ? 'default' : 'pointer',
              transition: 'background-color 0.2s'
            }}
            onClick={() => !result && handleOptionSelect(option)}
          >
            {option}
          </div>
        ))}
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

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          className="game-box-small"
          style={{
            width: '200px',
            backgroundColor: '#000',
            color: 'white',
            border: 'none',
            cursor: 'pointer'
          }}
          onClick={handleSubmit}
          disabled={!selectedOption || !!result}
        >
          Submit
        </button>
      </div>

      <div style={{ 
        display: 'flex',
        justifyContent: 'center',
        marginTop: '2rem'
      }}>
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

export default GeoGuessrGame;