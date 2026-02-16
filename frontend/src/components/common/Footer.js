import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const navigate = useNavigate();

  const handleDestinationClick = (destination) => {
    navigate(`/trips?search=${encodeURIComponent(destination)}`);
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-logo">
            <span className="footer-icon">✈️</span>
            MakeMyDestiny
          </h3>
          <p className="footer-desc">
            Your trusted travel partner for exploring India's most beautiful destinations. 
            From Jharkhand's hidden gems to iconic landmarks across the country.
          </p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">📘</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">📷</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter">🐦</a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="YouTube">📺</a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/trips">Explore Trips</Link></li>
            <li><Link to="/my-bookings">My Bookings</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Popular Destinations</h4>
          <ul className="footer-links">
            <li><button onClick={() => handleDestinationClick('Netarhat')} className="link-button">Netarhat, Jharkhand</button></li>
            <li><button onClick={() => handleDestinationClick('Manali')} className="link-button">Manali, Himachal</button></li>
            <li><button onClick={() => handleDestinationClick('Goa')} className="link-button">Goa Beaches</button></li>
            <li><button onClick={() => handleDestinationClick('Kerala')} className="link-button">Kerala Backwaters</button></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul className="footer-contact">
            <li>📧 mdsahilansari831@gmail.com</li>
            <li>📞 +91 9523176285</li>
            <li>📍 Ranchi, Jharkhand, India</li>
            <li>🕐 Mon - Sat: 9AM - 6PM</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-container">
          <p>&copy; 2024 MakeMyDestiny. All rights reserved by Md Sahil Ansari.</p>
          <div className="footer-bottom-links">
            <Link to="/">Privacy Policy</Link>
            <span>&bull;</span>
            <Link to="/">Terms of Service</Link>
            <span>&bull;</span>
            <Link to="/">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
