# AGENTS.md — ai-scaffold

## Always apply

- Read `CLAUDE.md` before starting any session
- Update `docs/next.md` at the end of every session — summarize where things stand, the immediate next step, open threads, and decisions made
- Update `docs/roadmap.md` phase status whenever a layer is completed or its status changes
- Never delete or overwrite `prd.md` without explicit instruction
- Keep `template/` files free of project-specific language (no repo names, no live paths, no filled-in placeholders)

## Load on demand

Load these files when the task requires it — do not load all at once:

| File | Load when |
|---|---|
| `agents/council.md` | A non-trivial decision needs deliberation |
| `agents/povs/the-skeptic.md` | Loaded automatically with council |
| `agents/povs/the-editor.md` | Loaded automatically with council |
| `agents/povs/the-shipper.md` | Loaded automatically with council |
| `agents/povs/the-engineer.md` | Loaded automatically with council |
| `agents/templates/decision-packet.md` | Preparing a council session |
| `docs/roadmap.md` | Checking phase status or planning next milestone |

## Council invocation triggers

Invoke the council (load `agents/council.md`) when the task involves:

- Changing the structure of `template/` files or seat architecture
- Decisions that affect all distribution layers (degit / skill / npm)
- Any irreversible action: publishing, tagging a release, deprecating a file pattern
- Scope expansion beyond the current layer being built

## Output boundaries

- AI writes to any file in this repo
- Do not push to remote or publish npm packages without explicit instruction
- Do not create files outside this repo directory
