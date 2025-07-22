import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Login = ({ switchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // User will be redirected automatically by the auth state listener
    } catch (error) {
      console.error('Login error:', error);
      
      // Simple error messages for beginners
      switch (error.code) {
        case 'auth/user-not-found':
          setError('No account found with this email');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email');
          break;
        case 'auth/too-many-requests':
          setError('Too many failed attempts. Please try again later');
          break;
        default:
          setError('Login failed. Please try again');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Welcome Back! ✨</h1>
        <p className="auth-subtitle">Sign in to your allowance tracker</p>
        
        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="auth-form">
          <div className="auth-input-group">
            <label className="auth-label">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
              placeholder="Enter your email"
              disabled={loading}
            />
          </div>

          <div className="auth-input-group">
            <label className="auth-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading && <span className="auth-loading"></span>}
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-switch">
          <span className="auth-switch-text">
            Don't have an account?{' '}
            <span className="auth-switch-link" onClick={switchToRegister}>
              Sign up here
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;