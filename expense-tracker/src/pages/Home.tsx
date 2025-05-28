import { TransactionForm } from "../components/TransactionForm";
import { useTransactionStore } from "../store/transactionStore";

const Home = () => {
    const transactions = useTransactionStore((s) => s.transactions);
    
  return (
        <div className="max-w-xl mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Registro de Finanzas</h1>
          <TransactionForm/>
          <ul className="mt-4">
            {transactions.map((tx) => (
              <li key={tx.id} className="border p-2 my-2 flex justify-between">
                <span>{tx.description}</span>
                <span>{tx.getFormattedAmount()}</span>
              </li>
            ))}
          </ul>
        </div>
  )
}

export default Home
