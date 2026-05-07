#!/usr/bin/env node
import * as p from '@clack/prompts'
import fs from 'fs'
import path from 'path'

// --- Seat mapping ---
const SEAT_MAP = {
  1: { label: 'App / product / consumer software',  slotAName: 'The Shipper',    slotAFile: 'the-shipper',    slotBName: 'The User',          slotBFile: 'the-user' },
  2: { label: 'Tooling / infra / MCP / platform',   slotAName: 'The Operator',   slotAFile: 'the-operator',   slotBName: 'The Engineer',      slotBFile: 'the-engineer' },
  3: { label: 'R&D / thesis / publications',         slotAName: 'The Researcher', slotAFile: 'the-researcher', slotBName: 'The Domain Expert', slotBFile: 'the-domain-expert' },
  4: { label: 'Personal OS / life management',       slotAName: 'The Shipper',    slotAFile: 'the-shipper',    slotBName: 'The Guardian',      slotBFile: 'the-guardian' },
}

// --- Seat content ---
const SEAT_CONTENT = {
  'the-shipper': `# The Shipper

> "Does this help someone, and does it ship?"

## Focus

- What does a real user get from this that they didn't have before?
- Is this shippable in its current form, or does it need one more thing?
- What's the minimum version that proves the value?
- Are we building the right thing, or the interesting thing?

## Evaluate

**User value**
- Is there a specific person who is better off because of this?
- Is the value obvious without explanation, or does it require a pitch?
- Does this reduce friction or add it?

**Shipping discipline**
- What is the actual blocker to shipping right now?
- Is the remaining work de-risking the product or perfecting it?
- If this shipped today, what's the worst thing a user would notice?

**Momentum**
- Does this decision move the product forward or protect what's already built?
- Is the next step clear after this ships?

## Failure checks

- Shipping is blocked on something that could be fixed post-launch
- The feature is complete but the user story isn't
- Quality is being used as a reason to delay when the real reason is uncertainty
- The scope expanded to cover a case that no real user has requested
- "One more thing" has appeared more than once in the same cycle

## Output contract

Verdict: **Ship** / **Scope down and ship** / **Pause** / **Kill**

Findings: the specific user value at stake + the one thing blocking the ship`,

  'the-operator': `# The Operator

> "Does this keep things running reliably at scale?"

## Focus

- What breaks in production, and under what load or failure condition?
- Is this observable — can we tell when it's failing?
- What does the on-call runbook look like for this change?
- Are we solving the operational problem or the demo problem?

## Evaluate

**Reliability**
- What is the failure mode, and how is it detected?
- Is there a fallback if this component degrades?
- Has this been tested under realistic load, not just happy-path conditions?

**Operability**
- Can a person who didn't build this diagnose and fix it at 2am?
- Are logs, metrics, and alerts in place before this ships?
- Is the rollback path clear and tested?

**Scale discipline**
- Does the architecture hold at 10x current load?
- Are there bottlenecks that only appear at scale?
- Is complexity being added before it's needed?

## Failure checks

- The system works in dev but has untested assumptions in production
- Observability is deferred to "after it's stable"
- The failure mode is known but the recovery path isn't documented
- Scaling assumptions are based on estimates, not measurements
- Operational burden is being transferred to users or future maintainers

## Output contract

Verdict: **Deploy** / **Harden first** / **Redesign** / **Block**

Findings: the specific operational risk + the minimum required before deployment`,

  'the-researcher': `# The Researcher

> "Does this advance output worth publishing?"

## Focus

- Does this move the research forward, or is it maintenance of the research process?
- Is the finding significant enough to justify the method?
- What would a rigorous reviewer accept or reject, and why?
- Is this building toward a publishable contribution, or drifting from it?

## Evaluate

**Research integrity**
- Is the methodology sound for the claim being made?
- Are the findings reproducible by someone else with the same data?
- Have alternative explanations been seriously considered?

**Output quality**
- Is this at the standard required for the target venue or audience?
- What would need to change for this to be accepted or cited?
- Is the contribution clearly scoped — not overclaiming, not underclaiming?

**Momentum**
- Is this work progressing toward a concrete output (paper, report, dataset)?
- What is the next milestone and is the current work aligned with it?

## Failure checks

- The research is thorough but the contribution is unclear
- Methodology was chosen for familiarity, not fit
- Results are being reinterpreted to fit a preferred conclusion
- Scope has expanded to include questions the current work can't answer
- Publication or presentation pressure is driving decisions about rigor

## Output contract

Verdict: **Advance** / **Refine** / **Reframe** / **Pause**

Findings: the specific contribution at risk + the one change required to strengthen it`,

  'the-user': `# The User

> "Would a real person actually use this, and would they come back?"

## Focus

- Is the experience intuitive without explanation?
- Where does a user get confused, frustrated, or lost?
- What does the user want to do, versus what we're asking them to do?
- Would this user recommend this to someone else?

## Evaluate

**Clarity**
- Is the purpose of this feature obvious on first contact?
- Are there terms, flows, or choices that require prior knowledge to navigate?
- Does the empty state or error state leave the user knowing what to do next?

**Friction**
- How many steps does the user take to get the thing they came for?
- Where are the moments of doubt — "is this right?", "did that work?"
- What would a user do if they hit a problem, and does that path exist?

**Retention signal**
- Does completing this task leave the user better off in a way they'll remember?
- Is there a reason to return, or is this a one-time interaction?

## Failure checks

- The feature works correctly but the user doesn't know it worked
- The happy path is smooth but edge cases leave users stranded
- Design decisions were made for the builder's mental model, not the user's
- User feedback has been collected but not acted on
- The feature solves a problem the user doesn't know they have

## Output contract

Verdict: **Ship** / **Fix friction first** / **Rethink flow** / **Cut**

Findings: the specific user moment that fails + the change that would fix it`,

  'the-engineer': `# The Engineer

> "Will this hold, and would I trust it in production?"

## Focus

- Is the architecture sound for the scale and complexity this will actually reach?
- What breaks first, and under what conditions?
- Is the implementation the simplest thing that could work, or the cleverest?
- What does a future maintainer need to know that isn't obvious?

## Evaluate

**Feasibility**
- Is this buildable with the current team, tools, and time?
- Are there dependencies on things not yet proven to work?
- Has the hardest part been prototyped, or only planned?

**Architecture**
- Are the boundaries between components clean?
- Will this be easy to change when requirements shift?
- Is the data model correct for the access patterns, not just the happy path?

**Agentic safety**
- Are AI output paths clearly bounded so nothing writes where it shouldn't?
- Is there a human checkpoint before irreversible actions?
- Is the system observable — can you tell when something has gone wrong?

## Failure checks

- The implementation is clever in a way that will confuse the next person
- A dependency is assumed to work but hasn't been tested end-to-end
- Error handling is deferred to "later"
- The scope includes infrastructure work that belongs in a different phase
- AI is trusted to write to paths without explicit guardrails

## Output contract

Verdict: **Build** / **Prototype first** / **Redesign** / **Block**

Findings: the specific technical risk + the change required to proceed safely`,

  'the-domain-expert': `# The Domain Expert

> "Is this accurate, appropriate, and defensible within the field?"

## Focus

- Is this accurate according to the standards and evidence of the field?
- Are there regulatory, ethical, or professional constraints this doesn't account for?
- Would a credible practitioner stand behind this?
- What does domain-specific failure look like here?

## Evaluate

**Accuracy**
- Is the claim, design, or output consistent with current knowledge in the field?
- Are sources, standards, or methodologies appropriate for this context?
- What would a subject matter expert challenge first?

**Constraints**
- Are there regulatory, legal, or ethical requirements that apply?
- Are field-specific edge cases accounted for?
- What is the liability or consequence if this is wrong?

**Credibility**
- Would this hold up to review by a domain peer?
- Are the assumptions made here common in the field, or outliers?

## Failure checks

- Domain-specific terminology is used incorrectly or imprecisely
- A constraint from the field has been overlooked because it wasn't obvious
- The approach is technically correct but inappropriate for this context
- Assumptions were imported from a different domain without validation
- The output would embarrass a practitioner in the field

## Output contract

Verdict: **Accurate** / **Needs review** / **Incorrect** / **Out of scope**

Findings: the specific domain issue + the correction or expert input required`,

  'the-guardian': `# The Guardian

> "Does this align with what I actually value, and at what cost to my time and energy?"

## Focus

- Is this consistent with the values and priorities I've committed to?
- What is the real time cost — not the optimistic estimate?
- Am I doing this because it matters, or because it's interesting?
- What does this crowd out, and is that trade-off acceptable?

## Evaluate

**Values alignment**
- Does this decision reflect what I said matters most?
- Am I optimizing for the metric, or the thing the metric is supposed to represent?
- Would I be comfortable if someone I respect saw exactly what I'm doing and why?

**Time and energy**
- What is the honest time cost of this, including ramp-up and follow-through?
- Is this something I have capacity for right now, or am I borrowing from elsewhere?
- Is the energy this requires proportionate to the return?

**Personal constraints**
- Are there personal rules, commitments, or boundaries this conflicts with?
- Is this a sustainable pace, or a sprint with hidden debt?

## Failure checks

- The justification sounds rational but doesn't match gut sense
- Time estimates are optimistic in a pattern that has appeared before
- The task is being done to feel productive rather than to make progress
- A personal boundary is being crossed with a rationale that wouldn't survive scrutiny
- The cost is being paid by future self without their consent

## Output contract

Verdict: **Aligned** / **Proceed with awareness** / **Reconsider** / **Stop**

Findings: the specific value or constraint at stake + the honest trade-off being made`,
}

// --- Prompt generator ---
function buildPrompt(answers, seats) {
  const { description, tension, boundaries, memory } = answers
  const { slotAName, slotAFile, slotBName, slotBFile } = seats

  return `# ai-scaffold init prompt

You are initializing a structured AI collaboration scaffold for this repo. Write every file listed below exactly as specified. Do not summarize or explain — write the files.

## Project context

- **Project:** ${description}
- **Primary tension:** ${tension}
- **Output boundaries:** ${boundaries}
- **Memory system:** ${memory ? 'yes — create memory/MEMORY.md' : 'no'}
- **Council seats:** The Skeptic + The Editor + ${slotAName} + ${slotBName}

---

## Files to write

### AGENTS.md

\`\`\`markdown
# AGENTS.md

## Always apply

- Read \`CLAUDE.md\` before starting any session
- Update \`docs/next.md\` at the end of every session — summarize where things stand, the immediate next step, open threads, and decisions made
- Update \`docs/roadmap.md\` phase status whenever a phase is completed or its status changes
- Never delete or overwrite core project documents without explicit instruction

## Load on demand

| File | Load when |
|---|---|
| \`agents/council.md\` | A non-trivial decision needs deliberation |
| \`agents/povs/the-skeptic.md\` | Loaded automatically with council |
| \`agents/povs/the-editor.md\` | Loaded automatically with council |
| \`agents/povs/${slotAFile}.md\` | Loaded automatically with council |
| \`agents/povs/${slotBFile}.md\` | Loaded automatically with council |
| \`agents/templates/decision-packet.md\` | Preparing a council session |
| \`docs/roadmap.md\` | Checking phase status or planning next milestone |

## Council invocation triggers

- Any irreversible action (publishing, deleting, deprecating)
- Autonomous scope expansion beyond the current task
- External integrations or new dependencies
- Significant time or cost commitment with unclear return

## Output boundaries

- ${boundaries}
- No publishing, pushing to remote, or releases without human confirmation
\`\`\`

---

### CLAUDE.md

\`\`\`markdown
# CLAUDE.md

## Project overview

${description}

## Architecture

<!-- Describe the key files, directories, and how they fit together. -->

## Dev commands

\`\`\`bash
# Add your project's commands here
\`\`\`

## Hard rules

- Do not push to remote or publish without explicit instruction
- Do not modify files outside this repo directory
- Ask before taking any irreversible action
\`\`\`

---

### agents/council.md

\`\`\`markdown
# Council

The council is a structured deliberation protocol for non-trivial decisions. Four seats, each holding a distinct lens. Not a vote — a pressure test.

## Primary tension

${tension}

## When to invoke

- An irreversible action: publishing, deleting, deprecating, tagging a release
- Autonomous scope expansion beyond the current task
- External integrations or new dependencies
- Significant time or cost commitment with unclear return

## Active seats

| Seat | File | Role |
|---|---|---|
| **The Skeptic** | \`agents/povs/the-skeptic.md\` | Challenges the premise and tests assumptions |
| **The Editor** | \`agents/povs/the-editor.md\` | Guards simplicity and cuts accumulation |
| **${slotAName}** | \`agents/povs/${slotAFile}.md\` | Strategic — goal alignment and momentum |
| **${slotBName}** | \`agents/povs/${slotBFile}.md\` | Domain/values — expertise and constraints |

## Protocol

1. State the decision in one sentence
2. Load \`agents/templates/decision-packet.md\` and fill it in
3. Run each seat in order: Skeptic → Editor → ${slotAName} → ${slotBName}
4. Each seat returns its verdict and findings
5. Proceed only if no seat returns Block or Stop

## Guardrails

- ${boundaries}
- No publishing, pushing to remote, or tagging releases without human confirmation
- If two or more seats return a blocking verdict, stop and surface the conflict

## Verdict mapping

| Combined signal | Action |
|---|---|
| All proceed | Build |
| One pause, rest proceed | Address the pause before building |
| Any reframe | Stop, restate the decision, re-run |
| Any block or stop | Surface to human before proceeding |
\`\`\`

---

### agents/povs/the-skeptic.md

\`\`\`markdown
# The Skeptic

> "Why this, why now — and what's the strongest case against?"

## Focus

- What assumption is this decision resting on that we haven't tested?
- What does failure look like, and how long until we'd know?
- What are we not doing because we're doing this?
- Is this solving the real problem, or a comfortable version of it?

## Evaluate

**Premise validity**
- Is the problem statement accurate, or is it inherited from an earlier assumption?
- Would an outsider with no stake agree this is the right problem?
- Has this been tried before? What happened?

**Risk surface**
- What's the worst realistic outcome, not the worst imaginable one?
- Which risks are reversible and which aren't?
- What would have to go wrong simultaneously for this to fail badly?

**Opportunity cost**
- What's being deprioritized to do this?
- Is there a simpler version that captures 80% of the value?

## Failure checks

- The decision is justified by effort already spent (sunk cost reasoning)
- The strongest objection has been noted but not actually answered
- Confidence is high but evidence is thin
- The scope grew to accommodate a preference, not a requirement
- No one has named the specific condition under which this would be a mistake

## Output contract

Verdict: **Proceed** / **Pause** / **Reframe** / **Stop**

Findings: one named assumption at risk + one question that must be answered before moving forward
\`\`\`

---

### agents/povs/the-editor.md

\`\`\`markdown
# The Editor

> "Does this earn its place, or is it accumulation with a rationale?"

## Focus

- What is the simplest version of this that still works?
- What gets removed if we're honest about what's necessary?
- Is the complexity serving the user or the builder?
- What would this look like if we started fresh with what we know now?

## Evaluate

**Signal-to-noise**
- Does each element carry weight, or is some of it cover?
- Is the structure revealing the content or obscuring it?
- Can a new person orient in under two minutes?

**Accumulation check**
- What was added in the last cycle that hasn't proven its value yet?
- Is there anything present because it was present before?
- Would removing it break anything real?

**Scope discipline**
- Does the current scope match the current phase?
- Is anything being built for a future that isn't certain yet?

## Failure checks

- The file, feature, or section exists because removing it felt like losing something
- Complexity was added to handle an edge case that hasn't occurred
- The thing is thorough but not useful
- More was added after it was "done" without removing something else
- The structure is serving the process, not the outcome

## Output contract

Verdict: **Ship** / **Trim** / **Restructure** / **Cut**

Findings: one thing to remove or simplify + the cleaner form it should take
\`\`\`

---

### agents/povs/${slotAFile}.md

\`\`\`markdown
${SEAT_CONTENT[slotAFile]}
\`\`\`

---

### agents/povs/${slotBFile}.md

\`\`\`markdown
${SEAT_CONTENT[slotBFile]}
\`\`\`

---

### agents/templates/decision-packet.md

\`\`\`markdown
# Decision Packet

## Decision

<!-- State the decision in one sentence. What are we deciding? -->

## Context

<!-- 2-4 sentences. What led to this decision point? What has already been tried or considered? -->

## Options considered

1.
2.
3. (if applicable)

## Constraints

-
-

## What a good outcome looks like

<!-- One sentence. How will we know this decision was correct? -->

---

## Council verdicts

| Seat | Verdict | Key finding |
|---|---|---|
| The Skeptic | | |
| The Editor | | |
| ${slotAName} | | |
| ${slotBName} | | |

## Synthesis

<!-- What does the combined signal say? What is the decision? -->
\`\`\`

---

### docs/next.md

\`\`\`markdown
# Session handoff — next

## Where we left off

<!-- One paragraph: what was being worked on, what state it's in, what decision was last made. -->

## Immediate next step

<!-- The single most important thing to do at the start of the next session. One sentence. -->

## Open threads

-

## Decisions made this session

| Decision | Rationale |
|---|---|
| | |

## Watch list

-
\`\`\`

---

### docs/roadmap.md

\`\`\`markdown
# Roadmap

## Phases

| Phase | Description | Status | Done when |
|---|---|---|---|
| 1 | | ⬜ Not started | |
| 2 | | ⬜ Not started | |

## Current focus

## Deferred

-
\`\`\`

---

### opencode.json

\`\`\`json
{
  "$schema": "https://opencode.ai/config.json",
  "agent": {
    "council": {
      "description": "Council deliberation — pressure-tests decisions using the 4 active seats (Skeptic, Editor, ${slotAName}, ${slotBName}). Reads agents/council.md and runs the deliberation flow.",
      "mode": "all",
      "temperature": 0.1,
      "permission": {
        "edit": "deny",
        "bash": "ask",
        "webfetch": "deny"
      },
      "prompt": "{file:./agents/council.md}"
    }
  }
}
\`\`\`
${memory ? `
---

### memory/MEMORY.md

\`\`\`markdown
# MEMORY.md — Memory Index

## Memory types

| Type | Purpose | Load when |
|---|---|---|
| **Fact** | Stable truths about the project, domain, or user | Referenced in a task |
| **Decision** | Non-trivial choices made and their rationale | Revisiting a past decision |
| **Pattern** | Recurring approaches or heuristics that work | Starting a similar task |
| **Context** | Background that changes slowly (preferences, constraints) | Starting a new session |

## Index

| File | Type | Summary |
|---|---|---|
| | | |
\`\`\`
` : ''}
---

## After writing all files

Confirm to the user:
- Seats selected: The Skeptic + The Editor + ${slotAName} + ${slotBName}
- All files written
- Next steps: fill in \`CLAUDE.md\` and fill in \`docs/roadmap.md\` with your project phases
`
}

// --- Main ---
async function main() {
  console.log()
  p.intro('ai-scaffold init')

  const description = await p.text({
    message: 'What is this project? (one sentence)',
    placeholder: 'e.g. A mobile app for finding houses in Sweden',
    validate: v => v.trim().length === 0 ? 'Required' : undefined,
  })
  if (p.isCancel(description)) { p.cancel('Cancelled.'); process.exit(0) }

  const projectType = await p.select({
    message: 'What kind of project is this?',
    options: [
      { value: 1, label: '1 — App / product / consumer software' },
      { value: 2, label: '2 — Tooling / infra / MCP / platform' },
      { value: 3, label: '3 — R&D / thesis / publications' },
      { value: 4, label: '4 — Personal OS / life management' },
    ],
  })
  if (p.isCancel(projectType)) { p.cancel('Cancelled.'); process.exit(0) }

  const tension = await p.text({
    message: 'What is the primary tension you want the council to hold?',
    placeholder: 'e.g. speed vs. correctness',
    validate: v => v.trim().length === 0 ? 'Required' : undefined,
  })
  if (p.isCancel(tension)) { p.cancel('Cancelled.'); process.exit(0) }

  const boundariesInput = await p.text({
    message: 'What are your AI output boundaries?',
    placeholder: 'Type "default" for: AI writes stay within this repo directory',
  })
  if (p.isCancel(boundariesInput)) { p.cancel('Cancelled.'); process.exit(0) }
  const boundaries = (!boundariesInput || boundariesInput.trim().toLowerCase() === 'default')
    ? 'AI writes stay within this repo directory'
    : boundariesInput.trim()

  const memory = await p.confirm({
    message: 'Do you want a memory system scaffold? (creates memory/MEMORY.md)',
    initialValue: false,
  })
  if (p.isCancel(memory)) { p.cancel('Cancelled.'); process.exit(0) }

  const seats = SEAT_MAP[projectType]
  const answers = { description, tension, boundaries, memory }
  const prompt = buildPrompt(answers, seats)

  // Write SCAFFINIT.md
  const outPath = path.join(process.cwd(), 'SCAFFINIT.md')
  fs.writeFileSync(outPath, prompt, 'utf8')

  p.outro(`Done! Open SCAFFINIT.md and paste it into your AI to initialize your scaffold.

  Seats selected: The Skeptic + The Editor + ${seats.slotAName} + ${seats.slotBName}`)

  console.log('\n' + '─'.repeat(60))
  console.log(prompt)
  console.log('─'.repeat(60))
  console.log('\n→ Paste the above (or SCAFFINIT.md) into your AI to write the scaffold files.\n')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
