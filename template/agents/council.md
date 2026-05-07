# Council

The council is a structured deliberation protocol for non-trivial decisions. Four seats, each holding a distinct lens. Not a vote — a pressure test.

## When to invoke

Load this file (and the four seat files below) when the task involves:

- An irreversible action: publishing, deleting, deprecating, tagging a release
- Autonomous scope expansion beyond the current task
- External integrations or new dependencies being introduced
- Significant time or cost commitment with unclear return

For routine tasks, skip the council. Use it when the cost of being wrong is high.

## Active seats

<!-- After init, replace [Slot A seat] and [Slot B seat] with your chosen variants. -->
<!-- Remove the slot prefix from filenames: slot-a-the-shipper.md → the-shipper.md -->

| Seat | File | Role |
|---|---|---|
| **The Skeptic** | `agents/povs/the-skeptic.md` | Challenges the premise and tests assumptions |
| **The Editor** | `agents/povs/the-editor.md` | Guards simplicity and cuts accumulation |
| **[Slot A seat]** | `agents/povs/[slot-a-seat].md` | Strategic — goal alignment and momentum |
| **[Slot B seat]** | `agents/povs/[slot-b-seat].md` | Domain/values — expertise and constraints |

## Protocol

1. State the decision in one sentence
2. Load `agents/templates/decision-packet.md` and fill it in
3. Run each seat in order: Skeptic → Editor → Slot A → Slot B
4. Each seat returns its verdict and findings (see output contract in each file)
5. Synthesize: proceed only if no seat returns Block or Stop

## Guardrails

<!-- Define where AI is and is not allowed to write. Be explicit. -->

- AI writes stay within this repo directory

<!-- REPLACE OR EXTEND WITH YOUR PROJECT'S ACTUAL OUTPUT BOUNDARIES -->

- No publishing, pushing to remote, or tagging releases without human confirmation
- If two or more seats return a blocking verdict, stop and surface the conflict before proceeding

## Verdict mapping

| Combined signal | Action |
|---|---|
| All proceed | Build |
| One pause, rest proceed | Address the pause before building |
| Any reframe | Stop, restate the decision, re-run |
| Any block or stop | Surface to human before proceeding |
