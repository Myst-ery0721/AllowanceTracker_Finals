import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, query, where, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
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

  // FIXED: Load user transactions and balance with better error handling
  const loadUserData = (userId) => {
    console.log('🔄 Loading data for user:', userId);
    
    const q = query(
      collection(db, 'transactions'), 
      where('userId', '==', userId)
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log('📊 Received', snapshot.docs.length, 'transactions from Firebase');
      
      const transactionList = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        
        // Handle different timestamp formats
        let sortTimestamp;
        if (data.timestamp?.toMillis) {
          // Firestore Timestamp
          sortTimestamp = data.timestamp.toMillis();
        } else if (data.timestamp instanceof Date) {
          // JavaScript Date
          sortTimestamp = data.timestamp.getTime();
        } else if (typeof data.timestamp === 'number') {
          // Already a number
          sortTimestamp = data.timestamp;
        } else {
          // Fallback to date string
          sortTimestamp = new Date(data.date || 0).getTime();
        }
        
        transactionList.push({ 
          id: doc.id, 
          ...data,
          sortTimestamp
        });
      });
      
      // Sort by timestamp (most recent first)
      transactionList.sort((a, b) => b.sortTimestamp - a.sortTimestamp);
      
      console.log('📋 Processed transactions:', transactionList.length);
      setTransactions(transactionList);
      
      // Calculate balance
      const totalIncome = transactionList
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const totalExpenses = transactionList
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const newBalance = totalIncome - totalExpenses;
      console.log('💰 New balance calculated:', newBalance);
      setBalance(newBalance);
      
    }, (error) => {
      console.error('❌ Error in onSnapshot:', error);
    });

    return unsubscribe;
  };

  // Function to navigate between pages
  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  // FIXED: Simplified addTransaction function for better reliability
  const addTransaction = async (transaction) => {
    if (!user) {
      console.error('❌ No user logged in');
      return false;
    }

    try {
      console.log('🔄 Starting to add transaction:', transaction);
      
      const now = new Date();
      
      // Format time properly
      const formatTime = (timeString) => {
        if (!timeString) {
          return now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          });
        }
        
        // If time is in 24-hour format (HH:MM), convert to 12-hour
        if (timeString.includes(':') && !timeString.includes(' ')) {
          const [hours, minutes] = timeString.split(':');
          const hour = parseInt(hours);
          const ampm = hour >= 12 ? 'PM' : 'AM';
          const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
          return `${displayHour}:${minutes} ${ampm}`;
        }
        
        return timeString;
      };

      // Create transaction with both client timestamp (for immediate sorting) and server timestamp
      const newTransaction = {
        ...transaction,
        userId: user.uid,
        date: transaction.date || now.toISOString().split('T')[0],
        time: formatTime(transaction.time),
        timestamp: now, // Use client timestamp for immediate updates
        serverTimestamp: serverTimestamp(), // Server timestamp for consistency
        createdAt: now.toISOString()
      };
      
      console.log('💾 Saving transaction to Firebase:', newTransaction);
      
      // Add to Firestore
      const docRef = await addDoc(collection(db, 'transactions'), newTransaction);
      console.log('✅ Transaction saved successfully with ID:', docRef.id);
      
      return true;
    } catch (error) {
      console.error('❌ Error adding transaction:', error);
      console.error('❌ Error code:', error.code);
      console.error('❌ Error message:', error.message);
      return false;
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