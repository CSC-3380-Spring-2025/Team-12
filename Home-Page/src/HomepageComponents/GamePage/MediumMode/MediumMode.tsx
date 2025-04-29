import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MediumMode.css";

declare global {
    interface Window {
      initialize: () => void;
    }
}

const Medium = () => {
    const navigate = useNavigate();

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
    
    const locations = [
        [{ lat: 59.320227, lng: 27.781221}, {city: 'Sirgala', country: 'Estonia'}], //Sirgala, Estonia
        [{ lat: 51.276937, lng: 30.215941}, {city: 'Chernobyl', country: 'Ukrane'}], //Chernobyl, Ukraine
        [{ lat: 51.405972, lng: 30.054208}, {city: 'Pripyat', country: 'Ukrane'}], //Pripyat, Ukraine
        //Consonno, Olginate, Italy was here,
        [{ lat: 39.765073, lng: 19.876701}, {city: 'Old Perthia', country: 'Greece'}], //Old Perthia, Greece
        //Lindenfeld, Romania was here
        //Maraş(Varosha), Cyprus was here
        [{ lat: 10.622093, lng: 104.026556}, {city: 'Bokor Hill Station', country: 'Cambodia'}], //Bokor Hill Station, Cambodia
        [{ lat: 32.628102, lng: 129.737966}, {city: 'Hashima Island', country: 'Japan'}], //Hashima Island, Japan
        //Kolmanskop, Namibia was here
        [{ lat: -34.085117, lng: -70.381686}, {city: 'Sewel Mining Town', country: 'Chile'}], //Sewell Mining Town, Chile
        [{ lat: -3.826791, lng: -55.494232}, {city: 'Fordlandia', country: 'Brazil'}], //Fordlandia, Brazil 
        [{ lat: 24.629086, lng: -82.874116}, {city: 'Fort Jefferson, Florida', country: 'USA'}], //Fort Jefferson, Florida, USA
        [{ lat: 36.900232, lng: -116.829255}, {city: 'Rhyolite, Nevada', country: 'USA'}], //Rhyolite, Nevada, USA
        [{ lat: 38.881805, lng: -117.608465}, {city: 'Berlin, Nevada', country: 'USA'}], //Berlin, Nevada, USA
        [{ lat: 38.213041, lng: -119.012700}, {city: 'Bodie, California', country: 'USA'}], //Bodie, California, USA
        [{ lat: 49.372173, lng: -109.281425}, {city: 'Robsart, sakatchewan', country: 'Canada'}], //Robsart, Saskatchewan, Canada
        [{ lat: 51.231082, lng: -115.524376}, {city: 'Bankhead, Banff, Alberta', country: 'Canada'}], //Bankhead, Banff, Alberta, Canada
    ]

    let currentPlace = locations[Math.floor(Math.random() * (locations.length))] //random spawn
    let currentCoords = currentPlace[0] as google.maps.LatLngLiteral; //coordinates

    let round = 0
    let score = 0

    function nextround() {
        if (round < 5) { 
            round++; // increment round number
            let temp;

            do {
                temp = locations[Math.floor(Math.random() * locations.length)]; 
            } while (temp[0].lat === currentPlace[0].lat && temp[0].lng === currentPlace[0].lng);

            // ensure new location is different than at least the last one, will need to implement a way to check if any other locations are duplicates
            currentPlace = temp;
            currentCoords = currentPlace[0] as google.maps.LatLngLiteral;

            initialize(); // restart map with new location
        }
    }

    (window as any).initialize = initialize;

    function initialize(){
        let hasGuessed = false; // tracks whether a guess has been made

        const buttonElement = document.getElementById("button");
        if (buttonElement) {
            (buttonElement as HTMLElement).style.display = "none";
        } //makes continue button invisible
        
        const panorama = new google.maps.StreetViewPanorama(
            document.getElementById("pano") as HTMLElement, {
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
        
        const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
            center: {lat: 0, lng: 0},
            zoom: 1,
            minZoom: 1,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            restriction: {
                latLngBounds:{
                    north: 80,
                    south: -80,
                    east: 180,
                    west: -180,
                },
            },
        });
        
        console.log("Panorama object:", panorama);
        console.log("Map object:", map);

        const windowLatLng = new google.maps.LatLng(0, 0);

        const infoWindow = new google.maps.InfoWindow({
            position: windowLatLng,
            content: "Look around and double click to make your guess",
        });

        if (round == 0){ // only show up on first round
            infoWindow.open(map);
        }

        // listener for user answer, and handling what happens next
        map.addListener("dblclick", (mapsMouseEvent: google.maps.MapMouseEvent) => {
            if (hasGuessed) return; // does not allow extra guesses

            hasGuessed = true; // marked true since only guess
            

            let userGuess = new google.maps.LatLng(mapsMouseEvent.latLng!.lat(), mapsMouseEvent.latLng!.lng());

            let guessMarker = new google.maps.Marker({
                position: mapsMouseEvent.latLng,
            })

            guessMarker.setMap(map);

            let target = new google.maps.LatLng(currentCoords.lat, currentCoords.lng);
            let targetMarker = new google.maps.Marker({
                position: target,
                draggable: false,
            });

            targetMarker.setMap(map);

            // found from https://www.youtube.com/watch?v=unP5Yc55bdg&t=2s&ab_channel=ComputerScienceLessons
            // checks distance between guess and actual location
            function guessDistance(){
                let lat1 = guessMarker.getPosition()!.lat()
                let lng1 = guessMarker.getPosition()!.lng()
                let lat2 = currentCoords.lat
                let lng2 = currentCoords.lng

                let R = 6371; // radius of earth in km
                let dLat = deg2rad(lat2-lat1);
                let dLng = deg2rad(lng2-lng1);
                let a = 
                Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                Math.sin(dLng/2) * Math.sin(dLng/2);
                let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                let dist = R * c; // in km
                return dist;
            }

            // deg2rad: degree to radians
            function deg2rad(deg: number){
                return deg * (Math.PI/180)
            }

            function getScore(){
                let distance = guessDistance();
                let total = Math.max(5000 - Math.floor(distance), 0); // score based on distance, linear

                return total;
            }

            infoWindow.close();

            // line from guess to location
            let lineCoordinates = [
                target,
                userGuess,
            ];
            let linePath = new google.maps.Polyline({
                path: lineCoordinates,
                geodesic: true,
                strokeColor: "#FF0000",
                strokeOpacity: 1,
                strokeWeight: 2,
            });

            linePath.setMap(map);

            score = score + getScore(); // adding to score

            let distanceWindow = new google.maps.InfoWindow({
            });
            
            distanceWindow.setContent(`
                <div>
                  <strong>${currentPlace[1].city}, ${currentPlace[1].country}</strong><br/>
                  You earned ${getScore()} points.
                </div>
              `);              
            distanceWindow.open(map, targetMarker);

            document.getElementById("score")!.innerText = `Score: ${score}`;

            if (round < 4){ // continue only shows for the first 4 rounds
                let continueButton = document.getElementById("button");
                continueButton!.style.display = "block";
                document.getElementById("button")!.onclick = function() {nextround();};
            } else if (round >= 4){ // maybe add else so that an end game screen appears
                let gameEnd = document.getElementById("gameend-header");
                document.getElementById("end-score")!.innerText = `Congrats! You got a score of: ${score}`;
                gameEnd!.style.display = "block";
            }
        });

        map.setStreetView(panorama);
    }
 

  return (
    <div className="game-page">
      
      <div id="game-header">
        <h1 id="game-title">
            <p><a href="./">GeoGuessr</a></p>
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
                    <div id="try-again" onClick={() => navigate("/medium")}>
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

export default Medium;