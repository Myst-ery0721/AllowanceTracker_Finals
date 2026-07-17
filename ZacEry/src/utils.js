export const calculateBalance = (transactions) => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  return totalIncome - totalExpenses;
};

export const validateLoginInput = (email, password) => {
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return { valid: false, error: 'Invalid email format' };
  }
  if (!password || password.length < 6) {
    return { valid: false, error: 'Password must be at least 6 characters' };
  }
  return { valid: true, error: null };
};