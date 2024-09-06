// src/components/Legales.tsx
import React from "react";

const Legales = () => {
  return (
    <div className="text-center font-small mb-10 mt-4">
      <div className="mb-2">
        Copyright Quality Wines - 2024. Todos los derechos reservados.
      </div>
      <div className="mt-2">
        <span className="d-inline-block mb-2">
          Defensa de las y los consumidores. Para reclamos  
        </span>
        <a
          className="font-weight-bold"
          href="https://www.argentina.gob.ar/produccion/defensadelconsumidor/formulario"
          target="_blank"
          rel="noopener noreferrer"
          data-component="consumer-defense"
          style={{ display: "inline-block", marginBottom: "20px" }} // Ajustar el margen aquí
        >
          ingresá aquí.
        </a>
      </div>
    </div>
  );
};

export default Legales;