"use client";

import React, { useState } from "react";

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Aquí podrías realizar la lógica para enviar el email
      console.log("Email enviado:", email);
      setEmail("");
    } else {
      alert("Por favor ingresa un email válido.");
    }
  };

  return (
    <div className="newsletter-container flex flex-col items-center p-4 border border-gray-300 rounded-md">
      <h2 className="text-2xl font-bold mb-4">
        Recibí nuestras ofertas
      </h2>

      {/* SVG de vino desde URL */}
      <div className="mb-4">
        <img
          src="https://www.svgrepo.com/show/64327/wine.svg"
          alt="Vino"
          width="50"
          height="50"
          className="object-contain"
        />
      </div>

      {/* Formulario de suscripción */}
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="email"
          placeholder="Ingresa tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="p-2 bg-black text-white rounded-r-md hover:bg-gray-800 transition"
        >
          Suscribirse
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
