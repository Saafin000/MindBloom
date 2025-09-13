import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Features from "./Features.js";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <Navbar />
      <Hero />
      <Features />
    </div>
  );
}
