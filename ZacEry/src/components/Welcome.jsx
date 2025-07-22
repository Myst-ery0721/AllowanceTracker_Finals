import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Welcome = ({ user, onContinue }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <h1 className="welcome-title">Welcome, {user?.displayName || 'Student'}! 🎉</h1>
        <p className="welcome-message">
          You're all set to start tracking your allowance and expenses. 
          Take control of your finances and make smart spending decisions!
        </p>
        
        <div>
          <button className="welcome-button" onClick={onContinue}>
            Start Tracking 💰
          </button>
          <button className="welcome-button logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
        
        <div style={{ marginTop: '24px', fontSize: '14px', color: '#6b7280' }}>
          <p>📱 Track your daily expenses</p>
          <p>💵 Monitor your allowance</p>
          <p>📊 View spending summaries</p>
          <p>🎯 Make better financial decisions</p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;