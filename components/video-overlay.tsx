"use client";

import React, { useEffect, useState } from "react";

const VideoOverlay: React.FC = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768); // Pantalla móvil (768px es el breakpoint estándar)
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    margin: "100px auto",
    marginTop: isSmallScreen ? "140px" : "120px", // Más espacio superior en móvil
    marginBottom: isSmallScreen ? "-10px" : "20px",  // Sin margen inferior en móvil
    borderRadius: "16px",
    overflow: "hidden",
  };

  const videoStyle: React.CSSProperties = {
    width: "100%",
    height: "auto",
    display: "block",
    borderRadius: "inherit",
  };

  const overlayStyle: React.CSSProperties = {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: "24px",
    fontWeight: "bold",
    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
    borderRadius: "inherit",
  };

  const textContainerStyle: React.CSSProperties = {
    textAlign: "center",
    padding: "10px", // Base padding para texto
  };

  const titleStyle: React.CSSProperties = {
    fontSize: isSmallScreen ? "1.5em" : "3em",
    marginBottom: "5px",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 5)",
  };

  const subTitleStyle: React.CSSProperties = {
    fontSize: isSmallScreen ? "0.75em" : "1.5em",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 5)",
  };

  return (
    <div className="p-4 sm:p-6 lg:p-1 rounded-xl overflow-hidden">
      <div style={containerStyle}>
        <video style={videoStyle} autoPlay muted loop>
          <source
            src="https://videos.pexels.com/video-files/3189184/3189184-hd_1920_1080_25fps.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div style={overlayStyle}>
          <div className="text-center gap-y-8 flex flex-col" style={textContainerStyle}>
            <div style={titleStyle}>Quality</div>
            <div style={subTitleStyle}>Wines & Delicatessen</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoOverlay;
