// src/Layout.js
import React from "react";
import Navbar from "./Pages/LandingPage/Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar stays fixed */}
      <Navbar />
      
      {/* Pages render here */}
      <main className="flex-1 mt-20 px-6"> 
        <Outlet />
      </main>
    </div>
  );
}
