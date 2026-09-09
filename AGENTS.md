# AGENTS.md

React + Vite, JSX only — no TypeScript. Stack and test config: package.json, vite.config.js.

- No lint, typecheck, or formatter configured. Don't look for one, don't invent one.
- Vitest + Testing Library are installed but no test files exist yet. Run all: npm run test. Run one: npx vitest run <path>.
- src/data/products.js is a hardcoded array on purpose. No backend, no API — don't add data-fetching or state libraries.
- Prices are INR (₹).

# Workflow Commands

- `/create-plan <description>` — Create a detailed implementation plan. Save to `plans/<slug>.md`. Include: files to create/modify, functions/components, test specs, checklist. Present for review before any implementation.
- `/implement <plan-file>` — Implement `plans/<plan-file>.md` via strict TDD: git pull if a remote exists, new `feat/<slug>` branch, one failing test at a time (red → green, no two test files at once), full `npm run test`, commit only when all tests pass. Auto-runs the `post-commit-review` skill after the commit.
- `post-commit-review` skill — Review the last commit (or changes since a ref) on four axes — correctness, secrets, standards, verbosity — as four parallel subagents. Auto-triggered by the model after `/implement` commits; also loadable on request.
