// components/Dashboard.js
import React from 'react';
import BalanceCard from './BalanceCard';
import SummaryCards from './SummaryCards';
import RecentTransactions from './RecentTransactions';

const Dashboard = ({ balance, transactions, user }) => {
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