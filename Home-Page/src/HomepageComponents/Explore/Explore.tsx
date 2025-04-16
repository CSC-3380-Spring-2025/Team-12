import React, { useState } from "react";
import ExploreNavbar from "./ExploreNavbar";
import "./Explore.css";
import { HiAnnotation } from "react-icons/hi";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// Image carousel imports
import ghosttown_image1 from '../../assets/hashima-island-japan-ghosttown.jpg';
import ghosttown_image2 from '../../assets/pripyat-ukraine-ghosttown.jpg';
import ghosttown_image3 from '../../assets/bodie-california-ghosttown.jpg';




const funFacts = [
  { location: "Maraş (Varosha), Cyprus", fact: "Varosha was abandoned in 1974 after the Turkish invasion. Once a bustling tourist spot, it remains frozen in time with its derelict buildings." },
  { location: "Hashima Island, Japan", fact: "Hashima Island, also known as Battleship Island, was a coal mining town abandoned in 1974. It became famous for its appearance in the 2012 James Bond film 'Skyfall'." },
  { location: "Sirgala, Estonia", fact: "Sirgala is a spooky and eerie abandoned village, often visited by urban explorers for its decaying houses and haunting atmosphere." },
  { location: "Múli, Borðoy, Faroe Islands", fact: "Múli is a scenic village in the Faroe Islands, surrounded by stunning landscapes, though now mostly deserted." },
  { location: "Old Perthia, Greece (Near Lafki)", fact: "Old Perthia on the island of Corfu was abandoned in the 19th century after an earthquake devastated the village." },
  { location: "Lindenfeld, Romania", fact: "Lindenfeld is a German settlement in Romania, abandoned in the 19th century, and now overtaken by nature." },
  { location: "Consonno, Olginate, Italy", fact: "Consonno was once dubbed 'The Las Vegas of Italy' but became a ghost town after financial troubles led to its abandonment." },
  { location: "Pyramiden, Svalbard, Norway", fact: "Pyramiden is a Russian mining town in the Arctic that was abandoned in 1998. It is considered one of the best-preserved Soviet ghost towns." },
  { location: "Chernobyl, Ukraine", fact: "The Chernobyl disaster in 1986 led to the evacuation of over 49,000 people from the nearby town of Pripyat, creating one of the most famous ghost towns in the world." },
  { location: "Pripyat, Ukraine", fact: "Pripyat was once a thriving town of over 50,000 people but was abandoned after the Chernobyl nuclear disaster in 1986." },
  { location: "Fordlandia, Brazil", fact: "Fordlandia was a failed rubber plantation project by Henry Ford in the Amazon, designed to supply rubber for his car manufacturing." },
  { location: "Bokor Hill Station, Cambodia", fact: "Bokor Hill Station, built during the French colonial era, is now an eerie ghost town with crumbling buildings and beautiful views of the surrounding Cambodian countryside." },
  { location: "Kolmanskop, Namibia", fact: "Kolmanskop was a thriving diamond mining town in the early 1900s, but it was abandoned when diamond resources were depleted. It is now a popular tourist attraction." },
  { location: "Sewell Mining Town, Chile", fact: "Sewell, a mining town in the Andes, was abandoned after the copper mine shut down. Today, it is a UNESCO World Heritage site." },

  // Ghost Towns in the U.S.
  { location: "Berlin, Nevada", fact: "Berlin, Nevada, was a silver mining town that flourished in the 1860s but was abandoned by the early 1900s. It is now part of a state park, preserving its ruins." },
  { location: "Fort Jefferson, Florida", fact: "Fort Jefferson, located in the Dry Tortugas, was built in the mid-1800s and served as a military prison during the Civil War." },
  { location: "Bodie, California", fact: "Bodie is one of the best-preserved ghost towns in the U.S., frozen in time since it was abandoned after a mining boom and bust in the late 1800s." },
  { location: "Rhyolite, Nevada", fact: "Rhyolite was a boomtown in the early 1900s, thriving due to gold mining, but was abandoned by 1916. It is now an iconic ghost town with several still-standing structures." }
];


const Explore: React.FC = () => {
  const [currentFact, setCurrentFact] = useState<string>(funFacts[0].fact);

  const getRandomFact = () => {
    const randomIndex = Math.floor(Math.random() * funFacts.length);
    setCurrentFact(funFacts[randomIndex].fact);
  };

  return (
    <div className="explore-page">
      <ExploreNavbar />
      
      <div className="explore-container">
        <div className="fun-fact">
          <h3>Fun Facts</h3>
          <p>{currentFact}</p>
          <button onClick={getRandomFact}>
            <span className="button-text">New Fact</span>
            <HiAnnotation className="icon" />
            </button>
        </div>

        <div className="image-carousel">
          <Carousel>
            <div>
              <img src={ghosttown_image1} alt="Hashima Island, Japan" />
              <p className="legend">Hashima Island, Japan; Heavily populated with coal mines, but abandoned in 1974 due to a shift in petroleum-based energy.</p>
            </div>
            <div>
              <img src={ghosttown_image2} alt="Pripyat, Ukraine" />
              <p className="legend">Pripyat, Ukraine; abandoned after the Chernobyl incident of 1986.</p>
            </div>
            <div>
              <img src={ghosttown_image3} alt="Bodie, California" />
              <p className="legend">Bodie, California; Once a mining town, but abandoned due to the official suspension of mining in 1942.</p>
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Explore;
