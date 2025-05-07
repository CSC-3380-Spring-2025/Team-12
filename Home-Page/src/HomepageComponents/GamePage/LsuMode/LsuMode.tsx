import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LsuMode.css";


declare global {
    interface Window {
      initialize: () => void;
    }
}

const Lsu = () => {
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
        [{ lat: 30.411622, lng: -91.185220}, {city: 'Tiger Stadium'}], 
        [{ lat: 30.413156, lng: -91.177385}, {city: 'Student Union'}], 
        [{ lat: 30.413017, lng: -91.184882}, {city: 'Mike The Tiger Habitat'}], 
        [{ lat: 30.413089, lng: -91.180025}, {city: 'The Quad'}], 
        [{ lat: 30.414397, lng: -91.177145}, {city: 'Parade Ground'}], 
        [{ lat: 30.406844, lng: -91.180225}, {city: 'PFT'}], 
        [{ lat: 30.409728, lng: -91.179444}, {city: 'Tureaud Hall'}], 
        [{ lat: 30.417993, lng: -91.176509}, {city: 'Canes'}], 
        [{ lat: 30.410190, lng: -91.174147}, {city: '459'}], 
        [{ lat: 30.410530, lng: -91.170004}, {city: 'UREC'}], 





    ]

    let currentPlace = locations[Math.floor(Math.random() * (locations.length))] //random spawn
    let currentCoords = currentPlace[0] as google.maps.LatLngLiteral; //coordinates

    let hasGuessed = false; // tracks whether a guess has been made
    let round = 0 // tracks round number
    let score = 0 // tracks score

    // multiple choice answers
    function multipleChoice(current: any) {
        const answerContainer = document.getElementById("answer-container");
        if (!answerContainer) return;
    
        const instructions = document.getElementById("instructions");

        // remove everything except #instructions bc for some reason it wasnt working otherwise
        answerContainer.innerHTML = "";
        if (instructions) answerContainer.appendChild(instructions);

    
        const answer = `${current[1].city}`;
        const otherOptions = locations.filter(loc => loc !== current).sort(() => Math.random() - 0.5).slice(0, 2).map(loc => `${loc[1].city}`);
    
        const allOptions = [answer, ...otherOptions].sort(() => Math.random() - 0.5);
    
        allOptions.forEach(option => {
            const choice = document.createElement("answer-choice");
            choice.textContent = option;
            choice.id = "answer-choice";
    
            choice.addEventListener("click", () => {
                if (choice.textContent == answer) {
                    score = score + 1000;
                    document.getElementById("score")!.innerText = `Score: ${score}`;
                    choice.style.backgroundColor = "green";
                } else {
                    choice.style.backgroundColor = "red";
                }

                hasGuessed = true;
    
                // show the correct answer
                const allButtons = answerContainer.querySelectorAll("button");
                allButtons.forEach(btn => {
                    btn.disabled = true;
                    if (btn.textContent == answer) {
                        btn.style.border = "2px solid green";
                    }
                });

                if (round < 4) {
                    const continueButton = document.getElementById("continue");
                    if (continueButton) {
                        continueButton.style.display = "block";
                        continueButton.onclick = () => nextround();
                    }
                } else {
                    // this was the last round, show the end screen
                    const gameEnd = document.getElementById("gameend-header-easy");
                    const endScore = document.getElementById("end-score");
                    if (gameEnd && endScore) {
                        endScore.innerText = `Congrats! You got a score of: ${score}`;
                        gameEnd.style.display = "block";
                    }
                }
                
            });
            answerContainer.appendChild(choice);
        });
    }

    const tryAgain = document.getElementById("try-again");

    function handleClick() {
        window.location.reload();
    }

    if (tryAgain){
        tryAgain!.addEventListener("click", handleClick);
    }


    function nextround() {
        round++; // increment round number
        if (round < 5) { 

            let temp;

            do {
                temp = locations[Math.floor(Math.random() * locations.length)]; 
            } while (temp[0].lat == currentPlace[0].lat && temp[0].lng == currentPlace[0].lng);

            // ensure new location is different than at least the last one, will need to implement a way to check if any other locations are duplicates
            currentPlace = temp;
            currentCoords = currentPlace[0] as google.maps.LatLngLiteral;

            initialize(); // restart map with new location
        }
    }

    (window as any).initialize = initialize;

    function initialize(){
        multipleChoice(currentPlace);
        hasGuessed = false;

        const buttonElement = document.getElementById("continue");
        if (buttonElement) {
            (buttonElement as HTMLElement).style.display = "none";
        } //makes continue button invisible
        
        const panorama = new google.maps.StreetViewPanorama(
            document.getElementById("panor") as HTMLElement, {
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
        });

        map.setStreetView(panorama);
    }
 

  return (
    <div className="game-page">
      
        <div id="game-header">
            <h1 id="game-title">
                <p><a href="./">GeoGuessr</a></p>
            </h1>
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
                        <div id="back" onClick={() => navigate("/game")}>
                            Back
                        </div>
                        <div id="try-again" onClick={handleClick}>
                            Try Again
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Lsu;