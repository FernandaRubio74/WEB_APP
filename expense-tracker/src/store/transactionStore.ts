import { create } from 'zustand';
import { Transaction } from '../domain/Transaction';

interface TransactionStore {
  transactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
  editTransaction: (id: string, updatedTx: Partial<Transaction>) => void;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],
  addTransaction: (tx) =>
    set((state) => ({
      transactions: [...state.transactions, tx],
    })),

  editTransaction: (id: string, updtadedTx: Partial<Transaction>) => set((state) => ({
    transactions: state.transactions.map((tx) =>
      tx.id === id
        ? {
            ...tx,
            ...updtadedTx,
            getFormattedAmount: tx.getFormattedAmount // Ensure method is preserved
          }
        : tx
    )
  }))
}));
