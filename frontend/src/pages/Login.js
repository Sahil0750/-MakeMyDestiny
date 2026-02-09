import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(formData.email, formData.password);
      toast.success('Welcome back! Login successful!');
      if (data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/trips');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>&#127796; Welcome Back!</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <span className="input-icon">&#128231;</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <span className="input-icon">&#128274;</span>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
            <span 
              className="password-toggle" 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '&#128065;' : '&#128584;'}
            </span>
          </div>
          <button type="submit" className="auth-btn">Login Now</button>
        </form>
        <p className="auth-link">
          Don't have an account? <Link to="/register">Create Account</Link>
        </p>
        <div className="demo-credentials">
          <p><strong>&#128161; Demo Credentials:</strong></p>
          <p>&#128100; Admin: admin@makemydestiny.com / admin123</p>
          <p>&#128100; User: user@test.com / user123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
