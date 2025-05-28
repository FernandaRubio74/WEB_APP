import { useTransactionStore } from '../store/transactionStore';
import { Transaction } from '../domain/Transaction';
import { v4 as uuid } from 'uuid';

export const useAddTransaction = () => {
  const addTransaction = useTransactionStore((s) => s.addTransaction);

  return (data: Omit<Transaction, 'id' | 'date'>) => {
    const transaction = new Transaction(
      uuid(),
      data.amount,
      data.description,
      data.type
    );

    addTransaction(transaction);
  };
};
