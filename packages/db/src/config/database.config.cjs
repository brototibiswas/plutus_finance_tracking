// Single source of truth for DB connection settings.
// Read by sequelize-cli via .sequelizerc and by src/index.ts.
// The .env path is explicit because sequelize-cli runs from the package root,
// so a bare dotenv.config() could silently miss it.
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const base = {
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'plutus-finance-tracker',
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 5432),
  dialect: 'postgres',
};

module.exports = {
  development: { ...base, logging: process.env.LOGGING === 'true' ? console.log : false },
  test: { ...base, database: `${base.database}_test`, logging: false },
  production: { ...base, logging: false },
};
