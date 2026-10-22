'use server'

import { Op, Txn } from "@ft/db";
import { TxnType } from "../../../packages/core/src/types/Txn";
import { revalidatePath } from "next/cache";

export async function getTransactions() {
    const entires = await Txn.findAll();
    return entires.map((txn) => txn.toJSON());
}

export async function createTransaction(input: {
    description: string;
    amount: number;
    type: TxnType;
    submittedAt: Date;
}) {
    const entry = await Txn.create({
        description: input.description,
        amount: input.amount,
        type: input.type,
        submittedAt: input.submittedAt,
    });

    // marks /transactions cache as invalid/stale. When next request happens, Next will rerun the server and will serve fresh data 
    revalidatePath("/transactions"); 
    return entry.toJSON();
}

export async function updateTransaction(id: string, input: Partial<{
    description: string;
    amount: number;
    type: TxnType;
    submittedAt: Date;
}>) {
    const entry = await Txn.findByPk(id)
    if(!entry) {
        throw new Error(`Transaction with id ${id} not found`);
    }

    await entry.update(input);
    revalidatePath("/transactions");
    return entry.toJSON();
}

export async function deleteTransactions(ids: string[]) {
    if(ids.length === 0) return {deleted: 0}

    const existingEntries = await Txn.findAll({
        where: {
            id: {[Op.in]: ids}
        },
        attributes: ['id']
    })
    
    const existingIds = existingEntries.map((entry) => entry.id);
    const missingIds = ids.filter(id => !existingIds.includes(id))

    if(missingIds.length > 0) {
        throw new Error(`Transaction entries not found: ${missingIds.join(', ')}`);
    }

    const deleted = await Txn.destroy({where: {id: {[Op.in]: ids}}})
    revalidatePath("/transactions");
    return {deleted}
}