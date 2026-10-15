export enum TxnType {
    CREDIT = 'credit',
    DEBIT = 'debit',
}

export interface Txn {
    id: string;
    type: TxnType;
    amount: number;
    description: string;
    submittedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}