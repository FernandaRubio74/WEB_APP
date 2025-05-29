import { useState } from "react";
import { BalanceBar } from "../components/BalanceBar";
import { TransactionForm } from "../components/TransactionForm";
import { useTransactionStore } from "../store/transactionStore";
import { useEditTransaction } from "../application/useEditTransaction";

const Home = () => {
    const transactions = useTransactionStore((s) => s.transactions);
    const editTransaction = useEditTransaction();

    const incomes = transactions.filter((tx) => tx.type === "income");
    const expenses = transactions.filter((tx) => tx.type === "expense");
    const totalIncome = incomes.reduce((sum, tx) => sum + tx.amount, 0);
    const totalExpense = expenses.reduce((sum, tx) => sum + tx.amount, 0);

    // State for editing
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValues, setEditValues] = useState<{ amount: number; description: string }>({ amount: 0, description: "" });

    // Start editing
    const handleEditClick = (tx: any) => {
        setEditingId(tx.id);
        setEditValues({ amount: tx.amount, description: tx.description });
    };

    // Save edit
    const handleEditSave = (id: string) => {
        editTransaction(id, { amount: editValues.amount, description: editValues.description });
        setEditingId(null);
    };

    // Cancel edit
    const handleEditCancel = () => {
        setEditingId(null);
    };

    return (
        <>
            <header className="relative w-full bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 py-10 px-6 shadow-lg">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none" />
                <h1 className="text-4xl font-extrabold text-white text-center drop-shadow-lg tracking-tight">
                    Registro de Finanzas
                </h1>
                <p className="mt-2 text-blue-100 text-center text-lg font-medium">
                    Controla tus ingresos y gastos de manera eficiente
                </p>
            </header>
            <div className="max-w-5xl mx-auto mt-10 px-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                <div className="flex flex-col h-full">
                    <TransactionForm />
                </div>
                <div className="flex flex-col h-full">
                    <BalanceBar totalIncome={totalIncome} totalExpense={totalExpense} />
                </div>
            </div>
            <div className="max-w-5xl mx-auto mt-8 px-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                <section className="bg-zinc-900 rounded-xl shadow-lg p-6 border border-zinc-800 flex flex-col h-full">
                    <h2 className="text-xl font-bold text-green-400 mb-4 text-center flex items-center gap-2 justify-center">
                        Ingresos
                    </h2>
                    <ul className="space-y-3 flex-1">
                        {incomes.length === 0 && (
                            <li className="text-gray-400 text-center">Sin ingresos</li>
                        )}
                        {incomes.map((tx) => (
                            <li
                                key={tx.id}
                                className="flex justify-between items-center bg-gradient-to-r from-green-900 to-green-800 border border-green-700 rounded-md px-4 py-3 shadow"
                            >
                                {editingId === tx.id ? (
                                    <>
                                        <input
                                            type="number"
                                            className="w-24 mr-2 rounded bg-zinc-800 text-white border border-zinc-700 px-2"
                                            value={editValues.amount}
                                            onChange={e => setEditValues(ev => ({ ...ev, amount: Number(e.target.value) }))}
                                        />
                                        <input
                                            type="text"
                                            className="w-32 mr-2 rounded bg-zinc-800 text-white border border-zinc-700 px-2"
                                            value={editValues.description}
                                            onChange={e => setEditValues(ev => ({ ...ev, description: e.target.value }))}
                                        />
                                        <button className="text-green-400 mr-2" onClick={() => handleEditSave(tx.id)}>Guardar</button>
                                        <button className="text-red-400" onClick={handleEditCancel}>Cancelar</button>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-gray-100">{tx.description}</span>
                                        <span className="font-semibold text-green-300">
                                            {tx.getFormattedAmount()}
                                        </span>
                                        <button
                                            className="text-blue-400 hover:text-blue-300 cursor-pointer ml-2"
                                            onClick={() => handleEditClick(tx)}
                                        >Editar</button>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </section>
                <section className="bg-zinc-900 rounded-xl shadow-lg p-6 border border-zinc-800 flex flex-col h-full">
                    <h2 className="text-xl font-bold text-red-400 mb-4 text-center flex items-center gap-2 justify-center">
                        Gastos
                    </h2>
                    <ul className="space-y-3 flex-1">
                        {expenses.length === 0 && (
                            <li className="text-gray-400 text-center">Sin gastos</li>
                        )}
                        {expenses.map((tx) => (
                            <li
                                key={tx.id}
                                className="flex justify-between items-center bg-gradient-to-r from-red-900 to-red-800 border border-red-700 rounded-md px-4 py-3 shadow"
                            >
                                {editingId === tx.id ? (
                                    <>
                                        <input
                                            type="number"
                                            className="w-24 mr-2 rounded bg-zinc-800 text-white border border-zinc-700 px-2"
                                            value={editValues.amount}
                                            onChange={e => setEditValues(ev => ({ ...ev, amount: Number(e.target.value) }))}
                                        />
                                        <input
                                            type="text"
                                            className="w-32 mr-2 rounded bg-zinc-800 text-white border border-zinc-700 px-2"
                                            value={editValues.description}
                                            onChange={e => setEditValues(ev => ({ ...ev, description: e.target.value }))}
                                        />
                                        <button className="text-green-400 mr-2" onClick={() => handleEditSave(tx.id)}>Guardar</button>
                                        <button className="text-red-400" onClick={handleEditCancel}>Cancelar</button>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-gray-100">{tx.description}</span>
                                        <span className="font-semibold text-red-300">
                                            {tx.getFormattedAmount()}
                                        </span>
                                        <button
                                            className="text-blue-400 hover:text-blue-300 cursor-pointer ml-2"
                                            onClick={() => handleEditClick(tx)}
                                        >Editar</button>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </>
    );
};

export default Home;
