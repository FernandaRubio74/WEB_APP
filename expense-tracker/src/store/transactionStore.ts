import { create } from 'zustand';
import { Transaction } from '../domain/Transaction';

interface TransactionStore {
  transactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],
  addTransaction: (tx) =>
    set((state) => ({
      transactions: [...state.transactions, tx],
    })),
}));
