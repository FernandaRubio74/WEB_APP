import { BalanceBar } from "../components/BalanceBar";
import { TransactionForm } from "../components/TransactionForm";
import { useTransactionStore } from "../store/transactionStore";

const Home = () => {
    const transactions = useTransactionStore((s) => s.transactions);

    const incomes = transactions.filter((tx) => tx.type === "income");
    const expenses = transactions.filter((tx) => tx.type === "expense");
    const totalIncome = incomes.reduce((sum, tx) => sum + tx.amount, 0);
    const totalExpense = expenses.reduce((sum, tx) => sum + tx.amount, 0);

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
                {/* Formulario */}
                <div className="flex flex-col h-full">
                    <TransactionForm />
                </div>
                {/* Gráfico */}
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
                                <span className="text-gray-100">{tx.description}</span>
                                <span className="font-semibold text-green-300">
                                    {tx.getFormattedAmount()}
                                </span>
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
                                <span className="text-gray-100">{tx.description}</span>
                                <span className="font-semibold text-red-300">
                                    {tx.getFormattedAmount()}
                                </span>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </>
    )
}

export default Home
