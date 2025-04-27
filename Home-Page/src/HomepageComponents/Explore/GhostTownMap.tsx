import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    initMap?: () => void;  // 👈 OPTIONAL
  }
}

const ghostTowns = [
  { name: "Bodie, California", lat: 38.213041, lng: -119.0127 },
  { name: "Pripyat, Ukraine", lat: 51.405972, lng: 30.054208 },
  { name: "Pyramiden, Svalbard, Norway", lat: 78.655918, lng: 16.324358 },
  { name: "Múli, Borðoy, Faroe Islands", lat: 62.351183, lng: -6.582192 },
  { name: "Sirgala, Estonia", lat: 59.320227, lng: 27.781221 },
  { name: "Chernobyl, Ukraine", lat: 51.276937, lng: 30.215941 },
  { name: "Consonno, Olginate, Italy", lat: 45.783762, lng: 9.392466 },
  { name: "Old Perthia, Greece", lat: 39.765073, lng: 19.876701 },
  { name: "Lindenfeld, Romania", lat: 45.313839, lng: 22.110986 },
  { name: "Maraş(Varosha), Cyprus", lat: 35.103845, lng: 33.962793 },
  { name: "Bokor Hill Station, Cambodia", lat: 10.622093, lng: 104.026556 },
  { name: "Hashima Island, Japan", lat: 32.628102, lng: 129.737966 },
  { name: "Kolmanskop, Namibia", lat:-26.703787, lng: 15.231427 },
  { name: "Sewell Mining Town, Chile", lat: -34.085117, lng: -70.381686 },
  { name: "Fordlandia, Brazil", lat: -3.826791, lng: -55.494232 },
  { name: "Fort Jefferson, Florida", lat: 24.629086, lng: -82.874116 },
  { name: "Rhyolite, Nevada, USA", lat: 36.900232, lng: -116.829255 },
  { name: "Berlin, Nevada, USA", lat: 38.881805, lng: -117.608465 },
  { name: "Robsart, Saskatchewan, Canada", lat: 49.372173, lng: -109.281425 },
  { name: "Bankhead, Banff, Alberta, Canada", lat: 51.231082, lng: -115.524376 },
];

const StreetViewPage: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<any>(ghostTowns[0]);
  const streetViewRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();  // Hook to navigate

  useEffect(() => {
    const initStreetView = () => {
      if (streetViewRef.current && window.google) {
        const panorama = new window.google.maps.StreetViewPanorama(
          streetViewRef.current,
          {
            position: { lat: selectedLocation.lat, lng: selectedLocation.lng },
            pov: { heading: 100, pitch: 0 },
            zoom: 1,
          }
        );
        console.log("Street View initialized for:", selectedLocation.name);
      } else {
        console.error("Google Maps or Street View API is not available.");
      }
    };

    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDuc49pvnI2li4asU52IHy38PgUuGRe_Nc&callback=initMap`;
      script.async = true;
      window.initMap = initStreetView;
      document.body.appendChild(script);
    } else {
      initStreetView();
    }

    return () => {
      delete window.initMap;
    };
  }, [selectedLocation]);

  const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTown = ghostTowns.find((town) => town.name === event.target.value);
    if (selectedTown) {
      setSelectedLocation(selectedTown);
    }
  };

  return (
    <div style={{ position: "relative", height: "100vh", margin: 0 }}>
      {/* Navbar */}
      <div className="navbar" style={{ position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)", zIndex: 10, display: "flex", alignItems: "center", gap: "10px" }}>
        
        <select
          value={selectedLocation.name}
          onChange={handleLocationChange}
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        >
          {ghostTowns.map((town) => (
            <option key={town.name} value={town.name}>
              {town.name}
            </option>
          ))}
        </select>
        <button
          onClick={() => navigate("/explore")}  // Navigate to the Explore page
          style={{
            padding: "6px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "12px",
          }}
        >
          Back
        </button>
      </div>

      {/* Street View Map */}
      <div
        ref={streetViewRef}
        style={{
          width: "100%",
          height: "calc(100vh - 80px)",  // Adjust so the map fills the remaining space after the navbar
          marginTop: "60px",  // Optional: ensures the map is below the navbar
        }}
      ></div>
    </div>
  );
};

export default StreetViewPage;
