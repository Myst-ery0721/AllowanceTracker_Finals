// Replace your AddExpense.jsx with this updated version:

import React, { useState } from 'react';

const AddExpense = ({ addTransaction, balance }) => {
  const [expense, setExpense] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('food');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  }));
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (expense && description) {
      const expenseAmount = parseFloat(expense);
      
      if (expenseAmount > balance) {
        alert('Not enough balance!');
        return;
      }
      
      setLoading(true);
      
      console.log('🔄 Submitting expense with time:', { expense, description, category, date, time });
      
      const transaction = {
        type: 'expense',
        amount: expenseAmount,
        description: description,
        category: category,
        date: date,
        time: time
      };
      
      const success = await addTransaction(transaction);
      
      if (success) {
        setExpense('');
        setDescription('');
        setDate(new Date().toISOString().split('T')[0]);
        setTime(new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        }));
        alert('Expense added successfully!');
      } else {
        alert('Failed to add expense. Please try again.');
      }
      
      setLoading(false);
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Add Expense</h1>
      
      <div className="form-container">
        <div className="form-group">
          <label className="form-label">Amount</label>
          <input
            type="number"
            value={expense}
            onChange={(e) => setExpense(e.target.value)}
            className="form-input"
            placeholder="Enter amount"
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-input"
            placeholder="e.g., Lunch, Bus fare"
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-select"
            disabled={loading}
          >
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="entertainment">Entertainment</option>
            <option value="books">Books/Supplies</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="form-input"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="form-input"
            disabled={loading}
          />
        </div>
        
        <button
          onClick={handleSubmit}
          className="submit-button expense-button"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Expense'}
        </button>
      </div>
    </div>
  );
};

export default AddExpense;