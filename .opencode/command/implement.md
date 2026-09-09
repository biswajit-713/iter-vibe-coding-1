---
description: Implement a plan from plans/ using strict TDD, one failing test at a time.
---

Implement the feature described in `plans/<plan-file>` in this repo. `<plan-file>` is the argument `$1`. If `$1` has no `.md` extension, treat it as `plans/$1.md`.

## Phase 0 — Validate and prepare

1. Check that `plans/$1` exists. If it does NOT: STOP immediately. Do not write or edit any file, do not create a branch, do not run tests. Report that the file is missing, list the files that DO exist in `plans/`, and end.
2. Read `plans/$1` fully. The plan is the authority for what to build and in what order.
3. Check for a git remote (`git remote`). If a remote exists, run `git pull` to get the latest changes before doing anything else. If there is no remote, skip this step silently — do not fail or report an error.
4. Create a new feature branch off the current branch, named after the plan slug: `feat/<slug>`, where `<slug>` is `$1` without the `.md` extension. Use `git checkout -b feat/<slug>`.

## Phase 1 — Strict TDD loop (one failing test at a time)

Follow the plan's implementation order, but enforce this cadence strictly. Do NOT batch tests, do NOT write multiple test files at once.

For each test unit in the plan's order:

1. Write EXACTLY ONE test file — the next one in the plan's order (or, if that file already exists, one focused test case). No other test file may be opened, written, or modified while this one is in progress.
2. Run ONLY that test: `npx vitest run <path>`. It MUST fail first (red phase). If it passes with no implementation, the test is wrong — fix the test, do not proceed.
3. Write the minimal implementation needed to make that test pass (green phase). Do not implement anything ahead of this test.
4. Re-run that same test — it MUST pass now.
5. Only then close out this test unit and move to the next one.

Rules:
- Never have two test files in progress, on the desk, or open at the same time.
- Never write logic that has no failing test behind it.
- Do NOT modify any file under `plans/` — the plan is input, not output. No plan file may appear in the commit.

## Phase 2 — Verify

Run the FULL suite: `npm run test`. All tests MUST pass. No lint, typecheck, or format command is configured in this repo — do not invent or run one.

## Phase 3 — Commit (gated on green)

If and ONLY IF the full suite passed:

1. `git status` and review the changed files. Confirm NO file under `plans/` is staged.
2. Stage only the implementation and test files.
3. Commit with a short, lowercase message matching repo history style.
4. Report the branch name and the commit hash.

If any test failed at any point (single test OR full suite): STOP. Do not commit. Report exactly which tests failed and why, then end.