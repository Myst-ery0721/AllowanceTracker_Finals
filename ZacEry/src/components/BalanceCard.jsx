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

export default BalanceCard;