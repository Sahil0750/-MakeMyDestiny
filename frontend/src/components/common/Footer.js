import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-logo">
            <span className="footer-icon">&#9992;</span>
            MakeMyDestiny
          </h3>
          <p className="footer-desc">
            Your trusted travel partner for exploring India's most beautiful destinations. 
            From Jharkhand's hidden gems to iconic landmarks across the country.
          </p>
          <div className="social-links">
            <a href="#" className="social-icon">&#128216;</a>
            <a href="#" className="social-icon">&#128247;</a>
            <a href="#" className="social-icon">&#128038;</a>
            <a href="#" className="social-icon">&#128250;</a>
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
            <li><a href="#">Netarhat, Jharkhand</a></li>
            <li><a href="#">Manali, Himachal</a></li>
            <li><a href="#">Goa Beaches</a></li>
            <li><a href="#">Kerala Backwaters</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul className="footer-contact">
            <li>&#128231; support@makemydestiny.com</li>
            <li>&#128222; +91 98765 43210</li>
            <li>&#128205; Ranchi, Jharkhand, India</li>
            <li>&#128336; Mon - Sat: 9AM - 6PM</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-container">
          <p>&copy; 2024 MakeMyDestiny. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#">Terms of Service</a>
            <span>&bull;</span>
            <a href="#">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
