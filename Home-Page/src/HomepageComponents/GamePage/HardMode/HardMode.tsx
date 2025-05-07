import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./HardMode.css";

// import audio files from assets
import evilLaugh from "../../../assets/evilLaugh.mp3";
import horrorBackgroundMusic from "../../../assets/horrorBackgroundMusic.mp3";

declare global {
  interface Window {
    initialize: () => void;
  }
}

const Hard = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(20);
  const [timerActive, setTimerActive] = useState(true);
  const [timerWarning, setTimerWarning] = useState(false);
  const timerRef = useRef<number | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const hasGuessedRef = useRef(false);

  const evilLaughRef = useRef<HTMLAudioElement | null>(null);
  const horrorBackgroundMusicRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize all audio elements
    evilLaughRef.current = new Audio(evilLaugh);
    horrorBackgroundMusicRef.current = new Audio(horrorBackgroundMusic);

    // Loop background music
    if (horrorBackgroundMusicRef.current) {
      horrorBackgroundMusicRef.current.loop = true;
      horrorBackgroundMusicRef.current.volume = 0.5; // Set volume to 50%
      horrorBackgroundMusicRef.current.play().catch((error) => {
        console.log("Background music autoplay failed:", error);
        // In case there's a problem with the audio, throw an error in console
      });
    }

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

    // Cleanup function to clear timer on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      // Stop playing audio
      if (horrorBackgroundMusicRef.current) {
        horrorBackgroundMusicRef.current.pause();
        horrorBackgroundMusicRef.current.currentTime = 0;
      }

      if (evilLaughRef.current) {
        evilLaughRef.current.pause();
        evilLaughRef.current.currentTime = 0;
      }
    };
  }, []);

  // Timer effect
  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          // Set warning state when timer is at 5 seconds or less
          if (newTime <= 5) {
            setTimerWarning(true);

            // Speed up background music for suspense
            if (horrorBackgroundMusicRef.current) {
                const speedFactor = 1 + ((5 - newTime) * 0.16);
                horrorBackgroundMusicRef.current.playbackRate = speedFactor;
            }
          }
          // Auto guess when timer hits 0
          if (newTime === 0 && mapRef.current && !hasGuessedRef.current) {
            makeRandomGuess();
          }
          return newTime;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timerActive, timeLeft]);

  // Evil laugh function
  const playEvilLaugh = () => {
    if (evilLaughRef.current) {
      evilLaughRef.current.currentTime = 0;
      evilLaughRef.current.play().catch((error) => {
        console.log("Evil Laugh audio failed:", error);
      });
    }
  };

  const playBackgroundMusic = () => {
    if (horrorBackgroundMusicRef.current) {
      horrorBackgroundMusicRef.current.play().catch((error) => {
        console.log("Horror background audio failed:", error);
      });
    }
  };

  // Once the user clicks, the horror background music will start playing
  const gamePageClick = () => {
    playBackgroundMusic();
  };

  // Horror background music function

  const locations = [
    [
      { lat: 59.320227, lng: 27.781221 },
      { city: "Sirgala", country: "Estonia" },
    ], //Sirgala, Estonia
    [
      { lat: 51.276937, lng: 30.215941 },
      { city: "Chernobyl", country: "Ukrane" },
    ], //Chernobyl, Ukraine
    [
      { lat: 51.405972, lng: 30.054208 },
      { city: "Pripyat", country: "Ukrane" },
    ], //Pripyat, Ukraine
    //Consonno, Olginate, Italy was here,
    [
      { lat: 39.765073, lng: 19.876701 },
      { city: "Old Perthia", country: "Greece" },
    ], //Old Perthia, Greece
    //Lindenfeld, Romania was here
    //Maraş(Varosha), Cyprus was here
    [
      { lat: 10.622093, lng: 104.026556 },
      { city: "Bokor Hill Station", country: "Cambodia" },
    ], //Bokor Hill Station, Cambodia
    [
      { lat: 32.628102, lng: 129.737966 },
      { city: "Hashima Island", country: "Japan" },
    ], //Hashima Island, Japan
    //Kolmanskop, Namibia was here
    [
      { lat: -34.085117, lng: -70.381686 },
      { city: "Sewel Mining Town", country: "Chile" },
    ], //Sewell Mining Town, Chile
    [
      { lat: -3.826791, lng: -55.494232 },
      { city: "Fordlandia", country: "Brazil" },
    ], //Fordlandia, Brazil
    [
      { lat: 24.629086, lng: -82.874116 },
      { city: "Fort Jefferson, Florida", country: "USA" },
    ], //Fort Jefferson, Florida, USA
    [
      { lat: 36.900232, lng: -116.829255 },
      { city: "Rhyolite, Nevada", country: "USA" },
    ], //Rhyolite, Nevada, USA
    [
      { lat: 38.881805, lng: -117.608465 },
      { city: "Berlin, Nevada", country: "USA" },
    ], //Berlin, Nevada, USA
    [
      { lat: 38.213041, lng: -119.0127 },
      { city: "Bodie, California", country: "USA" },
    ], //Bodie, California, USA
    [
      { lat: 49.372173, lng: -109.281425 },
      { city: "Robsart, sakatchewan", country: "Canada" },
    ], //Robsart, Saskatchewan, Canada
    [
      { lat: 51.231082, lng: -115.524376 },
      { city: "Bankhead, Banff, Alberta", country: "Canada" },
    ], //Bankhead, Banff, Alberta, Canada
  ];

  let currentPlace = locations[Math.floor(Math.random() * locations.length)]; //random spawn
  let currentCoords = currentPlace[0] as google.maps.LatLngLiteral; //coordinates

  let round = 0;
  let score = 0;

  const tryAgain = document.getElementById("try-again");

    function handleClick() {
        window.location.reload();
    }

    if (tryAgain){
        tryAgain!.addEventListener("click", handleClick);
    }

  // Function to make a random guess when timer hits 0
  function makeRandomGuess() {
    if (hasGuessedRef.current || !mapRef.current) return;

    // Random coordinates somewhere on the map
    const randomLat = Math.random() * 160 - 80; // Range from -80 to 80 (restricted map bounds)
    const randomLng = Math.random() * 360 - 180; // Range from -180 to 180

    // Create a fake click event with random coordinates
    const randomLatLng = new google.maps.LatLng(randomLat, randomLng);
    const fakeEvent = {
      latLng: randomLatLng,
    } as google.maps.MapMouseEvent;

    // Trigger the double click handler with our random coordinates
    processGuess(fakeEvent);
  }

  function nextround() {
    if (round < 5) {
      round++; // increment round number
      let temp;

      do {
        temp = locations[Math.floor(Math.random() * locations.length)];
      } while (
        temp[0].lat === currentPlace[0].lat &&
        temp[0].lng === currentPlace[0].lng
      );

      // ensure new location is different than at least the last one, will need to implement a way to check if any other locations are duplicates
      currentPlace = temp;
      currentCoords = currentPlace[0] as google.maps.LatLngLiteral;

      // Reset timer and flags for next round
      setTimeLeft(20);
      setTimerWarning(false);
      setTimerActive(true);
      hasGuessedRef.current = false;

      // Reset background music to normal speed when round switches
      if (horrorBackgroundMusicRef.current) {
        horrorBackgroundMusicRef.current.playbackRate = 1.0;
      }

      initialize(); // restart map with new location
    }
  }

  (window as any).initialize = initialize;

  function processGuess(mapsMouseEvent: google.maps.MapMouseEvent) {
    if (hasGuessedRef.current || !mapRef.current) return; // does not allow extra guesses

    playEvilLaugh();

    // Reset background music to normal speed when player makes a guess
    if (horrorBackgroundMusicRef.current) {
        horrorBackgroundMusicRef.current.playbackRate = 1.0;
      }
    // Stop the timer when a guess is made
    setTimerActive(false);
    hasGuessedRef.current = true; // marked true since only one guess allowed

    const userGuess = new google.maps.LatLng(
      mapsMouseEvent.latLng!.lat(),
      mapsMouseEvent.latLng!.lng()
    );

    const guessMarker = new google.maps.Marker({
      position: mapsMouseEvent.latLng,
    });

    guessMarker.setMap(mapRef.current);

    const target = new google.maps.LatLng(currentCoords.lat, currentCoords.lng);
    const targetMarker = new google.maps.Marker({
      position: target,
      draggable: false,
    });

    targetMarker.setMap(mapRef.current);

    // found from https://www.youtube.com/watch?v=unP5Yc55bdg&t=2s&ab_channel=ComputerScienceLessons
    // checks distance between guess and actual location
    function guessDistance() {
      const lat1 = guessMarker.getPosition()!.lat();
      const lng1 = guessMarker.getPosition()!.lng();
      const lat2 = currentCoords.lat;
      const lng2 = currentCoords.lng;

      const R = 6371; // radius of earth in km
      const dLat = deg2rad(lat2 - lat1);
      const dLng = deg2rad(lng2 - lng1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
          Math.cos(deg2rad(lat2)) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const dist = R * c; // in km
      return dist;
    }

    // deg2rad: degree to radians
    function deg2rad(deg: number) {
      return deg * (Math.PI / 180);
    }

    function getScore() {
      const distance = guessDistance();
      const total = Math.max(5000 - Math.floor(distance), 0); // score based on distance, linear

      return total;
    }

    // close any open info windows
    const infoWindows = document.querySelectorAll(".gm-ui-hover-effect");
    infoWindows.forEach((window) => {
      (window as HTMLElement).click();
    });

    // line from guess to location
    const lineCoordinates = [target, userGuess];
    const linePath = new google.maps.Polyline({
      path: lineCoordinates,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1,
      strokeWeight: 2,
    });

    linePath.setMap(mapRef.current);

    score = score + getScore(); // adding to score

    const distanceWindow = new google.maps.InfoWindow({});

    distanceWindow.setContent(`
            <div>
              <strong>${currentPlace[1].city}, ${currentPlace[1].country}</strong><br/>
              You earned ${getScore()} points.
            </div>
          `);
    distanceWindow.open(mapRef.current, targetMarker);

    document.getElementById("score")!.innerText = `Score: ${score}`;

    if (round < 4) {
      // continue only shows for the first 4 rounds
      const continueButton = document.getElementById("button");
      const timedisplay = document.getElementById("timer");
      if(timedisplay){
        timedisplay.style.display = "none";
      }
      continueButton!.style.display = "block";
      continueButton!.onclick = function () {
        nextround();
      };
    } else if (round >= 4) {
      // maybe add else so that an end game screen appears
      const gameEnd = document.getElementById("gameend-header");
      document.getElementById("end-score")!.innerText =
        `Congrats! You got a score of: ${score}`;
      gameEnd!.style.display = "block";
    }
  }

  function initialize() {
    hasGuessedRef.current = false; // reset guess state

    const timerdisplay = document.getElementById("timer");
    if(timerdisplay){
      timerdisplay.style.display = "block";
    }

    // Reset and start timer for new round
    setTimeLeft(20);
    setTimerWarning(false);
    setTimerActive(true);

    const buttonElement = document.getElementById("button");
    if (buttonElement) {
      (buttonElement as HTMLElement).style.display = "none";
    } //makes continue button invisible

    const panorama = new google.maps.StreetViewPanorama(
      document.getElementById("pano") as HTMLElement,
      {
        position: currentCoords,
        pov: {
          heading: 34,
          pitch: 10,
        },
        panControl: false,
        linksControl: false,
        showRoadLabels: false,
        fullscreenControl: false,
      }
    );
    // Create a style that hides all continent, country, and city names
    const noLabelsStyle = [
      {
        featureType: "all",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "administrative.country",
        elementType: "geometry.stroke",
        stylers: [{ visibility: "on" }, { weight: 0.5 }],
      },
    ];

    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        center: { lat: 0, lng: 0 },
        zoom: 1,
        minZoom: 1,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        styles: noLabelsStyle,
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

    // Store map reference for later use
    mapRef.current = map;

    console.log("Panorama object:", panorama);
    console.log("Map object:", map);

    const windowLatLng = new google.maps.LatLng(0, 0);

    const infoWindow = new google.maps.InfoWindow({
      position: windowLatLng,
      content: "Look around and double click to make your guess",
    });

    if (round == 0) {
      // only show up on first round
      infoWindow.open(map);
    }

    // listener for user answer, and handling what happens next
    map.addListener("dblclick", (mapsMouseEvent: google.maps.MapMouseEvent) => {
      processGuess(mapsMouseEvent);
    });

    map.setStreetView(panorama);
  }

  return (
    <div className="game-page" onClick={gamePageClick}>
      <div id="game-header">
        <h1 id="game-title">
          <p>
            <a href="./">GeoGuessr</a>
          </p>
        </h1>
        <div id="score">Score: 0</div>
        <div id="timer" className={timerWarning ? "timer-warning" : ""}>
          Time: {timeLeft}s
        </div>
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
      <script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCgi17uXKvtR8TOwZYq99xZwERDq--R088&callback=initialize&v=weekly"
        defer
      ></script>
    </div>
  );
};

export default Hard;
