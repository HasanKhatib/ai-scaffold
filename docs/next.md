# Session handoff — next

## Where we left off

Layer 1 file authoring is complete. All root live files and all `template/` distributable files have been written. The repo structure matches the design in `prd.md`. Line count constraints are met (README 48/60, all seat files ≤50/80).

## Immediate next step

Create the GitHub repo, enable "Use this template", push current files, and verify `npx degit hasankhatib/ai-scaffold/template my-project` works cleanly.

## Open threads

- GitHub repo name is still TBD in `prd.md` — confirm before pushing
- `packages/create-ai-scaffold/` directory exists but is empty — Layer 3 work not started
- Layer 2 (skill) research not started

## Decisions made this session

| Decision | Rationale |
|---|---|
| `template/` subdirectory for distributable files | Keeps root as live dogfood instance; same pattern as create-react-app |
| `scaffold.manifest.json` at root only | It's a build artifact, not a user-facing file; template users receive the output, not the manifest |
| CLI generates `SCAFFINIT.md` + stdout | Agent-agnostic: any LLM can consume the prompt, not just Claude |
| Layer 3 is canonical implementation | More reliable than skill registry; skill embeds a snapshot of it |
| `docs/roadmap.md` as phase dashboard | Links to PRD for detail; no duplication |

## Watch list

- Verify degit subdirectory syntax works: `npx degit user/repo/template` — test on a blank machine before tagging v0.1.0
- The `template/.gitignore` may need adjustment depending on GitHub template behavior (GitHub templates copy `.gitignore` but some tools don't)
