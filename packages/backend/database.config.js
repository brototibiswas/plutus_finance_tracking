// Single source of truth for DB connection settings.
// Read by sequelize-cli (via .sequelizerc) and by src/db/index.ts at runtime.
// Kept outside src/ so the same relative path resolves from both src/db and dist/db.
require('dotenv').config();

const base = {
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'plutus',
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 5432),
  dialect: 'postgres',
};

module.exports = {
  development: { ...base, logging: console.log },
  test: { ...base, database: `${base.database}_test`, logging: false },
  production: { ...base, logging: false },
};
