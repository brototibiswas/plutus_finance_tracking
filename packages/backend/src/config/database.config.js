// Single source of truth for DB connection settings.
// Read by sequelize-cli via .sequelizerc.
// The path is explicit because sequelize-cli runs from the package root,
// so a bare dotenv.config() would look for .env there and silently miss this one.
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const base = {
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'plutus',
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 5432),
  dialect: 'postgres',
};

module.exports = {
  development: { ...base,  logging: process.env.LOGGING === 'true' ? console.log : false, },
  test: { ...base, database: `${base.database}_test`, logging: false },
  production: { ...base, logging: false },
};
