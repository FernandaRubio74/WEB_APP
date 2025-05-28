export type TransactionType = 'income' | 'expense';

export class Transaction {
    id: string;
    amount: number;
    description: string;
    type: TransactionType;
    date: Date = new Date()

    constructor(id: string, amount: number, description: string, type: TransactionType) {
        this.id = id;
        this.amount = amount;
        this.description = description;
        this.type = type;
    }

    getFormattedAmount(): string {
        const sign= this.type === 'income' ? '+': '-';
        return `${sign}$${this.amount.toFixed(2)}`;
    }
}