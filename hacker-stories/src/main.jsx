import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Correct import for TypeScript
import "./index.css";

// Find the root element
const rootElement = document.getElementById("root");

// Ensure the root element exists before rendering
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Failed to find the root element");
}