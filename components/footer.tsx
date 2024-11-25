"use client";
import React from 'react';
import { Facebook, Instagram, Phone } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/100063888667566",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/qualitywines.ok/",
      label: "Instagram",
    },
    {
      icon: Phone,
      href: "https://wa.me/5493854085895",
      label: "WhatsApp",
    },
  ];

  return (
    <footer className="fixed bottom-0 w-full bg-gray-100 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50">
      <div className="container mx-auto">
        <div className="flex flex-col items-center space-y-4">
          {/* Social Links */}
          <div className="flex justify-center items-center space-x-6 md:space-x-8">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transform transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full p-2"
                aria-label={social.label}
              >
                <social.icon 
                  className="w-6 h-6 md:w-7 md:h-7 text-gray-600 hover:text-gray-900" 
                />
              </a>
            ))}
          </div>
          

        </div>
      </div>

      {/* Safe Area for Mobile Devices */}
      <div className="h-safe-area-inset-bottom bg-gray-100" />
    </footer>
  );
};

export default Footer;