import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import CustomerPage from "./pages/CustomerPage";
import AdminPage from "./pages/AdminPage";

function App() {
  // 👇 Auto-detect if running on GitHub Pages or locally
  const basename = window.location.hostname.includes("github.io")
    ? "/BookMyTurf"
    : "/";

  return (
    <Router basename={basename}>
      <div className="min-h-screen m-0 p-0">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/customer" element={<CustomerPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
