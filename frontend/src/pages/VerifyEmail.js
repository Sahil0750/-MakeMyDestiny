import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Auth.css';

const VerifyEmail = () => {
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/verify-email/${token}`
        );
        setStatus('success');
        setMessage(response.data.message);
        toast.success('Email verified successfully!');
        setTimeout(() => navigate('/login'), 3000);
      } catch (error) {
        setStatus('error');
        setMessage(error.response?.data?.message || 'Verification failed');
        toast.error('Email verification failed');
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token, navigate]);

  return (
    <div className="auth-container">
      <div className="auth-card">
        {status === 'verifying' && (
          <>
            <h2>🔄 Verifying Email</h2>
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <div className="loading">Please wait...</div>
            </div>
          </>
        )}

        {status === 'success' && (
          <>
            <h2>✅ Email Verified!</h2>
            <div className="verification-notice">
              <strong>{message}</strong>
              <p>Your email has been successfully verified. You can now login to your account.</p>
              <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#64748b' }}>
                Redirecting to login page in 3 seconds...
              </p>
            </div>
            <Link to="/login">
              <button className="auth-btn" style={{ marginTop: '1rem' }}>
                Go to Login
              </button>
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <h2>❌ Verification Failed</h2>
            <div className="verification-notice" style={{ borderLeftColor: '#ef4444' }}>
              <strong style={{ color: '#ef4444' }}>{message}</strong>
              <p>The verification link may be invalid or expired. Please try registering again or contact support.</p>
            </div>
            <Link to="/register">
              <button className="auth-btn" style={{ marginTop: '1rem' }}>
                Back to Register
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
