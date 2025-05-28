import { useState } from 'react';
import { useAddTransaction } from '../application/useAddTransaction';
import type { TransactionType } from '../domain/Transaction';


export const TransactionForm = () => {
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState('');
  const [type, setType] = useState<TransactionType>('income');

  const add = useAddTransaction();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    add({
      amount,
      description,
      type,
      getFormattedAmount: function () {
        const sign = this.type === 'income' ? '+' : '-';
        return `${sign}$${this.amount.toFixed(2)}`;
      }
    });
    setAmount(0);
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 p-4 border rounded-lg">
      <input
        type="number"
        className="w-full p-2 border"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Cantidad"
      />
      <input
        type="text"
        className="w-full p-2 border"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción"
      />
      <select
        className="w-full p-2 border"
        value={type}
        onChange={(e) => setType(e.target.value as TransactionType)}
      >
        <option value="income">Ingreso</option>
        <option value="expense">Gasto</option>
      </select>
      <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
        Agregar
      </button>
    </form>
  );
};
