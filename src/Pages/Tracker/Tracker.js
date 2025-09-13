import React, { useState, useEffect } from "react";

export default function Tracker() {
  const [stressLevel, setStressLevel] = useState(50);
  const [stressHistory, setStressHistory] = useState([
    40, 56, 30, 65, 49, 60, 50,
  ]);
  const [mood, setMood] = useState("good");
  const [stressCategory, setStressCategory] = useState("Moderate");
  const [sentiment, setSentiment] = useState(62);
  const [reliefModal, setReliefModal] = useState({
    open: false,
    title: "",
    body: "",
  });

  // Helpers
  const getStressCategory = (val) =>
    val <= 33 ? "Low" : val <= 66 ? "Moderate" : "High";
  const getStressColor = (val) =>
    val <= 33 ? "#4cd964" : val <= 66 ? "#fae254" : "#fb9c39";

  // Sync category + sentiment
  useEffect(() => {
    setStressCategory(getStressCategory(stressLevel));
  }, [stressLevel]);

  useEffect(() => {
    let score = 62;
    if (stressCategory === "Low") score += 6;
    if (stressCategory === "High") score -= 8;
    if (mood === "good") score += 5;
    if (mood === "bad") score -= 10;
    setSentiment(score);
  }, [stressCategory, mood]);

  // Stress history chart
  const getStressGraphPoints210 = (data) => {
    const startX = 10,
      endX = 200,
      minY = 10,
      maxY = 50;
    const step = (endX - startX) / Math.max(1, data.length - 1);
    return data.map((v, i) => {
      const x = startX + i * step;
      const y = maxY - (v / 100) * (maxY - minY);
      return [x, y];
    });
  };
  const stressPoints = getStressGraphPoints210(stressHistory);

  // Relief activities
  const reliefActivities = {
    meditationBtn: {
      title: "Meditation",
      body: "Sit comfortably, close your eyes, and focus on your breath for 2 minutes.",
    },
    progressiveBtn: {
      title: "Progressive Relaxation",
      body: "Tense and relax each muscle group from toes upward.",
    },
    walkBtn: {
      title: "Take a Walk",
      body: "Go outside and walk for 10 minutes, notice your surroundings.",
    },
    musicBtn: {
      title: "Listen to Music",
      body: "Play your favorite calming playlist.",
    },
    breathingBtn: {
      title: "Breathing Exercise",
      body: "Inhale 4s, hold 4s, exhale 4s. Repeat 5 times.",
    },
    stretchBtn: {
      title: "Stretch",
      body: "Stretch arms overhead, reach for toes. Repeat gently.",
    },
    talkBtn: {
      title: "Talk to a Friend",
      body: "Call or chat with someone you trust.",
    },
    hydrateBtn: {
      title: "Hydrate",
      body: "Drink a glass of water to refresh your body.",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100 p-6 flex justify-center">
      <div className="max-w-5xl w-full">
        <h1 className="text-center text-3xl font-bold mb-6 text-gray-900">
          Stress Management
        </h1>

        {/* Gauge + History */}
        <div className="flex flex-wrap gap-6 justify-center mb-6">
          {/* Gauge */}
          <div className="bg-white rounded-xl shadow-md p-5 flex flex-col items-center min-w-[220px] max-w-sm flex-1">
            <div className="text-sm font-semibold text-blue-600 mb-2">
              STRESS LEVEL
            </div>
            <div className="relative w-[200px] h-[110px]">
              <svg width="200" height="110">
                <defs>
                  <linearGradient id="gaugeGrad">
                    <stop offset="0%" stopColor="#4cd964" />
                    <stop offset="47%" stopColor="#f7fa57" />
                    <stop offset="100%" stopColor="#fb9c39" />
                  </linearGradient>
                </defs>
                <path
                  d="M20,90 A80,80 0 0,1 180,90"
                  stroke="url(#gaugeGrad)"
                  strokeWidth="14"
                  fill="none"
                />
              </svg>
              <svg className="absolute top-0 left-0" width="200" height="110">
                <line
                  x1="100"
                  y1="90"
                  x2={
                    100 +
                    59 *
                      Math.sin(
                        ((-90 + (stressLevel / 100) * 180) * Math.PI) / 180
                      )
                  }
                  y2={
                    90 -
                    59 *
                      Math.cos(
                        ((-90 + (stressLevel / 100) * 180) * Math.PI) / 180
                      )
                  }
                  stroke="#292e36"
                  strokeWidth="6"
                  strokeLinecap="round"
                  style={{
                    transition: "all 1.1s cubic-bezier(0.8,0.2,0.25,1)",
                  }}
                />
              </svg>
              <span
                className="absolute w-3.5 h-3.5 rounded-full border-2 border-white"
                style={{
                  left: "100px",
                  top: "90px",
                  marginLeft: "-7px",
                  marginTop: "-7px",
                  background: getStressColor(stressLevel),
                }}
              ></span>
            </div>

            {/* Controls */}
            <div className="flex gap-3 mt-3 items-center">
              <button
                onClick={() => setStressLevel((prev) => Math.max(0, prev - 7))}
                className="px-3 py-2 rounded-lg bg-gradient-to-r from-blue-400 to-purple-400 text-white font-semibold"
              >
                - Decrease
              </button>
              <span className="font-bold text-gray-800">{stressLevel}</span>
              <button
                onClick={() =>
                  setStressLevel((prev) => Math.min(100, prev + 7))
                }
                className="px-3 py-2 rounded-lg bg-gradient-to-r from-blue-400 to-purple-400 text-white font-semibold"
              >
                + Increase
              </button>
            </div>

            {/* Preset Buttons */}
            <div className="flex gap-2 mt-2">
              {["Low", "Moderate", "High"].map((cat, idx) => (
                <button
                  key={cat}
                  onClick={() =>
                    setStressLevel(idx === 0 ? 0 : idx === 1 ? 50 : 100)
                  }
                  className={`px-3 py-2 rounded-lg font-semibold ${
                    stressCategory === cat
                      ? "bg-gray-100 text-blue-400 shadow"
                      : "bg-gradient-to-r from-blue-400 to-purple-400 text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div
              className="mt-2 font-semibold text-lg"
              style={{ color: getStressColor(stressLevel) }}
            >
              {stressCategory}
            </div>
          </div>

          {/* History */}
          <div className="bg-white rounded-xl shadow-md p-5 flex flex-col items-center min-w-[220px] max-w-sm flex-1">
            <div className="text-sm font-semibold text-blue-600 mb-2">
              STRESS HISTORY
            </div>
            <svg width="210" height="60">
              <polyline
                points={stressPoints.map(([x, y]) => `${x},${y}`).join(" ")}
                fill="none"
                stroke="#ffba49"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {stressPoints.length > 0 && (
                <circle
                  r="5"
                  fill="#ffba49"
                  stroke="#fff"
                  strokeWidth="2"
                  cx={stressPoints[stressPoints.length - 1][0]}
                  cy={stressPoints[stressPoints.length - 1][1]}
                />
              )}
            </svg>
            <button
              onClick={() => {
                const nextVal = Math.floor(Math.random() * 56) + 25;
                setStressHistory((prev) => {
                  const arr = [...prev, nextVal];
                  if (arr.length > 7) arr.shift();
                  return arr;
                });
              }}
              className="mt-3 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-400 to-purple-400 text-white font-semibold"
            >
              Add New Data
            </button>
          </div>
        </div>

        {/* Sentiment */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-xl shadow-md p-4 w-40 text-center">
            <div className="text-sm font-semibold text-gray-700">Sentiment</div>
            <div className="text-3xl font-bold text-gray-800">{sentiment}</div>
          </div>
        </div>

        {/* Assessment */}
        <div className="bg-white rounded-xl shadow-md p-5 mb-6 max-w-2xl mx-auto">
          <div className="flex justify-between mb-3">
            <div className="font-bold text-lg">Quick Assessment</div>
            <div className="text-blue-400 font-medium">
              Sentiment: {sentiment + 6}
            </div>
          </div>
          <div className="mb-2">How stressed do you feel right now?</div>
          <div className="flex gap-2 justify-center mb-4">
            {["Low", "Moderate", "High"].map((cat, idx) => (
              <button
                key={cat}
                onClick={() =>
                  setStressLevel(idx === 0 ? 0 : idx === 1 ? 50 : 100)
                }
                className={`px-3 py-2 rounded-lg font-semibold ${
                  stressCategory === cat
                    ? "bg-gray-100 text-blue-400 shadow"
                    : "bg-gradient-to-r from-blue-400 to-purple-400 text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="mb-2">What's your mood today?</div>
          <div className="flex gap-2 justify-center">
            {["good", "okay", "bad"].map((m) => (
              <button
                key={m}
                onClick={() => setMood(m)}
                className={`px-3 py-2 rounded-lg font-semibold ${
                  mood === m
                    ? "bg-gray-100 text-blue-400 shadow"
                    : "bg-gradient-to-r from-blue-400 to-purple-400 text-white"
                }`}
              >
                {m === "good" ? "😊 Good" : m === "okay" ? "😐 Okay" : "☹ Bad"}
              </button>
            ))}
          </div>
        </div>

        {/* Relief */}
        <div className="bg-white rounded-xl shadow-md p-5 max-w-2xl mx-auto">
          <div className="font-bold text-lg mb-3">Stress Relief</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {Object.entries(reliefActivities).map(([id, { title, body }]) => (
              <button
                key={id}
                className="p-3 rounded-lg flex flex-col items-center bg-blue-50 hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:text-white transition"
                onClick={() => setReliefModal({ open: true, title, body })}
              >
                <span className="text-2xl">{title[0]}</span>
                <span>{title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Modal */}
        {reliefModal.open && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            onClick={() => setReliefModal({ open: false, title: "", body: "" })}
          >
            <div
              className="bg-white rounded-xl p-6 shadow-lg max-w-sm w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-3 text-gray-400 text-xl"
                onClick={() =>
                  setReliefModal({ open: false, title: "", body: "" })
                }
              >
                &times;
              </button>
              <h2 className="font-bold text-xl mb-2">{reliefModal.title}</h2>
              <p>{reliefModal.body}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
