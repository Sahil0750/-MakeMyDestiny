import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verificationToken, setVerificationToken] = useState(null);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await register(formData);
      if (response.verificationToken) {
        setVerificationToken(response.verificationToken);
        toast.success('Account created! Please verify your email.');
      } else {
        toast.success('Account created successfully!');
        navigate('/trips');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>🎉 Create Account</h2>
        {!verificationToken ? (
          <>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <span className="input-icon">📧</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <span className="input-icon">📞</span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <span className="input-icon">🔒</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password (min 6 characters)"
                  required
                  minLength="6"
                  disabled={loading}
                />
                <span 
                  className="password-toggle" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️🗨️'}
                </span>
              </div>
              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
            <p className="auth-link">
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </>
        ) : (
          <div className="verification-notice">
            <strong>✅ Registration Successful!</strong>
            <p>Your account has been created. In a production environment, you would receive a verification email.</p>
            <p style={{marginTop: '1rem'}}>For demo purposes, your verification token is: <code style={{background: '#f1f5f9', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.85rem'}}>{verificationToken}</code></p>
            <button 
              onClick={() => navigate('/login')} 
              className="auth-btn" 
              style={{marginTop: '1rem'}}
            >
              Continue to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
