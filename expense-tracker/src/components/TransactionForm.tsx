import { useState } from 'react';
import { useAddTransaction } from '../application/useAddTransaction';
import type { TransactionType } from '../domain/Transaction';
import React from 'react';


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
        <div className="flex items-center justify-center">
            <form
            onSubmit={handleSubmit}
            className="bg-zinc-900 p-8 rounded-xl shadow-lg w-full flex flex-col justify-between h-auto"
            >
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Agregar Transacción</h2>
            <div>
                <label className="block text-gray-300 mb-1" htmlFor="amount">
                Cantidad
                </label>
                <input
                id="amount"
                type="number"
                className="w-full p-3 rounded bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="Cantidad"
                min="0"
                step="0.01"
                required
                />
            </div>
            <div>
                <label className="block text-gray-300 mb-1" htmlFor="description">
                Descripción
                </label>
                <input
                id="description"
                type="text"
                className="w-full p-3 rounded bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descripción"
                required
                />
            </div>
            <div>
                <label className="block text-gray-300 mb-1" htmlFor="type">
                Tipo
                </label>
                <select
                id="type"
                className="w-full p-3 rounded bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={type}
                onChange={(e) => setType(e.target.value as TransactionType)}
                >
                <option value="income">Ingreso</option>
                <option value="expense">Gasto</option>
                </select>
            </div>
            <button
                className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-bold py-3 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 mt-4"
                type="submit"
            >
                <span className="inline-flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Agregar
                </span>
            </button>
            </form>
        </div>
    );
};
