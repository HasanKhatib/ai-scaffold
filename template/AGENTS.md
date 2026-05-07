# AGENTS.md

## Always apply

<!-- Rules that apply to every session, unconditionally. Add your own below the defaults. -->

- Read `CLAUDE.md` before starting any session
- Update `docs/next.md` at the end of every session — summarize where things stand, the immediate next step, open threads, and decisions made
- Update `docs/roadmap.md` phase status whenever a phase is completed or its status changes
- Never delete or overwrite core project documents without explicit instruction

<!-- ADD YOUR OWN ALWAYS-APPLY RULES HERE -->
<!-- Example: "Never modify files in src/_generated/ directly" -->

## Load on demand

<!-- Load these files when the task requires it — do not load all at once. -->
<!-- After init: replace slot-a and slot-b filenames with your actual chosen seat names. -->

| File | Load when |
|---|---|
| `agents/council.md` | A non-trivial decision needs deliberation |
| `agents/povs/the-skeptic.md` | Loaded automatically with council |
| `agents/povs/the-editor.md` | Loaded automatically with council |
| `agents/povs/[slot-a-seat].md` | Loaded automatically with council |
| `agents/povs/[slot-b-seat].md` | Loaded automatically with council |
| `agents/templates/decision-packet.md` | Preparing a council session |
| `docs/roadmap.md` | Checking phase status or planning next milestone |

<!-- ADD PROJECT-SPECIFIC LOAD-ON-DEMAND FILES HERE -->
<!-- Example: | `knowledge/domain-context.md` | Working on [domain] features | -->

## Council invocation triggers

<!-- Invoke the council when the task involves: -->

- Any irreversible action (publishing, deleting, deprecating)
- Autonomous scope expansion beyond the current task
- External integrations or new dependencies
- Significant time or cost commitment with unclear return

<!-- ADD PROJECT-SPECIFIC TRIGGERS HERE -->

## Output boundaries

<!-- Define where AI is and is not allowed to write. Be explicit. -->

- AI writes stay within this repo directory

<!-- REPLACE OR EXTEND THE LINE ABOVE WITH YOUR PROJECT'S ACTUAL BOUNDARIES -->
<!-- Example: "AI writes only to src/_generated/ and docs/ — never to src/core/" -->
