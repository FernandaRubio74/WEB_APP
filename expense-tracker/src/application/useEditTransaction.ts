import { useTransactionStore } from "../store/transactionStore";

export const useEditTransaction = () => {
    const editTransaction = useTransactionStore((s) => s.editTransaction);

    return (id: string, updatedTx: { amount: number; description: string }) => {
        editTransaction(id, updatedTx);
    };
}

export default useEditTransaction