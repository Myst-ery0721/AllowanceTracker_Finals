import React from 'react';

const SummaryCards = ({ transactions }) => {
  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="summary-grid">
      <div className="summary-card">
        <div className="summary-content">
          <div className="summary-icon">💵</div>
          <div className="summary-text">
            <h3>Total Income</h3>
            <div className="summary-amount income-amount">₱{totalIncome.toFixed(2)}</div>
          </div>
        </div>
      </div>
      
      <div className="summary-card">
        <div className="summary-content">
          <div className="summary-icon">📉</div>
          <div className="summary-text">
            <h3>Total Expenses</h3>
            <div className="summary-amount expense-amount">₱{totalExpenses.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;