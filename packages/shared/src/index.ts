// Types and helpers shared between the backend and the frontend.

export type Currency = 'USD' | 'EUR' | 'GBP' | 'INR';

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  currency: Currency;
  description: string;
  occurredAt: string;
}

export const DEFAULT_CURRENCY: Currency = 'USD';
