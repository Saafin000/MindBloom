import React, { useState, useEffect } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import JoinUs from "../JoinUs/JoinUs";

export default function Navbar() {
  const [showAuth, setShowAuth] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [redirectPath, setRedirectPath] = useState("/home"); // default redirect after login
  const [showWelcome, setShowWelcome] = useState(false);
  const navigate = useNavigate();

  // Check login state and welcome message on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setLoggedIn(true);

    // Show welcome message only if not dismissed before
    const welcomeSeen = localStorage.getItem("welcomeSeen");
    if (!welcomeSeen) setShowWelcome(true);

    const handleLoginEvent = () => setLoggedIn(true);
    window.addEventListener("login", handleLoginEvent);

    return () => window.removeEventListener("login", handleLoginEvent);
  }, []);

  // Close welcome message permanently
  const handleCloseWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem("welcomeSeen", "true");
  };

  // Handle link click (Home, Journal, Community)
  const handleLinkClick = (path) => {
    if (!loggedIn) {
      setRedirectPath(path); // save the page user wants to visit
      setShowAuth(true); // open login/signup modal
    } else {
      navigate(path);
    }
  };

  // Handle user icon click
  const handleUserIconClick = () => {
    if (!loggedIn) {
      setRedirectPath("/home");
      setShowAuth(true);
    } else {
      navigate("/home");
    }
  };

  // Logout → redirect to LandingPage
  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/"); // redirect to landing page
  };

  return (
    <>
      <nav className="w-full fixed top-0 left-0 bg-white shadow-md px-8 py-4 flex justify-between items-center z-50">
        {/* Logo */}
        <div
          className="text-xl font-bold text-green-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          🌱 Mind Bloom
        </div>

        {/* Welcome Message (shows once) */}
        {showWelcome && (
          <div className="text-gray-700 font-medium italic hidden md:flex items-center">
            🌸 Welcome to Mind Bloom – Nurture your mind, embrace peace 🌸
            <button
              className="ml-4 text-gray-500 hover:text-gray-800 font-bold"
              onClick={handleCloseWelcome}
            >
              &times;
            </button>
          </div>
        )}

        {/* Links + User Icon / Logout */}
        <div className="flex items-center gap-6">
          <ul className="flex gap-8 text-gray-600 font-medium">
            <li
              onClick={() => handleLinkClick("/home")}
              className="hover:text-green-600 cursor-pointer"
            >
              Home
            </li>
            <li
              onClick={() => handleLinkClick("/journal")}
              className="hover:text-green-600 cursor-pointer"
            >
              Journal
            </li>
            <li
              onClick={() => handleLinkClick("/community")}
              className="hover:text-green-600 cursor-pointer"
            >
              Community
            </li>
          </ul>

          {/* If logged in → Show Logout | else → Show User Icon */}
          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <button
              className="text-gray-600 hover:text-green-600 cursor-pointer text-2xl"
              onClick={handleUserIconClick}
            >
              <IoPersonOutline />
            </button>
          )}
        </div>
      </nav>

      {/* Login/Signup Modal */}
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
            <JoinUs
              redirectPath={redirectPath}
              onClose={() => setShowAuth(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
