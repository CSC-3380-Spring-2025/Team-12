import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./pages/App"; // Correct import for TypeScript
import Play from "./pages/Play";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import About from "./pages/About";
import Page3 from "./pages/Page3";
import Page2 from "./pages/Page2";
import "./index.css";

// Find the root element
const rootElement = document.getElementById("root");

// Create Client Browser Router
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>404 Not Found</div>
  },
  {
    path: '/play',
    element: <Play />,
  },
  {
    path: '/leaderboard',
    element: <Leaderboard />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/page2',
    element: <Page2 />,
  },
  {
    path: '/Page3',
    element: <Page3 />,
  },
]);



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