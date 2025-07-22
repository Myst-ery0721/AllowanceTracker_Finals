import React from 'react';

const AllTransactions = ({ transactions }) => {
  return (
    <div className="page-container">
      <h1 className="page-title">All Transactions</h1>
      
      <div className="all-transactions-container">
        <div className="transaction-list">
          {transactions.map(transaction => (
            <div key={transaction.id} className="all-transaction-item">
              <div className="transaction-details">
                <div className="transaction-icon">🏷️</div>
                <div className="transaction-info">
                  <div className="transaction-description">{transaction.description}</div>
                  <div className="transaction-meta">
                    {transaction.date} • {transaction.category}
                  </div>
                </div>
              </div>
              <div className={`transaction-amount ₱{transaction.type === 'income' ? 'income-text' : 'expense-text'}`}>
                {transaction.type === 'income' ? '+' : '-'}₱{transaction.amount.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllTransactions;