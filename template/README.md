# ai-scaffold

> Structured AI collaboration for any repo — agent-agnostic dispatch, council deliberation, session handoff.

## What it gives you

One install, ready to use:

- **Agent-agnostic dispatch** — `AGENTS.md` + `CLAUDE.md` work across Claude Code, Cursor, OpenCode, and Copilot
- **Council deliberation** — a 4-seat protocol for non-trivial decisions (2 fixed + 2 chosen for your project type)
- **Session handoff** — `docs/next.md` so every session starts with context, not confusion
- **Memory system stub** — persistent knowledge that survives context resets

## The 2+2 seat model

The council has four seats: two universal (The Skeptic, The Editor) and two chosen at init based on your project type.

| Project type | Slot A (strategic) | Slot B (domain/values) |
|---|---|---|
| App / product | The Shipper | The User |
| Tooling / infra | The Operator | The Engineer |
| R&D / research | The Researcher | The Domain Expert |
| Personal OS | The Shipper | The Guardian |

## Install

**degit (any AI tool):**
```bash
npx degit hasankhatib/ai-scaffold/template my-project
```

**npm (interactive init):**
```bash
npm create ai-scaffold@latest
```

**Claude Code skill:**
```
/ai-scaffold
```

## After install

1. Open `agents/povs/README.md` — follow the seat activation steps
2. Fill in `CLAUDE.md` — project overview, dev commands, hard rules
3. Fill in `AGENTS.md` — add your project-specific rules and load-on-demand files
4. Delete unused slot files from `agents/povs/`
5. Start your first session — your AI now has structure from day one
