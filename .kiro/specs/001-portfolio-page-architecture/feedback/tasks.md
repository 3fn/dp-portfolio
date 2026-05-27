# Spec Feedback: Portfolio Page Architecture — Tasks

**Spec**: 001-portfolio-page-architecture
**Phase**: Tasks
**Created**: 2026-05-10
**Reviewers**: Ada, Lina, Sparky

---

## Tasks Feedback

### Context for Reviewers

- Requirements (20) and Design approved by Peter — all feedback incorporated
- 11 parent tasks, 27 subtasks total
- Task 1 (Token Override) → Ada. Task 2 (Button-CTA href) → Lina. Tasks 3–11 (Phases A–J) → Sparky.
- Sequential dependency: Tasks 1+2 must complete before Task 3 can fully deliver (Hero CTAs need Button-CTA href)
- Sparky can begin Task 3 scaffolding in parallel (layout, observers, utilities) — only Hero CTAs blocked on Task 2
- Phased structure (A–J) maps directly to parent tasks 3–11
- Design outline § "Section Visual Profiles" is the authoritative source for per-section token values
- Design doc § "Architecture" defines shared patterns (observer setup, reveal CSS, utilities)

**Key structural decisions:**
- Prerequisites (Tasks 1–2) are separate parent tasks — different agents, different completion timelines
- Each phase is one parent task (not sub-phases within a single parent) — enables independent completion docs and commit checkpoints
- Phase I (Ecosystem scaffold) folded into Task 3 (Foundation) since it's just a container + heading
- Phase H groups Hero CTAs + CTA section + Footer — all depend on Button-CTA href and are lightweight individually

**Focus your review on:**
- **Ada**: Is Task 1 correctly scoped? Anything missing for the token override?
- **Lina**: Is Task 2 sequencing correct (types → implementation → contract → tests → README)? Right-sized subtasks?
- **Sparky**: Do Tasks 3–11 map correctly to your phased plan? Are subtask scopes right-sized? Any missing work you know you'll need?

---

[Agent feedback rounds here]

### Lina — Button-CTA Task Review (2026-05-10)

#### Overall Assessment

Task 2 is correctly structured and right-sized. The subtask sequence (types → implementation → contract → tests → README) matches my scaffolding workflow. No missing subtasks. One minor note.

---

#### Confirmations

| Area | Status | Notes |
|------|--------|-------|
| Sequencing (2.1 → 2.2 → 2.3 → 2.4 → 2.5) | ✅ Correct | Types before implementation, contract before tests, README last |
| Subtask granularity | ✅ Right-sized | Each subtask is focused — 30-60 min of work |
| Agent assignment | ✅ Correct | All mine |
| Requirement references | ✅ Accurate | All point to Req 2 |
| Contract reference (`content_renders_link`) | ✅ Correct | New concept, will propose to catalog |
| Primary artifacts list | ✅ Complete | types.ts, schema.yaml, web.ts, contracts.yaml, tests, README |
| Success criteria | ✅ Testable | Each criterion maps to a verifiable outcome |
| `disabled` + `href` handling noted in 2.2 | ✅ Good | "Ignore disabled when rendering as `<a>`" — matches design feedback |

#### Minor Note

**[LINA-T1] Task 2.4 — "Run existing test suite" may not be possible**

Same limitation as Spec 000: this product repo has no Jest configuration. The existing Button-CTA tests live in `node_modules/@3fn/core/src/components/core/Button-CTA/__tests__/`. I can't run them from here.

**What I can do**: Verify that my changes to `ButtonCTA.web.ts` don't alter any code path that existing tests exercise (the `href`-absent path remains identical). The new tests I write will follow the same pattern and be runnable when test infrastructure is set up.

**Recommendation**: AC7 ("All existing Button-CTA tests SHALL continue passing without modification") should be validated by confirming the existing `<button>` code path is untouched — not by actually running the test suite. Same approach as Spec 000.

---

#### Ready to Execute

Task 2 can begin immediately (no dependency on Task 1). I'll start as soon as the spec is formalized. No blockers, no open questions.

### Ada — Token Task Review (2026-05-10)

#### Overall Assessment

Task 1 is correctly scoped and trivial — single line change, pipeline verification. No issues. Ready to execute immediately.

---

#### Confirmations

- **Task 1 scope**: Correct. One subtask (1.1), one file edit, one pipeline verification. This is a 2-minute task.
- **Agent assignment**: Correct. Token override is my domain.
- **Sequencing**: Task 1 has no dependencies — can execute now, in parallel with Lina's Task 2.
- **Validation approach**: Pipeline generation + output verification is sufficient. The `npx designerpunk validate` command also confirms semantic references.
- **No missing subtasks**: The override is a single primitive reference change. No dark-mode implications (pink300 is mode-invariant in the current system — same value light and dark). No theme file updates needed.

#### One Observation

Task 3.5 (Hero + Ecosystem scaffolds) depends on Task 2 for the Hero CTAs. The task doc notes this correctly ("depends on Task 2 completion"). But the scaffold itself (container, background, headline, placeholder) can be built without Task 2 — only the CTA buttons are blocked. Sparky could split 3.5 into "scaffold" (no dependency) and "add CTAs" (blocked on Task 2). Minor optimization — not critical since Task 2 is likely done before Sparky reaches 3.5 anyway.

#### Ready to Execute

Task 1 can begin immediately. No blockers, no open questions.

---

### Sparky — Web Implementation Task Review (2026-05-10)

#### Overall Assessment

Tasks 3–11 map correctly to my phased plan. Subtask scopes are right-sized — each is a focused unit of work I can complete and verify independently. The parent task success criteria are testable. No missing work that I can identify at this stage.

Two observations, one agreement with Ada. No issues.

---

#### Observations

**[SPARKY-T1] Task 3.5 dependency — agree with Ada's optimization**

Ada's right that the Hero scaffold (container, background, headline, subtext, placeholder) has no dependency on Task 2. Only the two Button-CTA instances are blocked. In practice, I'll build the scaffold first and drop the CTAs in when Lina delivers. I don't think this needs a formal subtask split — I'll just note in my completion doc that the CTAs were added after Task 2 landed. The success criteria for Task 3 already accounts for this: "Hero and Ecosystem section scaffolds render with correct backgrounds" doesn't mention CTAs.

Actually — looking again, the success criteria says "Hero and Ecosystem section scaffolds render with correct backgrounds." The Hero CTAs are part of Req 12's acceptance criteria, which is mapped to Task 3.5. If Task 2 isn't done when I reach 3.5, I have two options:

1. Complete Task 3 without Hero CTAs, add them later (breaks the Req 12 mapping)
2. Wait for Task 2 before completing Task 3 (clean but potentially blocking)

**My preference**: Option 1 with a note. Build the scaffold, mark Task 3 complete, add CTAs to Task 10 (Phase H: Hero CTAs + CTA Section + Footer) where they naturally belong anyway — Task 10.1 is literally "Hero CTAs." So the mapping is already correct. Task 3.5 builds the Hero *scaffold*; Task 10.1 adds the Hero *CTAs*. No conflict.

Wait — Task 10.1 already exists and covers exactly this. So Task 3.5's mention of "Hero CTAs: two Button-CTA with `href` (depends on Task 2 completion)" is redundant with Task 10.1. 

**Recommendation**: Remove the Hero CTA line from Task 3.5. Task 3.5 is "Hero + Ecosystem scaffolds" — containers, backgrounds, headings, placeholders. Task 10.1 is "Hero CTAs" — the actual buttons. This is already how the tasks are structured; 3.5 just has an extra line that creates confusion about where the CTAs actually get built.

**[SPARKY-T2] Phase I (Polish) — responsive work may happen incrementally**

Task 11.2 (Responsive breakpoints) is listed as a single subtask in the Polish phase. In practice, I'll be making responsive decisions during every section build (Phases B–H). The "Polish" responsive pass is really "verify and refine" — not "add responsive from scratch."

This is fine as written — the task says "Implement column reduction" which could mean "formalize what I've been building incrementally." Just setting expectations: by the time I reach Task 11, most responsive behavior will already exist. Task 11.2 is the cleanup/verification pass, not the initial implementation.

---

#### Confirmations

| Task | Maps to Phase | Scope | ✅ |
|------|:---:|--------|:---:|
| 3 (Foundation) | A | Layout + observers + utilities + scaffolds | ✅ Right-sized |
| 4 (Stats Bar) | B | One section, count-up JS | ✅ Right-sized |
| 5 (Why Build) | C | Cards + gradient + texture + easter egg | ✅ Right-sized |
| 6 (Critical Features) | D | Card grid + lattice pattern | ✅ Right-sized |
| 7 (Code Screenshots) | E | Blend modes + halftone (asset-dependent) | ✅ Right-sized |
| 8 (How Built + Thanks) | F | Frosted glass + gradient + credits + easter egg | ✅ Largest phase — correct |
| 9 (Who Built This) | G | Partial build + placeholder | ✅ Right-sized |
| 10 (CTAs + Footer) | H | Button-CTA usage + footer | ✅ Right-sized |
| 11 (Polish) | J | Prefixes + responsive + tuning | ✅ Right-sized |

| Area | Status | Notes |
|------|--------|-------|
| Subtask granularity | ✅ | Each subtask is 1–3 hours of focused work |
| Requirement mapping | ✅ | Every requirement has a home in a subtask |
| Agent assignments | ✅ | All Tasks 3–11 are mine |
| Success criteria | ✅ | Testable, visual-review-friendly |
| Artifact paths | ✅ | Reasonable file structure (will finalize during Task 3 setup) |
| Completion documentation | ✅ | Per-task completion docs + summaries |
| Commit hooks | ✅ | One commit per parent task completion |
| Dependency chain | ✅ | Tasks 1+2 → Task 3 (partial) → sequential phases |

---

#### Lina's Test Infrastructure Note

Agree with Lina (LINA-T1). Same situation for my integration tests — this product repo likely doesn't have test infrastructure yet. My "Scroll System Tests" from the design doc's testing strategy will need test setup as part of Task 3 or will be manual verification during implementation. I'll document which tests are automated vs. manual in my completion docs.

---

#### Ready to Execute

No blockers beyond the stated prerequisites. Tasks 1 and 2 can start now (Ada and Lina). I can begin Task 3 scaffolding (3.1, 3.2, 3.3, 3.4) immediately — only 3.5's Hero CTAs are blocked on Task 2, and those are actually covered by Task 10.1.

Let's build this thing.
