# POV Seats — README

## The 2+2 structure

Every instance of this scaffold ships with four council seats:

**Fixed (always present — do not remove or rename):**
- `the-skeptic.md` — challenges the premise, tests assumptions
- `the-editor.md` — guards simplicity, cuts accumulation

**Variable (chosen at init based on project type):**
- One Slot A file — strategic seat (goal alignment, shipping rhythm)
- One Slot B file — domain/values seat (expertise, constraints)

## After init: activate your seats

1. Delete the slot files you are not using (keep only the 2 you selected)
2. Rename the chosen files: remove the `slot-a-` or `slot-b-` prefix
   - `slot-a-the-shipper.md` → `the-shipper.md`
   - `slot-b-the-engineer.md` → `the-engineer.md`
3. Update `agents/council.md` — replace `[Slot A seat]` and `[Slot B seat]` with your actual seat names and filenames
4. Update `AGENTS.md` — replace `[slot-a-seat].md` and `[slot-b-seat].md` in the load-on-demand table

## Seat files: what stays constant

Each seat file contains the same five sections regardless of variant:
1. One-line opening provocation
2. **Focus** — 3–4 questions this seat always asks
3. **Evaluate** — 2–3 named lenses with checks
4. **Failure checks** — patterns that trigger this seat's concern
5. **Output contract** — verdict language + findings format

Seat files stay ≤80 lines. If a seat needs more than that to explain itself, it's too complex.

## Slot A — Strategic seat options

| File | Use when |
|---|---|
| `slot-a-the-shipper.md` | Product / app / consumer software |
| `slot-a-the-researcher.md` | R&D / thesis / publications |
| `slot-a-the-operator.md` | Tooling / infra / MCP / platform |

## Slot B — Domain/values seat options

| File | Use when |
|---|---|
| `slot-b-the-engineer.md` | Technical / software projects |
| `slot-b-the-user.md` | Consumer product — user advocate |
| `slot-b-the-domain-expert.md` | Field-specific (fill in your domain) |
| `slot-b-the-guardian.md` | Personal OS / life management |
