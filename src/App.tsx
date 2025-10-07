import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import CustomerPage from "./pages/CustomerPage";
import AdminPage from "./pages/AdminPage";

type AppProps = { basename: string };

function App({ basename }: AppProps) {
  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/customer" element={<CustomerPage />} />
        <Route path="/admin" element={<AdminPage />} />
        {/* Optional: fallback for unknown routes */}
        <Route path="*" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
