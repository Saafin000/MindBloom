import React, { useState} from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { SiPivotaltracker } from "react-icons/si";
import { MdOutlineGroupAdd } from "react-icons/md";
import { IoIosJournal } from "react-icons/io";
import JoinUs from "../JoinUs/JoinUs";
import { useNavigate } from "react-router-dom";

export default function Features() {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  const [showAuth, setShowAuth] = useState(false);
  const [redirectPath, setRedirectPath] = useState("/"); // default redirect
  const navigate = useNavigate();

  const handleFeatureClick = (path) => {
    if (!loggedIn) {
      setRedirectPath(path);
      setShowAuth(true);
    } else {
      navigate(path);
    }
  };

  const handleLogin = () => {
    setLoggedIn(true);
    setShowAuth(false);
    navigate(redirectPath);
  };

  return (
    <>
      <div
        className="bg-gray-100 p-6 max-w-3xl w-full mx-auto mt-10 shadow-lg"
        style={{ borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }}
      >
        <p className="text-gray-800 text-center text-xl font-bold mb-6">
          🌱 Physio Pro
        </p>

        <div className="flex justify-between text-center">
          <div
            onClick={() => handleFeatureClick("/chat")}
            className="flex flex-col items-center cursor-pointer hover:opacity-80"
          >
            <IoChatbubbleEllipsesOutline
              size={32}
              className="text-blue-500 mb-2"
            />
            <p className="text-gray-700 font-semibold">PurrsonaTalk</p>
          </div>

          <div
            onClick={() => handleFeatureClick("/tracker")}
            className="flex flex-col items-center cursor-pointer hover:opacity-80"
          >
            <SiPivotaltracker size={32} className="text-green-500 mb-2" />
            <p className="text-gray-700 font-semibold">Stress Tracker</p>
          </div>

          <div
            onClick={() => handleFeatureClick("/community")}
            className="flex flex-col items-center cursor-pointer hover:opacity-80"
          >
            <MdOutlineGroupAdd size={32} className="text-purple-500 mb-2" />
            <p className="text-gray-700 font-semibold">Community Group</p>
          </div>

          <div
            onClick={() => handleFeatureClick("/journal")}
            className="flex flex-col items-center cursor-pointer hover:opacity-80"
          >
            <IoIosJournal size={32} className="text-pink-500 mb-2" />
            <p className="text-gray-700 font-semibold">My Diary</p>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showAuth && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative w-full max-w-md">
            <button
              className="absolute top-2 right-2 text-white text-2xl z-50"
              onClick={() => setShowAuth(false)}
            >
              &times;
            </button>

            <JoinUs handleLogin={handleLogin} />
          </div>
        </div>
      )}
    </>
  );
}
