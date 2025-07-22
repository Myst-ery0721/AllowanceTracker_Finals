import React from 'react';

const RecentTransactions = ({ transactions }) => {
  return (
    <div className="transactions-container">
      <h3 className="transactions-title">Recent Transactions</h3>
      <div className="transaction-list">
        {transactions.slice(-5).reverse().map(transaction => (
          <div key={transaction.id} className="transaction-item">
            <div className="transaction-details">
              <div className="transaction-icon">🏷️</div>
              <div className="transaction-info">
                <div className="transaction-description">{transaction.description}</div>
                <div className="transaction-meta">{transaction.date} • {transaction.category}</div>
              </div>
            </div>
            <div className={`transaction-amount ₱{transaction.type === 'income' ? 'income-text' : 'expense-text'}`}>
              {transaction.type === 'income' ? '+' : '-'}₱{transaction.amount.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;