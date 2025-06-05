import React                                                  from 'react';

import './components.css';
import { FaUtensils, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3><FaUtensils /> Pixel Plate</h3>
          <p>
            We provide an easy and smart way to order food inside the restaurant.
            Enjoy a smooth dining experience with our digital ordering system.
          </p>
        </div>
        <div className="footer-section">
          <h3><FaMapMarkerAlt /> Location</h3>
          <p>123 Food Street, Tasty Town, Sri Lanka</p>
        </div>
        <div className="footer-section">
          <h3><FaPhoneAlt /> Contact</h3>
          <p><FaEnvelope /> pixelplate@restaurant.com</p>
          <p><FaPhoneAlt /> +94 77 123 4567</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} PixelPlate. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
