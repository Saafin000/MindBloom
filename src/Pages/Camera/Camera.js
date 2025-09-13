import React from "react";
import { useNavigate } from "react-router-dom";

export default function EmotionRecognition() {
  const navigate = useNavigate();

  const handleContinue = () => {
    // Navigate to Tracker page instead of Dashboard
    navigate("/tracker"); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-200 via-blue-100 to-green-200">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-10 w-[500px] max-w-full text-center flex flex-col items-center">
        
        {/* User Image */}
        <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow mb-6">
          <img
            src="/mnt/data/6de05b9a-ea93-4b76-9852-d2d621fc5148.jpg"
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Recognizing Emotion...
        </h1>

        {/* Detected Emotion */}
        <p className="text-gray-700 text-lg mb-1">
          You seem <span className="font-semibold text-red-500">STRESSED</span> 😟
        </p>
        <p className="text-gray-400 mb-6 text-sm">
          Based on facial micro-expressions
        </p>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className="bg-gradient-to-r from-purple-400 to-green-400 text-white font-semibold py-3 px-6 rounded-full hover:opacity-90 transition"
        >
          Continue to Tracker
        </button>
      </div>
    </div>
  );
}
