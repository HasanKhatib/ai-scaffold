# ai-scaffold

> Structured AI collaboration for any repo — agent-agnostic dispatch, council deliberation, session handoff.

AI coding tools are powerful but stateless. Sessions drift. Context resets. Decisions get made without discipline. ai-scaffold gives your repo the structure your AI needs to stay oriented, consistent, and useful across sessions.

## Usage

```bash
npm create @hasankhatib/ai-scaffold@latest
```

Run this in any project directory. It asks 5 questions, then writes a `SCAFFINIT.md` file containing a ready-to-paste prompt. Paste that prompt into your AI (Claude Code, Cursor, OpenCode, Copilot — any of them) and it writes all the scaffold files.

## What you get

- **`AGENTS.md`** — rules your AI reads every session: what to always do, what to load on demand, when to invoke the council
- **`CLAUDE.md`** — project overview, dev commands, hard rules
- **`agents/council.md`** — 4-seat deliberation protocol for non-trivial decisions
- **`agents/povs/`** — the 4 seat files chosen for your project type
- **`agents/templates/decision-packet.md`** — structured template for council sessions
- **`docs/next.md`** — session handoff: where you left off, immediate next step, open threads
- **`docs/roadmap.md`** — phase status dashboard
- **`opencode.json`** — council agent config (OpenCode users)
- **`memory/MEMORY.md`** — memory index (optional, prompted during init)

## The 5 questions

1. What is this project? (one sentence)
2. What kind of project is it? (app / tooling / R&D / personal)
3. What is the primary tension you want the council to hold?
4. What are your AI output boundaries?
5. Do you want a memory system scaffold?

## The council

The council is a 4-seat deliberation protocol for decisions where the cost of being wrong is high. Two seats are fixed (The Skeptic, The Editor); two are chosen based on your project type.

| Project type | Slot A | Slot B |
|---|---|---|
| App / product | The Shipper | The User |
| Tooling / infra | The Operator | The Engineer |
| R&D / research | The Researcher | The Domain Expert |
| Personal OS | The Shipper | The Guardian |

## Other install paths

**OpenCode skill** (install once, use in any project via the agent):
```bash
npx degit HasanKhatib/ai-scaffold/skills/ai-scaffold ~/.agents/skills/ai-scaffold
```

**degit** (copies the template directly, no interactivity):
```bash
npx degit HasanKhatib/ai-scaffold/template my-project
```

## Requirements

Node 18+

## Links

- [GitHub](https://github.com/HasanKhatib/ai-scaffold)
