# MEMORY.md — Memory Index

<!-- This file is the index for all persistent memory in this repo. -->
<!-- Each entry points to a memory file and describes what type of memory it holds. -->
<!-- The AI reads this index to know what memory exists before loading any of it. -->

## Memory types

| Type | Purpose | Load when |
|---|---|---|
| **Fact** | Stable truths about the project, domain, or user | Referenced in a task |
| **Decision** | Non-trivial choices made and their rationale | Revisiting a past decision |
| **Pattern** | Recurring approaches or heuristics that work | Starting a similar task |
| **Context** | Background that changes slowly (preferences, constraints) | Starting a new session |

## Index

<!-- Add entries here as memory files are created. -->
<!-- Format: | filename | type | one-line summary | -->

| File | Type | Summary |
|---|---|---|
| | | |

---

<!-- HOW TO USE -->
<!-- 1. When the AI learns something worth remembering, create a file in memory/ -->
<!-- 2. Add an entry to this index -->
<!-- 3. At the start of each session, the AI reads this index (not the full files) -->
<!-- 4. The AI loads individual memory files only when relevant to the current task -->
