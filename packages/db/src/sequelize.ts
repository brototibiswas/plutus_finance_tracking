import { Sequelize } from 'sequelize';

// Shared with sequelize-cli, which can only load CommonJS config.
const configs = require('./config/database.config.cjs');

const env = (process.env.NODE_ENV ?? 'development') as keyof typeof configs;
const { database, username, password, ...options } = configs[env];

export const sequelize = new Sequelize(database, username, password, options);
