# Knowledge — README

## Load-on-demand pattern

Files in `knowledge/` are background context for the AI — domain knowledge, personal profile, project-specific reference material. They are **not** loaded at session start. They are loaded on demand when a task requires that context.

This keeps the AI's working context lean. Loading everything upfront dilutes focus and wastes context window.

## How to use

1. Add a file to `knowledge/` when you have reference material the AI needs repeatedly
2. Add an entry to `AGENTS.md` load-on-demand table pointing to it
3. Include a note on when to load it (e.g. "Load when working on [topic]")

## Suggested files to create

| File | Contents |
|---|---|
| `knowledge/personal-profile.md` | Who you are, your background, working style, preferences |
| `knowledge/startup-context.md` | Company/project backstory, key decisions made, why things are the way they are |
| `knowledge/domain-context.md` | Field-specific knowledge, terminology, constraints, standards |

<!-- Create these files as needed. They are stubs — none are required. -->
<!-- Keep each file focused: one topic per file, load only what's relevant to the task. -->
