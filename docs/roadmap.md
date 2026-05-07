# Roadmap — ai-scaffold

> Phase status dashboard. For full todos and detail, see `prd.md`.

## Phases

| Phase | Layer | Status | Signal |
|---|---|---|---|
| 1 | GitHub Template + degit | 🔵 In progress | `npx degit hasankhatib/ai-scaffold/template` works cleanly |
| 2 | Claude Code Skill | ⬜ Not started | `/ai-scaffold` installs in <60s, correct seats chosen |
| 3 | npm CLI | ⬜ Not started | `npm create ai-scaffold` works end-to-end |
| 4 | CI/CD | ⬜ Not started | One tag publishes all distribution channels |

## Demand gate

> Layers 2–4 are worth full investment only after: **10+ GitHub stars** or **3+ people using it unprompted**

## Current focus

Layer 1 — writing all root live files and `template/` distributable files.

## Deferred

- GitHub Action for drift detection (teams only)
- OpenCode plugin (evaluate after Layer 2)
- Web configurator (evaluate after Layer 3 adoption)
