# Session handoff — next

## Where we left off

Layer 2 is complete and tagged `v0.2.0`. The OpenCode skill (`skills/ai-scaffold/SKILL.md`) is written and tested — 3/4 project-type combinations validated. Q2 uses numbered options (1–4), Q4 uses "type default", file writing is silent with a clean summary output. Layer 1 (`v0.1.1`) and Layer 2 (`v0.2.0`) are both shipped.

## Immediate next step

Start Layer 3 — `npm create ai-scaffold` CLI. Create todos list first, then begin implementation.

## Open threads

- Layer 3 `packages/create-ai-scaffold/` directory exists but is empty — not started
- Layer 4 CI/CD not started — gated on demand signal (10+ stars or 3+ unprompted users)
- `personal` project type (option 4) not formally tested in skill — low risk, pattern is consistent

## Decisions made this session

| Decision | Rationale |
|---|---|
| No central skills registry | OpenCode skills are file-based SKILL.md, no publish step |
| Global install via degit | Init tool must work before scaffold exists — project-local is circular |
| Q2 numbered options (1–4) | Freeform text caused seat selection ambiguity in first test |
| Q4 "type default" | "Press enter" doesn't work in conversational AI interface |
| Silent file writing + clean summary | Per-file narration and todo lists leaked into user-facing output |
| scaffold.manifest.json removed | Premature abstraction — 4 rows of seat mapping don't need a data schema |

## Watch list

- Layer 3 CLI: one runtime dependency max (`@clack/prompts`), must complete in under 5 seconds
- Demand gate applies before investing in Layer 4 — check stars/usage before starting CI/CD
