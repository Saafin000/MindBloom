import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import axios from "axios";

export default function EmotionRecognition() {
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const [emotion, setEmotion] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  const captureAndPredict = async () => {
    const img = webcamRef.current.getScreenshot(); // base64
    setImageSrc(img);
    try {
      const res = await axios.post("http://localhost:8000/predict-emotion", {
        image: img,
      });
      setEmotion(res.data.emotion);

      // Save emotion & face in localStorage
      localStorage.setItem("detectedEmotion", res.data.emotion);
      localStorage.setItem("capturedFace", img);

    } catch (err) {
      console.error(err);
    }
  };

  const handleContinue = () => {
    navigate("/home"); // Redirect to Home
  };

  const handleRetake = () => {
    setEmotion(null);
    setImageSrc(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-200 via-blue-100 to-green-200">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-10 w-[500px] max-w-full text-center flex flex-col items-center">
        
        {/* Live Camera */}
        {!imageSrc && (
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={200}
            height={200}
            videoConstraints={{ facingMode: "user" }}
            className="rounded-full border-4 border-white shadow mb-6"
          />
        )}

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          {emotion ? "Emotion Detected!" : "Recognizing Emotion..."}
        </h1>

        {/* Show prediction or buttons */}
        {emotion ? (
          <>
            <p className="text-gray-700 text-lg mb-1">
              You seem <span className="font-semibold text-purple-600">{emotion}</span>
            </p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleRetake}
                className="bg-yellow-400 text-white font-semibold py-3 px-6 rounded-full hover:opacity-90 transition"
              >
                Retake
              </button>
              <button
                onClick={handleContinue}
                className="bg-gradient-to-r from-purple-400 to-green-400 text-white font-semibold py-3 px-6 rounded-full hover:opacity-90 transition"
              >
                Continue to Tracker
              </button>
            </div>
          </>
        ) : (
          <button
            onClick={captureAndPredict}
            className="bg-indigo-500 text-white px-6 py-3 rounded-full shadow hover:opacity-90 transition"
          >
            Detect Emotion
          </button>
        )}
      </div>
    </div>
  );
}
