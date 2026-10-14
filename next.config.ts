import type { NextConfig } from 'next';

const config: NextConfig = {
  // Workspace packages export TypeScript source directly.
  transpilePackages: ['@ft/api', '@ft/auth', '@ft/db', '@ft/ui', '@ft/validators'],
  serverExternalPackages: ['sequelize', 'pg', 'pg-hstore'],
};

export default config;
