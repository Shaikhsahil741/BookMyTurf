// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import CustomerPage from "./pages/CustomerPage";
import AdminPage from "./pages/AdminPage";

function App(){
  return (
    <Router>
      <div className="min-h-screen m-0 p-0">
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/customer" element={<CustomerPage/>} />
          <Route path="/admin" element={<AdminPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
