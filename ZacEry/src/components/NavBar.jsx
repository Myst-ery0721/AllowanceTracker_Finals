// components/NavBar.js
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const NavBar = ({ currentPage, navigateTo, user }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <button
          onClick={() => navigateTo('dashboard')}
          className={`nav-button ${currentPage === 'dashboard' ? 'active' : ''}`}
        >
          Dashboard
        </button>
        <button
          onClick={() => navigateTo('add-income')}
          className={`nav-button ${currentPage === 'add-income' ? 'active' : ''}`}
        >
          Add Income
        </button>
        <button
          onClick={() => navigateTo('add-expense')}
          className={`nav-button ${currentPage === 'add-expense' ? 'active' : ''}`}
        >
          Add Expense
        </button>
        <button
          onClick={() => navigateTo('transactions')}
          className={`nav-button ${currentPage === 'transactions' ? 'active' : ''}`}
        >
          All Transactions
        </button>
        <button
          onClick={handleLogout}
          className="nav-button"
          style={{ marginLeft: 'auto', backgroundColor: '#bc4c4cff' }}
        >
          Logout ({user?.displayName || 'User'})
        </button>
      </div>
    </div>
  );
};

export default NavBar;