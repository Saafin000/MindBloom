import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Layout from "./Layout";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Home from "./Pages/Home/Home";
import JoinUs from "./Pages/JoinUs/JoinUs";
import Journal from "./Pages/Journal/Journal";     
import Community from "./Pages/Community/Community";
import Tracker from "./Pages/Tracker/Tracker";
import Camera from "./Pages/Camera/Camera";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Layout wraps all pages with Navbar */}
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="home" element={<Home />} />
          <Route path="join" element={<JoinUs />} />
          <Route path="journal" element={<Journal />} />
          <Route path="community" element={<Community />} />
          <Route path="tracker" element={<Tracker />} />
          <Route path="camera" element={<Camera />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
