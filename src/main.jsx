import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import Statistics from "./pages/Statistics.jsx";
import Geospatial from "./pages/Geospatial.jsx";
import Visualisasi from "./pages/Visualisasi.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="Logo" element={<Home />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="Sebaran geografis" element={<Geospatial />} />
          <Route path="home" element={<Home />} />
          <Route path="visualization" element={<Visualisasi />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
