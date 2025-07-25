import React from 'react';
import BalanceCard from './BalanceCard';
import SummaryCards from './SummaryCards';
import RecentTransactions from './RecentTransactions';

const Dashboard = ({ balance, transactions, user }) => {
  // Add debugging to see when Dashboard re-renders
  console.log('🔄 Dashboard rendering with:', {
    balance,
    transactionsCount: transactions.length,
    transactions: transactions.slice(0, 3) // Show first 3 for debugging
  });

  return (
    <div className="page-container">
      <h2 className="page-title">Welcome back,</h2>
      <h1 className="user-name">
        <span className="highlight">{user?.displayName || 'Student'}</span>! 
      </h1>

      <BalanceCard balance={balance} />
      <SummaryCards transactions={transactions} />
      <RecentTransactions transactions={transactions} />
    </div>
  );
};

export default Dashboard;