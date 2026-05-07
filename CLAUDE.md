# CLAUDE.md — ai-scaffold

## Project overview

`ai-scaffold` is a distributable scaffold that brings structured AI collaboration to any new repo. It ships as a GitHub template (via degit), a Claude Code skill, and an npm package (`npm create ai-scaffold`).

The repo has two layers:
- **Root** — live instance of the scaffold, tuned for building this developer tool
- **`template/`** — the distributable blank files that users receive via degit or CLI

## Architecture

- `template/` — distributed via `npx degit hasankhatib/ai-scaffold/template my-project`
- `packages/create-ai-scaffold/` — Layer 3 CLI; asks 5 questions, generates `SCAFFINIT.md` prompt for the user's LLM; questions and seat mapping hardcoded in JS
- Layer 2 skill — questions and seat mapping hardcoded inline in the skill prompt; independent from the CLI

## Dev commands

```bash
# No build step for template files — they are markdown only

# Layer 3 CLI (when built)
cd packages/create-ai-scaffold
npm install
node bin/create-ai-scaffold.js

# Template validation (when built)
node scripts/validate-template.js
```

## Hard rules

- `template/` files must never contain project-specific language — no repo names, no live paths, no filled-in placeholders
- Do not push to remote or publish to npm without explicit instruction
- POV seat files stay ≤80 lines. README stays ≤60 lines.
