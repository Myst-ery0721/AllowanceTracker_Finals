// Replace your AddIncome.jsx with this updated version:

import React, { useState } from 'react';

const AddIncome = ({ addTransaction }) => {
  const [income, setIncome] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  }));
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (income && description) {
      setLoading(true);
      
      console.log('🔄 Submitting income with time:', { income, description, date, time });
      
      const transaction = {
        type: 'income',
        amount: parseFloat(income),
        description: description,
        category: 'allowance',
        date: date,
        time: time
      };
      
      const success = await addTransaction(transaction);
      
      if (success) {
        setIncome('');
        setDescription('');
        setDate(new Date().toISOString().split('T')[0]);
        setTime(new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        }));
        alert('Income added successfully!');
      } else {
        alert('Failed to add income. Please try again.');
      }
      
      setLoading(false);
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="page-container">
      <br></br>
      <br></br>

      <h1 className="user-name"><span className="highlight">Add Income</span></h1>
      <br></br>
      
      <div className="form-container">
        <div className="form-group">
          <label className="form-label">Amount</label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
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
            placeholder="e.g., Weekly allowance"
            disabled={loading}
          />
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
          className="submit-button income-button"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Income'}
        </button>
      </div>
    </div>
  );
};

export default AddIncome;