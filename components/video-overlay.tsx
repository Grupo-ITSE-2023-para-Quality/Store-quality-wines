"use client";

import React, { useEffect, useState } from 'react';

const VideoOverlay: React.FC = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 320 && window.innerHeight <= 960);
    };

    handleResize(); // Check screen size on initial render
    window.addEventListener('resize', handleResize); // Add event listener for window resize

    return () => {
      window.removeEventListener('resize', handleResize); // Clean up event listener on component unmount
    };
  }, []);

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    margin: '0 auto',
    marginBottom: '40px',
  };

  const videoStyle: React.CSSProperties = {
    width: '100%',
    height: 'auto',
    display: 'block',
  };

  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
  };

  const textContainerStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '10px',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: isSmallScreen ? '1.5em' : '3em',
    marginBottom: '5px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 5)',
  };

  const subTitleStyle: React.CSSProperties = {
    fontSize: isSmallScreen ? '0.75em' : '1.5em',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 5)',
  };

  return (
    <div style={containerStyle}>
      <video style={videoStyle} autoPlay muted loop>
        <source src="https://videos.pexels.com/video-files/3189184/3189184-hd_1920_1080_25fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div style={overlayStyle}>
        <div style={textContainerStyle}>
          <div style={titleStyle}>Quality</div>
          <div style={subTitleStyle}>Wines & Delicatessen</div>
        </div>
      </div>
    </div>
  );
};

export default VideoOverlay;
