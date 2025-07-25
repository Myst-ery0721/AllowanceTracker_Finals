import React from 'react';

const BalanceCard = ({ balance }) => {
  return (
    <div className="balance-card">
      <div className="balance-content">
        <div className="balance-icon">
          💰
        </div>
        <div className="balance-text">
          <div className="balance-label">Current Balance</div>
          <div className="balance-amount">₱{balance.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

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
    style={{ backgroundColor: '#bc4c4cff' }}
  >
    Logout ({user?.displayName || 'User'})
  </button>

  {/* ✅ Logo Image */}
  <img
    src="/logo.png"
    alt="Logo"
    className="navbar-logo"
  />
</div>


export default BalanceCard;