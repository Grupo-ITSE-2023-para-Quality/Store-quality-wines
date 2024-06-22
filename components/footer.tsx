// src/components/Footer.js
import React from 'react';
import { Facebook, Instagram, Phone } from 'lucide-react';

const Footer = () => {
  const footerStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#f1f1f1',
    padding: '10px 0',
  };

  const iconContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  };

  return (
    <footer style={footerStyle}>
      <div style={iconContainerStyle}>
        <a href="https://www.facebook.com/100063888667566" target="_blank" rel="noopener noreferrer">
          <Facebook size={24} />
        </a>
        <a href="https://www.instagram.com/qualitywines.ok/" target="_blank" rel="noopener noreferrer">
          <Instagram size={24} />
        </a>
        <a href="https://wa.me/5493854085895" target="_blank" rel="noopener noreferrer">
          <Phone size={24} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
