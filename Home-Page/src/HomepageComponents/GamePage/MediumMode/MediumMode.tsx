// src/HomepageComponents/GamePage/MediumMode.tsx
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./MediumMode.css";

// import your siren (adjust path if necessary)
import tornadoSiren from "../../../../src/assets/tornadoSiren.mp3";

declare global {
  interface Window {
    initialize: () => void;
  }
}

const Medium: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  // 1) Load Google Maps & set up initialize()
  useEffect(() => {
    if (!(window as any).google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCgi17uXKvtR8TOwZYq99xZwERDq--R088&callback=initialize&v=weekly`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      window.initialize = initialize;
    } else {
      initialize();
    }
  }, []);

  // 2) Play (and loop) the siren on mount
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.loop = true;
      audio.volume = 0.5; // tweak volume if you like
      audio
        .play()
        .catch((e) => console.log("Tornado siren play failed:", e));
    }
  }, []);

  // your existing game logic…
  const locations = [
    [{ lat: 59.320227, lng: 27.781221 }, { city: "Sirgala", country: "Estonia" }],
    [{ lat: 51.276937, lng: 30.215941 }, { city: "Chernobyl", country: "Ukraine" }],
    [{ lat: 51.405972, lng: 30.054208 }, { city: "Pripyat", country: "Ukraine" }],
    [{ lat: 39.765073, lng: 19.876701 }, { city: "Old Perthia", country: "Greece" }],
    [{ lat: 10.622093, lng: 104.026556 }, { city: "Bokor Hill Station", country: "Cambodia" }],
    [{ lat: 32.628102, lng: 129.737966 }, { city: "Hashima Island", country: "Japan" }],
    [{ lat: -34.085117, lng: -70.381686 }, { city: "Sewel Mining Town", country: "Chile" }],
    [{ lat: -3.826791, lng: -55.494232 }, { city: "Fordlandia", country: "Brazil" }],
    [{ lat: 24.629086, lng: -82.874116 }, { city: "Fort Jefferson, Florida", country: "USA" }],
    [{ lat: 36.900232, lng: -116.829255 }, { city: "Rhyolite, Nevada", country: "USA" }],
    [{ lat: 38.881805, lng: -117.608465 }, { city: "Berlin, Nevada", country: "USA" }],
    [{ lat: 38.213041, lng: -119.012700 }, { city: "Bodie, California", country: "USA" }],
    [{ lat: 49.372173, lng: -109.281425 }, { city: "Robsart, Saskatchewan", country: "Canada" }],
    [{ lat: 51.231082, lng: -115.524376 }, { city: "Bankhead, Banff, Alberta", country: "Canada" }],
  ];

  let currentPlace =
    locations[Math.floor(Math.random() * locations.length)];
  let currentCoords = currentPlace[0] as google.maps.LatLngLiteral;
  let round = 0;
  let score = 0;

  const tryAgain = document.getElementById("try-again");
  function handleClick() {
    window.location.reload();
  }
  if (tryAgain) {
    tryAgain.addEventListener("click", handleClick);
  }

  function nextround() {
    if (round < 5) {
      round++;
      let temp;
      do {
        temp = locations[Math.floor(Math.random() * locations.length)];
      } while (
        temp[0].lat === currentPlace[0].lat &&
        temp[0].lng === currentPlace[0].lng
      );
      currentPlace = temp;
      currentCoords = currentPlace[0] as google.maps.LatLngLiteral;
      initialize();
    }
  }

  (window as any).initialize = initialize;

  function initialize() {
    let hasGuessed = false;
    const buttonElement = document.getElementById("button");
    if (buttonElement) {
      (buttonElement as HTMLElement).style.display = "none";
    }

    const panorama = new google.maps.StreetViewPanorama(
      document.getElementById("pano") as HTMLElement,
      {
        position: currentCoords,
        pov: { heading: 34, pitch: 10 },
        panControl: false,
        linksControl: false,
        showRoadLabels: false,
        fullscreenControl: false,
      }
    );

    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        center: { lat: 0, lng: 0 },
        zoom: 1,
        minZoom: 1,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        restriction: {
          latLngBounds: {
            north: 80,
            south: -80,
            east: 180,
            west: -180,
          },
        },
      }
    );

    const infoWindow = new google.maps.InfoWindow({
      position: new google.maps.LatLng(0, 0),
      content: "Look around and double click to make your guess",
    });
    if (round === 0) infoWindow.open(map);

    map.addListener("dblclick", (e: google.maps.MapMouseEvent) => {
      if (hasGuessed) return;
      hasGuessed = true;

      const guessMarker = new google.maps.Marker({
        position: e.latLng!,
        map,
      });
      const target = new google.maps.LatLng(currentCoords);
      new google.maps.Marker({ position: target, map });

      infoWindow.close();

      // draw line, compute score, show result window, etc...
      // (your existing logic here)

      if (round < 4) {
        const cBtn = document.getElementById("button")!;
        cBtn.style.display = "block";
        cBtn.onclick = () => nextround();
      } else {
        const endHeader = document.getElementById("gameend-header")!;
        document.getElementById("end-score")!.innerText = `Congrats! You got a score of: ${score}`;
        endHeader.style.display = "block";
      }
    });

    map.setStreetView(panorama);
  }

  return (
    <div className="game-page">
      {/* Tornado siren audio (loops automatically) */}
      <audio ref={audioRef} src={tornadoSiren} />

      <div id="game-header">
        <h1 id="game-title">
          <a href="./">GeoGuessr</a>
        </h1>
        <div id="score">Score: 0</div>
        <div id="button">Continue</div>
      </div>

      <div id="pano">
        <div id="gameend-header">
          <div id="end-score">Congrats! You got a score of: 0</div>
          <div id="button-container">
            <div id="back" onClick={() => navigate("/game")}>
              Back
            </div>
            <div id="try-again" onClick={handleClick}>
              Try Again
            </div>
          </div>
        </div>
      </div>

      <div id="map"></div>
    </div>
  );
};

export default Medium;
