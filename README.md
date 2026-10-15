# App Architecture

finance-tracker/
│
├── package.json                    # root: workspaces, turbo/biome/typescript/knip/vitest, top-level scripts
├── package-lock.json                # single lockfile for the whole repo
├── tsconfig.json                    # root: project references only, not compiled directly
├── turbo.json                       # task graph: build/dev/lint/typecheck/test/db:generate/db:migrate
├── docker-compose.yml                # local Postgres + Redis
├── .github/
│   └── workflows/
│       └── ci.yml                   # npm ci → turbo lint typecheck test build
│
├── apps/
│   │
│   ├── web/                         # Next.js app — UI + server actions (thin)
│   │   ├── package.json
│   │   ├── tsconfig.json            # extends tsconfig.nextjs.json
│   │   ├── next.config.ts           # transpilePackages: [@ft/core, @ft/db, @ft/ui, @ft/validators, @ft/auth]
│   │   └── src/
│   │       ├── app/                 # routes, layouts, server actions
│   │       ├── features/            # transactions/, budgets/, accounts/ — components + actions + queries
│   │       └── globals.css          # imports @ft/ui/styles.css
│   │
│   └── worker/                      # background jobs (add once you reach step 7)
│       ├── package.json
│       ├── tsconfig.json            # extends tsconfig.library.json, NodeNext resolution
│       └── src/
│           └── index.ts             # BullMQ/pg-boss job definitions
│
├── packages/
│   │
│   ├── core/                        # pure domain logic, no framework deps
│   │   ├── package.json
│   │   ├── tsconfig.json            # extends tsconfig.library.json
│   │   └── src/
│   │       └── index.ts             # money math, categorization rules, budget calculations
│   │
│   ├── db/                          # Sequelize models + client
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── .sequelizerc
│   │   └── src/
│   │       ├── index.ts             # db client export
│   │       ├── config/              # database.config.cjs, shared by CLI and client
│   │       ├── models/              # accounts, transactions, transaction_splits, categories, budgets
│   │       ├── migrations/          # sequelize-cli migrations
│   │       └── seeders/
│   │
│   ├── validators/                  # Zod schemas shared by UI, actions, and DB layer
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/
│   │       └── index.ts
│   │
│   ├── auth/                        # Better Auth config
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/
│   │       └── index.ts
│   │
│   ├── ui/                          # Tailwind + daisyUI theme and shared components
│   │   ├── package.json
│   │   ├── tsconfig.json            # extends tsconfig.library.json
│   │   └── src/
│   │       ├── index.ts
│   │       ├── styles.css           # @import "tailwindcss"; @plugin "daisyui"; @source "./components"
│   │       └── components/          # Button, Card, MoneyInput, StatCard…
│   │
│   ├── integrations/                # add at step 8 — CSV/Plaid/SimpleFIN adapters
│   │   └── src/
│   │       └── index.ts             # normalizes everything to one ImportedTransaction schema
│   │
│   └── config/
│       └── typescript/              # @ft/tsconfig
│           ├── package.json
│           ├── base.json
│           ├── library.json
│           ├── react-library.json
│           └── nextjs.json
│
└── node_modules/                    # single hoisted install, root-level only

# Database migrations

Migrations live in `packages/db/src/migrations` and run through `sequelize-cli`, using the scripts in `packages/db/package.json`. Run these from `packages/db`:

```sh
cd packages/db

# create a new timestamped migration stub (the -- passes the name through npm)
npm run db:migration:create -- create-transactions-table

# apply all pending migrations
npm run db:migrate

# undo the most recent migration
npm run db:migrate:undo

# run all seeders
npm run db:seed
```

Connection settings come from `packages/db/src/config/database.config.cjs`, which reads `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_HOST` and `DB_PORT` from `packages/db/.env`. Postgres must be running and the database must exist before you migrate.
