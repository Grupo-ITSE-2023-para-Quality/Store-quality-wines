"use client";

import React, { useState, useEffect } from "react";

const AgeVerification: React.FC = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasVerified = localStorage.getItem("ageVerified");
    if (hasVerified === "true") {
      setIsVerified(true);
    }
    setIsLoading(false);
  }, []);

  const handleVerification = () => {
    localStorage.setItem("ageVerified", "true");
    setIsVerified(true);
  };

  if (isLoading) {
    return null;
  }

  if (isVerified) {
    return null;
  }

  const containerStyle: React.CSSProperties = {
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div
        className="bg-white p-8 rounded-lg text-center max-w-md mx-auto"
        style={containerStyle}
      >
        <p className="text-lg font-bold mb-4">
          Para poder acceder a nuestra tienda debes ser mayor de edad
        </p>
        <button
          className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition"
          onClick={handleVerification}
        >
          TENGO 18 AÑOS O MÁS
        </button>
      </div>
    </div>
  );
};

export default AgeVerification;
