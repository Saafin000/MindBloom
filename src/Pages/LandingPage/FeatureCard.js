import React from "react";

export default function FeatureCard({ title }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 text-center hover:shadow-md cursor-pointer">
      <p className="font-medium text-gray-700">{title}</p>
    </div>
  );
}
