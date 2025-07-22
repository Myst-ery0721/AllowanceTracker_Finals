import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, query, where, onSnapshot, addDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import './App.css';
import './Auth.css';

// Authentication Components
import Login from './components/Login';
import Register from './components/Register';
import Welcome from './components/Welcome';

// Main App Components
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import AddIncome from './components/AddIncome';
import AddExpense from './components/AddExpense';
import AllTransactions from './components/AllTransactions';

const App = () => {
  // Authentication states
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authMode, setAuthMode] = useState('login');
  const [showWelcome, setShowWelcome] = useState(false);

  // Main app states
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        
        // Check if user document exists, create if not
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (!userDoc.exists()) {
          await setDoc(doc(db, 'users', user.uid), {
            name: user.displayName || 'Student',
            email: user.email,
            createdAt: new Date().toISOString(),
            balance: 0,
            totalIncome: 0,
            totalExpenses: 0
          });
          setShowWelcome(true);
        }
        
        // Load user data
        loadUserData(user.uid);
      } else {
        setUser(null);
        setShowWelcome(false);
        setTransactions([]);
        setBalance(0);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Load user transactions and balance - FIXED VERSION (No index required)
  const loadUserData = (userId) => {
    // Simple query without orderBy to avoid index requirement
    const q = query(
      collection(db, 'transactions'), 
      where('userId', '==', userId)
      // Removed orderBy to avoid index requirement
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const transactionList = [];
      snapshot.forEach((doc) => {
        transactionList.push({ id: doc.id, ...doc.data() });
      });
      
      // Sort in JavaScript instead of Firestore (no index needed)
      transactionList.sort((a, b) => {
        const dateA = new Date(a.timestamp || a.date);
        const dateB = new Date(b.timestamp || b.date);
        return dateB - dateA; // Most recent first
      });
      
      setTransactions(transactionList);
      
      // Calculate balance
      const totalIncome = transactionList
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const totalExpenses = transactionList
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
      
      setBalance(totalIncome - totalExpenses);
    });

    return unsubscribe;
  };

  // Function to navigate between pages
  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  // Function to add new transaction - SIMPLIFIED
  const addTransaction = async (transaction) => {
    if (!user) {
      console.error('No user logged in');
      return false;
    }

    try {
      const newTransaction = {
        ...transaction,
        userId: user.uid,
        date: new Date().toISOString().split('T')[0],
        timestamp: new Date() // This will be a Timestamp in Firestore
      };
      
      // Add to Firestore
      const docRef = await addDoc(collection(db, 'transactions'), newTransaction);
      console.log('✅ Transaction saved with ID:', docRef.id);
      
      return true; // Success
    } catch (error) {
      console.error('❌ Error adding transaction:', error);
      return false; // Failed
    }
  };

  // Switch between login and register
  const switchToRegister = () => setAuthMode('register');
  const switchToLogin = () => setAuthMode('login');

  // Continue from welcome screen
  const continueToApp = () => setShowWelcome(false);

  // Simple routing function
  const renderPage = () => {
    switch(currentPage) {
      case 'add-income':
        return <AddIncome addTransaction={addTransaction} />;
      case 'add-expense':
        return <AddExpense addTransaction={addTransaction} balance={balance} />;
      case 'transactions':
        return <AllTransactions transactions={transactions} />;
      default:
        return <Dashboard balance={balance} transactions={transactions} user={user} />;
    }
  };

  // Show loading screen
  if (loading) {
    return (
      <div className="welcome-container">
        <div className="welcome-card">
          <h1 className="welcome-title">Loading... ⏳</h1>
          <p className="welcome-message">Please wait while we load your data</p>
        </div>
      </div>
    );
  }

  // Show authentication screens if not logged in
  if (!user) {
    return authMode === 'login' 
      ? <Login switchToRegister={switchToRegister} />
      : <Register switchToLogin={switchToLogin} />;
  }

  // Show welcome screen for new users
  if (showWelcome) {
    return <Welcome user={user} onContinue={continueToApp} />;
  }

  // Show main app
  return (
    <div className="app">
      <NavBar 
        currentPage={currentPage} 
        navigateTo={navigateTo} 
        user={user}
      />
      {renderPage()}
    </div>
  );
};

export default App;