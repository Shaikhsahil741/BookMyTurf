import React from "react";
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import CustomerPage from "./pages/CustomerPage";
import AdminPage from "./pages/AdminPage";

type AppProps = {
  useHashRouter?: boolean;
};

const App: React.FC<AppProps> = ({ useHashRouter = false }) => {
  const Router = useHashRouter ? HashRouter : BrowserRouter;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/customer" element={<CustomerPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<MainPage />} /> {/* fallback */}
      </Routes>
    </Router>
  );
};

export default App;
