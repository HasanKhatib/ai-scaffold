# Council

The council is a structured deliberation protocol for non-trivial decisions. Four seats, each holding a distinct lens. Not a vote — a pressure test.

## When to invoke

Load this file (and the four seat files below) when the task involves:

- An irreversible action: publishing a release, deprecating a file pattern, changing the seat architecture
- A decision that affects all distribution layers (degit / skill / npm)
- Autonomous scope expansion beyond the current layer being built
- External integrations or dependencies being introduced
- Any significant time or cost commitment with unclear return

For routine tasks, skip the council. Use it when the cost of being wrong is high.

## Active seats

| Seat | File | Role |
|---|---|---|
| **The Skeptic** | `agents/povs/the-skeptic.md` | Challenges the premise and tests assumptions |
| **The Editor** | `agents/povs/the-editor.md` | Guards simplicity and cuts accumulation |
| **The Shipper** | `agents/povs/the-shipper.md` | Slot A — holds shipping discipline and user value |
| **The Engineer** | `agents/povs/the-engineer.md` | Slot B — holds technical feasibility and agentic safety |

## Protocol

1. State the decision in one sentence
2. Load `agents/templates/decision-packet.md` and fill it in
3. Run each seat in order: Skeptic → Editor → Shipper → Engineer
4. Each seat returns its verdict and findings (see output contract in each file)
5. Synthesize: proceed only if no seat returns Block or Stop

## Guardrails

- AI writes stay within this repo directory — no external paths without explicit instruction
- No publishing, pushing to remote, or tagging releases without human confirmation
- If two or more seats return a blocking verdict, stop and surface the conflict before proceeding

## Verdict mapping

| Combined signal | Action |
|---|---|
| All proceed | Build |
| One pause, rest proceed | Address the pause before building |
| Any reframe | Stop, restate the decision, re-run |
| Any block or stop | Surface to human before proceeding |
