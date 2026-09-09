# AGENTS.md

React + Vite, JSX only — no TypeScript. Stack and test config: package.json, vite.config.js.

- No lint, typecheck, or formatter configured. Don't look for one, don't invent one.
- Vitest + Testing Library are installed but no test files exist yet. Run all: npm run test. Run one: npx vitest run <path>.
- src/data/products.js is a hardcoded array on purpose. No backend, no API — don't add data-fetching or state libraries.
- Prices are INR (₹).

# Workflow Commands

- `/create-plan <description>` — Create a detailed implementation plan. Save to `plans/<slug>.md`. Include: files to create/modify, functions/components, test specs, checklist. Present for review before any implementation.
- Follow Test-Driven Development (TDD): write tests first, then implement code to make them pass.
