---
name: post-commit-review
description: Review the most recent change on four axes — correctness, secrets, standards, verbosity — as four parallel subagents, then aggregate. Use when a feature/change has just been committed (e.g. right after /implement finishes), or when asked to review the last commit / post-commit / review since a ref.
---

Review the most recent change on four axes. Optional fixed point `$1` (commit SHA, branch, tag, `HEAD~5`) defaults to the last commit.

## 1. Pin the fixed point

- Default: `git diff HEAD~1...HEAD` plus `git log HEAD~1..HEAD --oneline`.
- If `$1` was given: use `git diff $1...HEAD` and `git log $1..HEAD --oneline`.
- Verify `git rev-parse` of the fixed point resolves and the diff is non-empty. A bad ref or empty diff must STOP here — do not spawn subagents.

## 2. Find the spec (for the correctness axis)

Look for the originating spec, in this order:

1. Issue references in the commit messages (`#123`, `Closes #45`, `!67`).
2. A path `$2` (if the user passed one).
3. A spec file under `docs/`, `specs/`, or `plans/` matching the branch name or feature.

If nothing is found, run the correctness subagent anyway — it reports "no spec available" and stays quiet.

## 3. Spawn ALL FOUR subagents in parallel

Launch each review as a subagent via the Task tool in a single message, all four at once. Pass each its diff command. Pass the spec path/contents to `review-correctness` when one exists.

- `review-correctness` — spec conformance (missing / scope creep / wrong)
- `review-secrets` — leaked secrets, credentials, sensitive data
- `review-standards` — repo conventions + Fowler smell baseline
- `review-verbosity` — over-engineering, dead code, noise

These reviews are read-only and simultaneous. They must NOT pollute each other's context.

## 4. Aggregate

Present the four reports under `## Correctness`, `## Secrets`, `## Standards`, `## Verbosity` headings, verbatim or lightly cleaned. Do NOT merge or rerank findings across axes — each axis answers a different question, and one can pass while another fails.

Under each section add a one-line summary: findings count + worst issue *within that axis* (if any).

The report is informational and non-blocking. Do not edit any file or open a follow-up unless the user asks.