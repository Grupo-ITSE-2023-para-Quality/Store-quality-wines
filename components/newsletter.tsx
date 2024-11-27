"use client";

import Image from "next/image";
import React, { useState } from "react";
import { subscribe } from "@/app/api/subscribers/sendSubscriber";

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setMessage("Por favor ingresa un email válido.");
      return;
    }

    try {
      const response = await subscribe(email);

      if (response.ok) {
        setMessage("¡Gracias por suscribirte!");
        setEmail(""); // Limpiar el campo si es exitoso
      } else {
        // Leer el cuerpo de la respuesta para extraer el mensaje de error
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || 'No se pudo suscribir.'}`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage("Error al suscribirte. Por favor, intenta de nuevo.");
      }
    }
  };

  return (
    <div className="newsletter-container flex flex-col items-center p-4 border border-gray-300 rounded-md">
      <h2 className="text-2xl font-bold mb-4">Recibí nuestras ofertas</h2>

      {/* SVG de vino desde URL */}
      <div className="mb-4">
        <Image
          src="https://www.svgrepo.com/show/64327/wine.svg"
          alt="Vino"
          width={50}
          height={50}
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

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default Newsletter;
