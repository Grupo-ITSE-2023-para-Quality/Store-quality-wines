// src/components/VideoOverlay.js
import React from 'react';

const VideoOverlay: React.FC = () => {
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    fontSize: '3em',
    marginBottom: '5px',
  };

  const subTitleStyle: React.CSSProperties = {
    fontSize: '1.5em',
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
          <div style={subTitleStyle}>Wines and Delicatessen</div>
        </div>
      </div>
    </div>
  );
};

export default VideoOverlay;
