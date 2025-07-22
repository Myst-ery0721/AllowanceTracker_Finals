import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const Register = ({ switchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      
      const user = userCredential.user;

      // Update user profile with name
      await updateProfile(user, {
        displayName: formData.name
      });

      // Create user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name: formData.name,
        email: formData.email,
        createdAt: new Date().toISOString(),
        balance: 0,
        totalIncome: 0,
        totalExpenses: 0
      });

      // User will be redirected automatically by the auth state listener
    } catch (error) {
      console.error('Registration error:', error);
      
      // Simple error messages for beginners
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('An account with this email already exists');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address');
          break;
        case 'auth/weak-password':
          setError('Password is too weak. Please choose a stronger password');
          break;
        default:
          setError('Registration failed. Please try again');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Create Account ✨</h1>
        <p className="auth-subtitle">Start tracking your allowance today!</p>
        
        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="auth-form">
          <div className="auth-input-group">
            <label className="auth-label">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="auth-input"
              placeholder="Enter your full name"
              disabled={loading}
            />
          </div>

          <div className="auth-input-group">
            <label className="auth-label">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="auth-input"
              placeholder="Enter your email"
              disabled={loading}
            />
          </div>

          <div className="auth-input-group">
            <label className="auth-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="auth-input"
              placeholder="Choose a password (min 6 characters)"
              disabled={loading}
            />
          </div>

          <div className="auth-input-group">
            <label className="auth-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="auth-input"
              placeholder="Confirm your password"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading && <span className="auth-loading"></span>}
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-switch">
          <span className="auth-switch-text">
            Already have an account?{' '}
            <span className="auth-switch-link" onClick={switchToLogin}>
              Sign in here
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;