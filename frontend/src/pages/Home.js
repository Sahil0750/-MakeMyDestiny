import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Discover India's Hidden Gems</h1>
          <p>From the hills of Jharkhand to beaches of Goa - Your journey begins here</p>
          <Link to="/trips" className="cta-btn">Explore Destinations</Link>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Why Choose MakeMyDestiny?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="icon">🏔️</div>
              <h3>20+ Destinations</h3>
              <p>Explore beautiful places across India including Jharkhand's best spots</p>
            </div>
            <div className="feature-card">
              <div className="icon">💰</div>
              <h3>Best Prices</h3>
              <p>Affordable packages starting from ₹5,500</p>
            </div>
            <div className="feature-card">
              <div className="icon">🔒</div>
              <h3>Secure Booking</h3>
              <p>Safe and encrypted payment process</p>
            </div>
            <div className="feature-card">
              <div className="icon">🤖</div>
              <h3>AI Assistant</h3>
              <p>24/7 chatbot support for all your queries</p>
            </div>
          </div>
        </div>
      </section>

      <section className="jharkhand-special">
        <div className="container">
          <h2>Explore Jharkhand 🌄</h2>
          <p className="subtitle">Discover the untouched beauty of Jharkhand</p>
          <div className="destinations-grid">
            <div className="dest-card">
              <h3>Netarhat</h3>
              <p>Queen of Chotanagpur - Stunning sunrises & sunsets</p>
            </div>
            <div className="dest-card">
              <h3>Deoghar</h3>
              <p>Baidyanath Dham - Sacred Jyotirlinga temple</p>
            </div>
            <div className="dest-card">
              <h3>Betla National Park</h3>
              <p>Wildlife sanctuary with tigers & elephants</p>
            </div>
            <div className="dest-card">
              <h3>Hundru Falls</h3>
              <p>98m waterfall near Ranchi</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to Start Your Journey?</h2>
          <p>Book your dream destination today!</p>
          <Link to="/trips" className="cta-btn-secondary">View All Trips</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
