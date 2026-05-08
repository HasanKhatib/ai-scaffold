<!-- Root README: GitHub landing page. See template/README.md for post-install content. -->

# ai-scaffold

> Structured AI collaboration for any repo — agent-agnostic dispatch, council deliberation, session handoff.

AI coding tools are powerful but stateless. Sessions drift. Context resets. Decisions get made without discipline. ai-scaffold gives your repo the structure your AI needs to stay oriented, consistent, and useful across sessions.

## What you get

- **Agent-agnostic dispatch** — `AGENTS.md` + `CLAUDE.md` work across Claude Code, Cursor, OpenCode, and Copilot
- **Council deliberation** — a 4-seat protocol for non-trivial decisions (2 fixed + 2 chosen for your project type)
- **Session handoff** — `docs/next.md` so every session starts with context, not confusion
- **Memory system stub** — persistent knowledge that survives context resets

## Install

**npm (interactive — recommended for most projects):**
```bash
npm create @hasankhatib/ai-scaffold@latest
```

**OpenCode skill (persistent — install once, use in any project via the agent):**
```bash
npx degit HasanKhatib/ai-scaffold/skills/ai-scaffold ~/.agents/skills/ai-scaffold
```

**degit (direct — copies the template, no interactivity):**
```bash
npx degit HasanKhatib/ai-scaffold/template my-project
```

## The council

The council is a 4-seat deliberation protocol for decisions where the cost of being wrong is high. Two seats are fixed; two are chosen at init based on your project type.

| Project type | Fixed seats | Slot A | Slot B |
|---|---|---|---|
| App / product | Skeptic + Editor | The Shipper | The User |
| Tooling / infra | Skeptic + Editor | The Operator | The Engineer |
| R&D / research | Skeptic + Editor | The Researcher | The Domain Expert |
| Personal OS | Skeptic + Editor | The Shipper | The Guardian |

The interactive install paths (npm, OpenCode skill) select your seats automatically.
