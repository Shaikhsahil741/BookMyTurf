import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import "./index.css";

const basename = window.location.hostname.includes("github.io")
  ? "/BookMyTurf"
  : "/";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App basename={basename} />
  </React.StrictMode>
);
