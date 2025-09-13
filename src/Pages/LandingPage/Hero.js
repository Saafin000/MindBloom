// Hero.js
import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { IoChatbubbleOutline } from "react-icons/io5";
import JoinUs from "../JoinUs/JoinUs";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const [showAuth, setShowAuth] = useState(false);
  const [redirectPath, setRedirectPath] = useState("/home");
  const navigate = useNavigate();

  // Handles navigation or login modal
  const handleAction = (path) => {
    if (!loggedIn) {
      setRedirectPath(path); // Save where user intended to go
      setShowAuth(true); // Show login modal
    } else {
      navigate(path); // Directly navigate if logged in
    }
  };

  // After login
  const handleLogin = () => {
    setLoggedIn(true);
    setShowAuth(false);
    navigate(redirectPath); // Redirect to saved path
  };

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 rounded-3xl shadow-lg p-10 text-center max-w-2xl w-full md:w-2/3 lg:w-1/2 h-96 mx-auto flex flex-col justify-between mt-24">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Unlock Your Mood</h1>
        <p className="text-gray-600 mb-6">We use your camera to understand your emotional well-being</p>

        <div className="flex flex-col gap-4 mt-6 items-center">
          {/* Camera Button */}
          <button
            onClick={() => handleAction("/camera")}
            className="bg-blue-200 text-blue-600 font-semibold py-2 rounded-full flex items-center justify-center gap-2 w-72 border border-transparent hover:bg-blue-300"
          >
            <FaCamera size={20} />
            Allow Camera Access
          </button>

          {/* Chatbot Button */}
          <button
            onClick={() => handleAction("/chat")}
            className="bg-blue-200 text-green-600 font-semibold py-2 rounded-full flex items-center justify-center gap-2 w-72 border-4 border-white hover:bg-blue-300"
          >
            <IoChatbubbleOutline size={20} />
            Continue to Chatbot
          </button>
        </div>
      </div>

      {/* Login Modal */}
      {showAuth && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative w-full max-w-md">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-white text-2xl z-50"
              onClick={() => setShowAuth(false)}
            >
              &times;
            </button>

            {/* JoinUs Component */}
            <JoinUs handleLogin={handleLogin} onClose={() => setShowAuth(false)} />
          </div>
        </div>
      )}
    </>
  );
}
