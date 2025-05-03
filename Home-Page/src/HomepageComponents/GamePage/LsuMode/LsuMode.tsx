import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LsuMode.css";

// allow importing media files (make sure you have a declarations.d.ts for *.mp4)
// ensure the relative path correctly points three levels up to /src/assets
import bgMusic from "../../../assets/callinBatonRouge.mp4";

declare global {
  interface Window {
    initialize: () => void;
  }
}

type Place = [google.maps.LatLngLiteral, { city: string }];

type LocationsArray = Place[];
// Track every spot we’ve already shown
const usedPlaces: LocationsArray = [];

// Pick a random location that we haven't shown yet
function getNextPlace(locations: LocationsArray): Place {
  let place: Place;
  do {
    place = locations[Math.floor(Math.random() * locations.length)];
  } while (
    usedPlaces.some(
      (p) => p[0].lat === place[0].lat && p[0].lng === place[0].lng
    )
  );
  usedPlaces.push(place);
  return place;
}

const Lsu: React.FC = () => {
  const navigate = useNavigate();

  // Load Google Maps & initialize callback
  useEffect(() => {
    if (!(window as any).google) {
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyCgi17uXKvtR8TOwZYq99xZwERDq--R088&callback=initialize&v=weekly";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      window.initialize = initialize;
    } else {
      initialize();
    }
  }, []);

  // All possible LSU spots
  const locations: LocationsArray = [
    [{ lat: 30.411622, lng: -91.18522 }, { city: "Tiger Stadium" }],
    [{ lat: 30.413156, lng: -91.177385 }, { city: "Student Union" }],
    [{ lat: 30.413017, lng: -91.184882 }, { city: "Mike The Tiger Habitat" }],
    [{ lat: 30.413089, lng: -91.180025 }, { city: "The Quad" }],
    [{ lat: 30.414397, lng: -91.177145 }, { city: "Parade Ground" }],
    [{ lat: 30.406844, lng: -91.180225 }, { city: "PFT" }],
    [{ lat: 30.409728, lng: -91.179444 }, { city: "Tureaud Hall" }],
    [{ lat: 30.417993, lng: -91.176509 }, { city: "Canes" }],
    [{ lat: 30.41019,  lng: -91.174147 }, { city: "459" }],
    [{ lat: 30.41053,  lng: -91.170004 }, { city: "UREC" }],
  ];

  // Initialize first place
  let currentPlace = getNextPlace(locations);
  let currentCoords = currentPlace[0];
  let hasGuessed = false;
  let round = 0;
  let score = 0;

  // Render multiple choice
  function multipleChoice(current: Place) {
    const answerContainer = document.getElementById("answer-container");
    if (!answerContainer) return;
    const instructions = document.getElementById("instructions");
    answerContainer.innerHTML = "";
    if (instructions) answerContainer.appendChild(instructions);

    const correct = current[1].city;
    const otherOptions = locations
      .filter((loc) => loc !== current)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2)
      .map((loc) => loc[1].city);

    const allOptions = [correct, ...otherOptions].sort(() => Math.random() - 0.5);

    allOptions.forEach((opt) => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.id = "answer-choice";
      btn.addEventListener("click", () => {
        if (opt === correct) {
          score += 1000;
          document.getElementById("score")!.innerText = `Score: ${score}`;
          btn.style.backgroundColor = "green";
        } else {
          btn.style.backgroundColor = "red";
        }
        hasGuessed = true;
        answerContainer.querySelectorAll("button").forEach((b) => {
          b.setAttribute("disabled", "true");
          if (b.textContent === correct) b.style.border = "2px solid green";
        });
        if (round < 4) {
          const cont = document.getElementById("continue");
          if (cont) {
            cont.style.display = "block";
            cont.onclick = () => nextround();
          }
        } else {
          const gameEnd = document.getElementById("gameend-header-easy");
          const endScore = document.getElementById("end-score");
          if (gameEnd && endScore) {
            endScore.innerText = `Congrats! You got a score of: ${score}`;
            gameEnd.style.display = "block";
          }
        }
      });
      answerContainer.appendChild(btn);
    });
  }

  // Initialize Street View
  function initialize() {
    multipleChoice(currentPlace);
    hasGuessed = false;
    const contBtn = document.getElementById("continue");
    if (contBtn) contBtn.style.display = "none";
    const panorama = new google.maps.StreetViewPanorama(
      document.getElementById("panor") as HTMLElement,
      { position: currentCoords, pov: { heading: 34, pitch: 10 }, panControl: false, linksControl: false, showRoadLabels: false, fullscreenControl: false }
    );
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {}
    );
    map.setStreetView(panorama);
  }

  // Next round logic
  function nextround() {
    round++;
    if (round < 5) {
      currentPlace = getNextPlace(locations);
      currentCoords = currentPlace[0];
      initialize();
    }
  }

  // Reload game
  function handleClick() {
    usedPlaces.length = 0;
    window.location.reload();
  }

  // Attach retry handler
  useEffect(() => {
    const tryAgain = document.getElementById("try-again");
    if (tryAgain) tryAgain.addEventListener("click", handleClick);
    return () => {
      if (tryAgain) tryAgain.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="game-page">
      {/* Background music from imported asset */}
      <audio src={bgMusic} autoPlay loop hidden />

      <div id="game-header">
        <h1 id="game-title"><a href="./">GeoGuessr</a></h1>
        <div id="score">Score: {score}</div>
        <div id="continue">Continue</div>
      </div>

      <div id="game-view">
        <div id="answer-container">
          <div id="instructions">Look around and when you are ready, make a selection.</div>
          <div id="answer-choice"></div>
        </div>
        <div id="panor">
          <div id="gameend-header-easy">
            <div id="end-score">Congrats! You got a score of: 0</div>
            <div id="button-container">
              <div id="back" onClick={() => navigate("/game")}>Back</div>
              <div id="try-again" onClick={handleClick}>Try Again</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lsu;
