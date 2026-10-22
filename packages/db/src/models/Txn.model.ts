import { DataTypes, Model } from "sequelize";
import {Txn as TxnAttributes, TxnType} from "@ft/core";
import { sequelize } from "../sequelize";

export interface Txn extends TxnAttributes {}
export class Txn extends Model<TxnAttributes, Omit<TxnAttributes, 'id' | 'createdAt' | 'updatedAt'>> {}

Txn.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        type: {
            type: DataTypes.ENUM(...Object.values(TxnType)),
            allowNull: false,
        },
        amount: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        submittedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {sequelize, tableName: "transactions", timestamps: false}
)