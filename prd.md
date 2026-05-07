# PRD: ai-scaffold — Portable AI Collaboration Layer

> A distributable scaffold that brings structured AI collaboration (agent-agnostic dispatch, council deliberation, session handoff) to any new repo.
>
> Born from the digital-twin workflow. Ships as a GitHub template, Claude Code skill, and npm package.

---

## Problem

Every new repo starts from zero with AI. No session handoff, no deliberation protocol, no agent-agnostic dispatch. Developers either skip structure entirely or rebuild it from scratch each time. The digital-twin has solved this well — the scaffold should be extractable and installable in minutes.

## Target users

Developers using Claude Code, Cursor, OpenCode, or GitHub Copilot who want structured, persistent AI collaboration without inventing it themselves.

## Core value

One install gives you:
- Agent-agnostic dispatch (`AGENTS.md` + `CLAUDE.md` working together)
- Council deliberation protocol for non-trivial decisions
- Session handoff pattern (`docs/next.md` + `docs/roadmap.md`)
- 2 universal POV seats + 2 project-specific seats chosen at init
- Memory system stub

---

## POV seat architecture

The council is not a fixed set of 4 opinions. It's a 2+2 structure: two universal seats that ship with every instance, two variable slots chosen at init based on project type.

### Fixed seats (always present, no customization needed)

| Seat | Voice |
|---|---|
| **The Skeptic** | Challenges the premise. "Why this, why now, what's the strongest case against?" Universal to every domain and decision type. |
| **The Editor** | Simplicity and accumulation guard. Signal over noise. Cuts what doesn't earn its place. |

### Variable slots (chosen at init via interview)

**Slot A — Strategic seat** (goal alignment + momentum rhythm for this project type):

| Variant | When to use |
|---|---|
| **The Shipper** | Product / app / consumer software — does this help users, does it ship? |
| **The Researcher** | R&D / thesis / publications — does this advance output worth publishing? |
| **The Operator** | Tooling / infra / MCP / platform — does this keep things running reliably at scale? |

**Slot B — Domain/Values seat** (expertise + constraints specific to this field):

| Variant | When to use |
|---|---|
| **The Engineer** | Technical/software projects — feasibility, architecture, DX, agentic safety |
| **The Domain Expert** | Field-specific projects (green buildings, healthcare, legal) — placeholder with fill-in-the-blank structure |
| **The Guardian** | Personal OS / life management — values, time cost, personal constraints (the Steward archetype, made abstract) |
| **The User** | Consumer product — end-user advocate, product intuition, friction radar |

**Project-type mapping** (what the init interview produces):

| Project | Slot A | Slot B |
|---|---|---|
| House Viewing Buddy (mobile app) | The Shipper | The User |
| MCP server builder | The Operator | The Engineer |
| Green Buildings R&D | The Researcher | The Domain Expert |
| Personal OS / digital twin | The Shipper | The Guardian |

### Universal seat core (what stays constant across all variants)

Each seat — regardless of variant — always contains:
1. A one-line opening provocation (the seat's voice in one sentence)
2. **Focus** — 3–4 questions this seat always asks
3. **Evaluate** — 2–3 named lenses with 3–4 checks each
4. **Failure checks** — 4–5 patterns that trigger this seat's concern
5. **Output contract** — verdict language + findings format

Seat files stay ≤80 lines. If a seat needs more than that to explain itself, it's too complex.

---

## Repo structure

The repo root uses the scaffold's own live structure — tuned for building a developer tool (Skeptic + Editor + Shipper + Engineer). The `template/` directory holds the distributable blank files that get published. Same pattern as create-react-app: the tool that creates React apps is not itself a React app.

```
ai-scaffold/
├── AGENTS.md                    ← live, tuned for this project
├── CLAUDE.md                    ← live
├── opencode.json                ← council agent config (live, read-only deliberation)
├── agents/council.md            ← live, Skeptic+Editor+Shipper+Engineer
├── agents/povs/                 ← live seats (4 active files)
├── docs/next.md                 ← live session handoff
├── docs/roadmap.md              ← live phase dashboard (links to PRD for detail)
├── packages/
│   └── create-ai-scaffold/      ← Layer 3 CLI
└── template/                    ← what gets distributed via degit
    ├── AGENTS.md                ← blank with placeholders
    ├── CLAUDE.md                ← blank
    ├── opencode.json           ← council agent config (blank, slot notation)
    ├── agents/council.md        ← abstract guardrails, slot notation
    ├── agents/povs/             ← all 9 seat files + README
    ├── agents/templates/        ← decision-packet.md
    ├── docs/                    ← blank next.md + roadmap.md
    ├── memory/                  ← MEMORY.md stub
    ├── knowledge/               ← README stub
    ├── README.md                ← ≤60 lines
    └── .gitignore
```

CI validates that `template/` files contain no project-specific bleed before publishing. The canary strings (`vault/`, `seedbank`, `ADR 002`) already planned for Layer 4 do exactly this job.

---

## Layers

### Layer 1 — GitHub Template + degit (ship first)

Zero-friction baseline. Works for any tool, no registry needed.

**Repo:** `github.com/hasankhatib/ai-scaffold` (name TBD)

**Todos — root (live instance for this project)**

- [ ] Create the new GitHub repo, enable "Use this template"
- [ ] Write root `AGENTS.md` — tuned for this project: Skeptic + Editor + Shipper + Engineer as active seats
- [ ] Write root `CLAUDE.md` — filled in: what this project is, dev commands, hard rules
- [ ] Write root `agents/council.md` — Skeptic + Editor + Shipper + Engineer, concrete triggers for this project
- [ ] Write root `agents/povs/the-skeptic.md` and `the-editor.md` — fixed seats (same as template versions)
- [ ] Write root `agents/povs/the-shipper.md` and `the-engineer.md` — active variable seats (no slot prefix, these are live)
- [ ] Write root `docs/next.md` — live session handoff
- [ ] Write root `docs/roadmap.md` — live phase dashboard linking to `prd.md` for detail (not a duplicate of the PRD)
- [ ] Write root `opencode.json` — council agent config: mode `all`, temperature `0.1`, prompt references `./agents/council.md`, permissions `edit: deny`, `bash: ask`, `webfetch: deny`

**Todos — `template/` (distributable)**

- [ ] Write `template/AGENTS.md` — agent-agnostic dispatch pattern: load-on-demand section, council invocation triggers, always-apply rules; placeholder comments where users fill in their own rules; slot notation for variable seats
- [ ] Write `template/CLAUDE.md` — project guidance shell: system overview (blank), dev commands (blank), 3 universal hard rules + placeholder for project-specific ones
- [ ] Write `template/agents/council.md` — rewrite from scratch (do NOT port digital-twin version near-verbatim):
  - Abstract "When to use it" triggers (irreversible changes, autonomous scope expansion, external integrations, significant time/cost commitment)
  - Abstract guardrails section: "AI writes stay in designated output paths" placeholder, not vault-specific language
  - POV seats table with 2+2 structure and slot notation
  - Verdict mapping updated to match Skeptic + Editor + Slot A + Slot B verdicts
- [ ] Write `template/agents/povs/the-skeptic.md` and `the-editor.md` — fixed seats
- [ ] Write 3 Slot A variants: `template/agents/povs/slot-a-the-shipper.md`, `slot-a-the-researcher.md`, `slot-a-the-operator.md`
- [ ] Write 4 Slot B variants: `template/agents/povs/slot-b-the-engineer.md`, `slot-b-the-domain-expert.md`, `slot-b-the-guardian.md`, `slot-b-the-user.md`
- [ ] Write `template/agents/povs/README.md` — explains the 2+2 structure, which files to activate, how to rename slots to your project's language
- [ ] Port `template/agents/templates/decision-packet.md` — already generic, minimal edits needed
- [ ] Create `template/docs/next.md` — blank with section headers and usage comments
- [ ] Create `template/docs/roadmap.md` — blank with phase structure and usage comments
- [ ] Create `template/memory/MEMORY.md` — index stub with format instructions and memory type guide
- [ ] Create `template/knowledge/README.md` — explains the load-on-demand pattern; stub files for personal-profile, startup-context, domain-specific context
- [ ] Write `template/README.md` (≤60 lines): what it is, the 2+2 seat model in one paragraph, install options (template / degit / skill / npm), how to activate the right seats
- [ ] Add `template/.gitignore` (node_modules, .env, *.db, .DS_Store)
- [ ] Write `template/opencode.json` — council agent config: mode `all`, temperature `0.1`, prompt references `./agents/council.md`, permissions `edit: deny`, `bash: ask`, `webfetch: deny`
- [ ] Tag `v0.1.0`
- [ ] Verify `npx degit hasankhatib/ai-scaffold/template my-project` works cleanly on a blank machine

---

### Layer 2 — Claude Code Skill (highest native value)

An installable `/ai-scaffold` skill that interactively initializes the scaffold in any repo. Users get a personalized, ready-to-use setup in under 60 seconds.

The skill owns its own interview logic inline — 5 questions and seat mapping hardcoded in the skill prompt. It is a different execution context from the CLI and will diverge from it naturally (interactive, no stdout, writes files directly).

**Todos**

- [ ] Research Claude Code skills registry: publishing format, version spec, how `skills-lock.json` tracks installs
- [ ] Write the skill prompt: runs the 5-question interview inline (questions + seat_map hardcoded), then writes customized `AGENTS.md`, `CLAUDE.md`, `agents/council.md`, the 2 fixed + 2 selected POV files, docs stubs
- [ ] Rename slot files to remove `slot-a-` / `slot-b-` prefix in the written output (users see `the-shipper.md`, not `slot-a-the-shipper.md`)
- [ ] Test skill in a blank repo for each project-type combination (app / tooling / research / personal OS)
- [ ] Test that the result is usable without manual edits in the first AI session
- [ ] Publish skill to the Claude Code skills registry
- [ ] Document install command in the scaffold README

---

### Layer 3 — `npm create ai-scaffold` (broader reach)

For developers outside the Claude Code ecosystem. The CLI asks 5 questions, generates a context-loaded prompt, and delivers it two ways: written to `SCAFFINIT.md` in the target directory and printed to stdout with a short instruction ("Open SCAFFINIT.md and paste into your AI to initialize your scaffold"). The user's LLM of choice does the actual file writing.

The CLI hardcodes the 5 questions and seat mapping in JS. The skill hardcodes them inline in its prompt. They are different execution contexts — expected to diverge. When a new project type is added, update both: two obvious files.

**Todos**

- [ ] Create `packages/create-ai-scaffold/` in the scaffold repo
- [ ] Pick CLI prompt library (`@clack/prompts` — clean, zero-dep feel)
- [ ] Hardcode the 5 questions and seat mapping in JS (do not read from an external file)
- [ ] Generate a context-loaded prompt from interview answers (selected seat file contents inlined); write to `SCAFFINIT.md` in target dir and print to stdout with a short instruction
- [ ] Write `bin/create-ai-scaffold.js` entry point
- [ ] Add `package.json` with `"bin"` field and `"create-ai-scaffold"` package name
- [ ] Test: `npm create ai-scaffold@latest` from a blank directory, all 4 project-type paths
- [ ] Publish to npm
- [ ] Pin to Node 18+ (LTS); one runtime dependency max (`@clack/prompts`)

---

### Layer 4 — CI/CD (keep all layers fresh)

One repo, one tag, all distribution channels update automatically.

**Todos**

- [ ] Write `.github/workflows/release.yml`:
  - Trigger: push to `v*` tags
  - Job 1: validate all template files exist and contain required section headers (fail fast)
  - Job 2: `npm publish` from `packages/create-ai-scaffold/`
  - Job 3: publish updated skill to Claude Code skills registry — **stub until registry API is public**; implement as a no-op step with a `TODO` comment
- [ ] Write template validation script: checks fixed seats exist, both slot groups have all variants, `council.md` contains no digital-twin-specific language (grep for "vault/", "seedbank", "ADR 002" as canary strings)
- [ ] Add `CHANGELOG.md` — manual update before tagging
- [ ] Set up `NPM_TOKEN` as a GitHub Actions secret
- [ ] Document release process in `CONTRIBUTING.md` (≤20 lines: bump version, update changelog, tag, push)

---

## Deferred (validate demand first)

- **GitHub Action** (`uses: hasankhatib/ai-scaffold-action@v1`) — drift detection and update PRs across repos that adopted the scaffold. Only worth building if teams (not just solo devs) adopt it.
- **Web configurator** — UI that generates a zip of customized scaffold files. Only if CLI/skill adoption is strong.

---

## Success criteria

| Milestone | Signal |
|---|---|
| Layer 1 done | `npx degit hasankhatib/ai-scaffold/template my-project` works; a stranger can read the README and understand the system in 2 minutes |
| Seat design validated | The scaffold initializes correctly for all 3 example projects (House Viewing Buddy, MCP builder, Green Buildings R&D) without manual edits |
| Layer 2 done | `/ai-scaffold` installs in a blank repo in under 60 seconds, correct seats chosen automatically |
| Layer 3 done | `npm create ai-scaffold` works end-to-end; published to registry |
| Validate demand | 10+ GitHub stars or 3+ people using it unprompted → worth investing in Layer 4 + deferred items |

---

## Constraints

- README stays ≤60 lines
- POV seat files stay ≤80 lines each
- No dependencies in the scaffold itself (markdown files only)
- Layer 3 CLI: one runtime dependency max; `npm create` must complete in under 5 seconds
- The validation script (Layer 4) is the canary: if it can't check correctness mechanically, the template has become too loose to distribute
