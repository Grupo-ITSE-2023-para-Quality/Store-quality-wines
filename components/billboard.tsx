import { Billboard as BillboardType } from "@/types";
import React from "react";

interface BillboardProps {
  data: BillboardType;
  height?: string; // Nueva prop para controlar la altura
}

const Billboard: React.FC<BillboardProps> = ({ data, height = "300px" }) => {
  const textShadowStyle: React.CSSProperties = {
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  };

  return (
    <div className="p-4 sm:p-6 lg:p-1 rounded-xl overflow-hidden">
      <div
        className="rounded-xl relative overflow-hidden bg-cover"
        style={{
          backgroundImage: `url(${data?.imageUrl})`,
          height: height, // Aplicamos la altura recibida
        }}
      >
        <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
          <div
            className="font-bold text-3x sm:text-2xl lg:text-4xl sm:max-w-xl max-w-xs"
            style={{ color: "white", ...textShadowStyle }}
          >
            {data.label}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
