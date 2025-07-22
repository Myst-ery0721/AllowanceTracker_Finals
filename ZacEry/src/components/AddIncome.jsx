// components/AddIncome.js
import React, { useState } from 'react';

const AddIncome = ({ addTransaction }) => {
  const [income, setIncome] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (income && description) {
      setLoading(true);
      
      const transaction = {
        type: 'income',
        amount: parseFloat(income),
        description: description,
        category: 'allowance'
      };
      
      const success = await addTransaction(transaction);
      
      if (success) {
        setIncome('');
        setDescription('');
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
      <h1 className="page-title">Add Income</h1>
      
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