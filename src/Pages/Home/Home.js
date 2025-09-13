import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Feature from "../LandingPage/Features";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Fetch user profile from backend
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/joinus"); // redirect if not logged in
      return;
    }

    axios
      .get("http://localhost:5000/profile", {
        headers: { Authorization: token },
      })
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.user);
        } else {
          navigate("/joinus");
        }
      })
      .catch(() => navigate("/joinus"));
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-purple-100 to-green-100">
      <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-10 w-[700px] max-w-full">
        
        {/* Dashboard Section */}
        <div className="bg-gradient-to-r from-indigo-200 via-sky-100 to-green-100 rounded-2xl p-6 flex items-center space-x-6 mb-8 shadow-md">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Hello, {user ? user.email.split("@")[0] : "Loading..."}
            </h2>
            <p className="text-gray-600 mt-2 text-lg">You seem stressed.</p>
          </div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW6DBpQ7z1YI9YkxqHRiBsFWIzZU1Mo11EGA&s"
            alt="User"
            className="w-20 h-20 rounded-full border-4 border-white shadow"
            style={{ marginLeft: "300px" }}
          />
        </div>

        {/* Emotion Recognition Card */}
        <div className="bg-white rounded-2xl p-5 flex shadow-md mb-6 gap-6">
          {/* Left box */}
          <div className="flex items-center space-x-3 border border-gray-200 rounded-3xl p-4 flex-1">
            <span className="text-2xl">😊</span>
            <p className="text-gray-600">Recognizing Emotion...</p>
          </div>

          {/* Right box */}
          <div className="border border-gray-200 rounded-3xl p-4 flex-1 bg-indigo-50 text-indigo-600 font-medium flex items-center gap-2">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeHhP1YBHU3kgn2pHyq1Jo0W37zv81doOK0Q&s"
              alt="Motivation"
              className="w-10 h-10"
            />
            Hey there! Weren’t stress-free lately?
          </div>
        </div>

        {/* Features Section */}
        <Feature />
      </div>
    </div>
  );
};

export default Home;
