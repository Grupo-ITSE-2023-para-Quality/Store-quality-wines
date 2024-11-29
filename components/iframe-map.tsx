"use client";
import React from 'react';

const IframeMap: React.FC = () => {
  return (
    <div className="w-full px-4 md:px-6 py-8 pb-16 md:pb-20">
      {/* Título */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">
        Dónde encontrarnos
      </h2>

      {/* Contenedor principal */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Dirección */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <div className="text-lg md:text-2xl space-y-2 text-center md:text-left">
              <p>Independencia 6100</p>
              <p>Esq. Virgen de Guadalupe</p>
              <p>Local 6</p>
              <p>Santiago del Estero, Argentina</p>
              <p>Martes a Domingo de 19:00 a 22:00</p>
            </div>
          </div>

          {/* Contenedor del Mapa */}
          <div className="w-full md:w-1/2">
            <div className="relative w-full h-0 pb-[75%] md:pb-[100%]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3527.916584577277!2d-64.2325450236509!3d-27.843101132720776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x943b4f28c726c2a3%3A0x3e28d5d7a1dfeabb!2sQUALITY%20wines%20%26%20delicatessen!5e0!3m2!1sen!2sar!4v1719083435393!5m2!1sen!2sar"
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IframeMap;
