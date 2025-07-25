import React from 'react';

const RecentTransactions = ({ transactions }) => {
  console.log('🔄 RecentTransactions rendering with:', {
    totalTransactions: transactions.length,
    firstTransaction: transactions[0]
  });

  // Check if transactions array is empty
  if (!transactions || transactions.length === 0) {
    return (
      <div className="transactions-container">
        <h3 className="transactions-title">Recent Transactions</h3>
        <div className="transaction-list">
          <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
            No transactions yet. Add your first transaction!
          </div>
        </div>
      </div>
    );
  }

  // Get the 5 most recent transactions (already sorted newest first from App.jsx)
  // Just take the first 5 - no need to slice(-5).reverse()
  const recentTransactions = transactions.slice(0, 5);

  console.log('📋 Showing recent transactions:', recentTransactions);

  return (
    <div className="transactions-container">
      <h3 className="transactions-title">Recent Transactions</h3>
      <div className="transaction-list">
        {recentTransactions.map(transaction => (
          <div key={transaction.id} className="transaction-item">
            <div className="transaction-details">
              <div className="transaction-icon">🏷️</div>
              <div className="transaction-info">
                <div className="transaction-description">{transaction.description}</div>
                <div className="transaction-meta">
                  {transaction.date} {transaction.time && `• ${transaction.time}`} • {transaction.category}
                </div>
              </div>
            </div>
            <div className={`transaction-amount ${transaction.type === 'income' ? 'income-text' : 'expense-text'}`}>
              {transaction.type === 'income' ? '+' : '-'}₱{transaction.amount.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;