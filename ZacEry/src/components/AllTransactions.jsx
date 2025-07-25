import React, { useState, useMemo } from 'react';
import '../App.css';

const AllTransactions = ({ transactions }) => {
  const [sortOrder, setSortOrder] = useState('recent'); // 'recent', 'oldest', 'amount-desc', 'amount-asc'

  const sortedTransactions = useMemo(() => {
    const sorted = [...transactions];
    
    switch (sortOrder) {
      case 'recent':
        return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
      case 'amount-desc':
        return sorted.sort((a, b) => b.amount - a.amount);
      case 'amount-asc':
        return sorted.sort((a, b) => a.amount - b.amount);
      default:
        return sorted;
    }
  }, [transactions, sortOrder]);

  return (
    <div className="page-container">
      <br></br>
      <br></br>
      <br></br>
      <h1 className="user-name"><span className="highlight">All Transactions</span></h1>
      <br></br>
      
      {/* Filter Controls */}
      <div className="filter-container">
        <div className="filter-group">
          <label className="filter-label">Sort by:</label>
          <select 
            value={sortOrder} 
            onChange={(e) => setSortOrder(e.target.value)}
            className="filter-select"
          >
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest First</option>
            <option value="amount-desc">Amount (High to Low)</option>
            <option value="amount-asc">Amount (Low to High)</option>
          </select>
        </div>
      </div>
      
      <div className="all-transactions-container">
        <div className="transaction-list">
          {sortedTransactions.map(transaction => (
            <div key={transaction.id} className="all-transaction-item">
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
    </div>
  );
};

export default AllTransactions;