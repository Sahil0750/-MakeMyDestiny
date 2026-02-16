import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">🚗</span>
          <span className="logo-text">MakeMyDestiny</span>
        </Link>
        
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
              <span className="nav-icon">🏠</span> Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/trips" className="nav-link" onClick={() => setMenuOpen(false)}>
              <span className="nav-icon">🗺️</span> Explore Trips
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/calculator" className="nav-link" onClick={() => setMenuOpen(false)}>
              <span className="nav-icon">📊</span> Trip Calculator
            </Link>
          </li>
          
          {user ? (
            <>
              {user.role === 'admin' ? (
                <li className="nav-item">
                  <Link to="/admin" className="nav-link" onClick={() => setMenuOpen(false)}>
                    <span className="nav-icon">📊</span> Dashboard
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link to="/my-bookings" className="nav-link" onClick={() => setMenuOpen(false)}>
                    <span className="nav-icon">📋</span> My Bookings
                  </Link>
                </li>
              )}
              <li className="nav-item user-info">
                <span className="nav-link">
                  <span className="nav-icon">👤</span> {user.name}
                </span>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-btn logout-btn">
                  <span className="nav-icon">🚪</span> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link" onClick={() => setMenuOpen(false)}>
                  <span className="nav-icon">🔐</span> Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-btn register-btn" onClick={() => setMenuOpen(false)}>
                  <span className="nav-icon">📝</span> Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
