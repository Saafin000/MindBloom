import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";

export default function JoinUs({ redirectPath = "/home", onClose }) {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = async (type) => {
    try {
      const url =
        type === "login"
          ? "http://localhost:5000/login"
          : "http://localhost:5000/signup";

      const res = await axios.post(url, formData);

      if (res.data.success) {
        localStorage.setItem("token", res.data.token || "");

        // Dispatch login event for Navbar
        window.dispatchEvent(new Event("login"));

        // Close modal
        if (onClose) onClose();

        // Navigate to intended page
        navigate(redirectPath);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="relative bg-white p-10 rounded-3xl shadow-lg w-full max-w-md text-center">
        {/* Close button inside card */}
        <button
          className="absolute top-3 right-3 text-gray-500 text-2xl hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>

        <h1 className="text-2xl font-bold mb-6">
          {showLogin ? "Login" : "Sign Up"}
        </h1>

        {/* Form */}
        <div className="flex flex-col gap-4 mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2"
          />

          <button
            onClick={() => handleAuth(showLogin ? "login" : "signup")}
            className="bg-blue-500 text-white py-3 rounded-full hover:bg-blue-600"
          >
            {showLogin ? "Login" : "Sign Up"}
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-400 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Extra login/signup options */}
        <div className="flex flex-col gap-3 mb-4">
          <button className="flex items-center justify-center border border-gray-300 py-3 rounded-full hover:bg-gray-100">
            <FcGoogle size={20} className="mr-2" /> Continue with Google
          </button>
          <button className="flex items-center justify-center border border-gray-300 py-3 rounded-full hover:bg-gray-100">
            <FaApple size={20} className="mr-2" /> Continue with Apple
          </button>
          <button className="flex items-center justify-center border border-gray-300 py-3 rounded-full hover:bg-gray-100">
            <AiOutlineMail size={20} className="mr-2" /> Continue with Email
          </button>
        </div>

        {/* Switch between login/signup */}
        <p className="text-sm text-gray-500">
          {showLogin ? "New user?" : "Already have an account?"}{" "}
          <button
            onClick={() => setShowLogin(!showLogin)}
            className="text-blue-600 hover:underline"
          >
            {showLogin ? "Sign Up" : "Log In"}
          </button>
        </p>
      </div>
    </div>
  );
}
