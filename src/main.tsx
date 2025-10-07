import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Use HashRouter on GitHub Pages to avoid 404s on refresh
const isGitHubPages = window.location.hostname.includes("github.io");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App useHashRouter={isGitHubPages} />
  </React.StrictMode>
);
