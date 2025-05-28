import { useTransactionStore } from '../store/transactionStore';
import { Transaction } from '../domain/Transaction';
import { v4 as uuid } from 'uuid';

export const useAddTransaction = () => {
  const transactions = useTransactionStore((s) => s.transactions);
  const addTransaction = useTransactionStore((s) => s.addTransaction);

  return (data: Omit<Transaction, 'id' | 'date'>) => {

    const balance = transactions.reduce((acc, tx) => 
            tx.type === 'income' ? acc + tx.amount : acc - tx.amount
        , 0);

    if (data.type === 'expense' && data.amount > balance) {
           alert(`Saldo insuficiente. Actualmente tienes $${balance} disponibles.`);
           return
        }

    const transaction = new Transaction(
      uuid(),
      data.amount,
      data.description,
      data.type
    );

    addTransaction(transaction);
  };
};
