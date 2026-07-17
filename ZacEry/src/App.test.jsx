import { describe, it, expect } from 'vitest';
import { calculateBalance } from './utils';
import { validateLoginInput } from './utils';

describe('calculateBalance', () => {
  it('subtracts expenses from income', () => {
    const txs = [
      { type: 'income', amount: 500 },
      { type: 'income', amount: 250 },
      { type: 'expense', amount: 100 },
    ];
    expect(calculateBalance(txs)).toBe(650);
  });

  it('returns 0 for no transactions', () => {
    expect(calculateBalance([])).toBe(0);
  });
});

describe('login validation', () => {
  it('accepts a valid email and password', () => {
    expect(validateLoginInput('user@test.com', 'secret123').valid).toBe(true);
  });

  it('rejects an invalid email', () => {
    expect(validateLoginInput('notanemail', 'secret123').valid).toBe(false);
  });

  it('rejects a short password', () => {
    expect(validateLoginInput('user@test.com', '123').valid).toBe(false);
  });
});
