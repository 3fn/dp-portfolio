# Spec Feedback: Nav-Header-App Hardening — Tasks

**Spec**: 000-nav-header-app-hardening
**Phase**: Tasks
**Created**: 2026-05-08
**Reviewers**: Ada, Lina

---

## Tasks Feedback

### Context for Reviewers

- Requirements (16) and Design approved by Peter
- Design feedback from Ada and Lina incorporated (pre-baked rgba glow, duration150, iOS shadow note, focusout timing, href format)
- 5 parent tasks, 23 subtasks total
- Task 1 (Token Foundation) assigned to Ada; Tasks 2–4 assigned to Lina; Task 5 split (Lina docs + Thurgood MCP)
- Sequential dependency: Task 1 must complete before Tasks 2–3 (tokens needed for implementation)
- Tasks 4 (tests) depends on Tasks 2–3 completing
- Task 5 depends on all prior tasks

**Key structural decisions:**
- NavAboutPopover is its own parent task (Task 3) separate from Nav-Header-App hardening (Task 2) — different component, different contracts
- Tests are a separate parent task (Task 4) rather than inline with implementation — enables running full test suite as validation gate
- MCP health check is Thurgood's subtask (5.3) since it's governance/audit work

**Focus your review on:**
- Is the task sequencing correct for your domain?
- Are subtask scopes right-sized (not too large, not too granular)?
- Are agent assignments correct?
- Any missing subtasks for work you know you'll need to do?
- Are requirement/contract references accurate?

---

[Agent feedback rounds here]

### Lina — Implementation Feasibility Review (2026-05-08)

#### Overall Assessment

Well-structured task breakdown. Sequencing is correct, subtask scopes are right-sized, and agent assignments are accurate. Ada's observation about assets already existing (ADA-T3) is good news — removes two blockers. Three items:

---

#### Issues

**[LINA-T1] Task 2.5 — `contracts.yaml` already exists with `accessibility_no_heading`**

The subtask says "Define `accessibility_no_heading` contract (existing, formalize)" — but it's already formalized. Nav-Header-App's `contracts.yaml` already has this contract fully authored with behavior description, validation criteria, and test approach. The subtask should be:

- Add `visual_background_override` contract (new)
- Add `visual_glow` contract (new)
- Verify existing `accessibility_no_heading` contract is still accurate (it is — confirmed with Peter)

Not a real problem — just clarifying that I'm adding two contracts to an existing file, not writing three from scratch.

**[LINA-T2] Task 3.7 — Accessibility hardening is verification, not implementation**

The subtask lists "Verify banner landmark role", "Verify no heading element", "Verify focus order", "Verify touch targets" — these are all inherited from Base and already implemented. The only *new* work here is:

- Add `aria-label` to the nav element

The rest is verification that existing behavior still works after hardening. This is fine as a subtask — just noting it's 90% verification, 10% implementation. Could be folded into Task 4 (tests) since the verification IS the test. But keeping it separate is also fine for clarity.

**[LINA-T3] Task 4.2 — Border override test is duplicated**

Task 4.2 (NavAboutPopover tests) includes "Test border override: `--nav-border-color` overrides separator color" — but this is a Nav-Header-App concern, not a popover concern. It's already in Task 4.1. Should be removed from 4.2.

---

#### Confirmations

| Area | Status | Notes |
|------|--------|-------|
| Sequencing (Task 1 → 2/3 → 4 → 5) | ✅ Correct | Tokens before implementation, tests after, docs last |
| Agent assignments (Tasks 2–4: Lina) | ✅ Correct | All component work is mine |
| Subtask granularity | ✅ Right-sized | Each subtask is ~1-2 hours of focused work |
| Requirement references | ✅ Accurate | All `_Requirements:` annotations checked |
| Contract references | ✅ Accurate | All `_Contracts:` annotations checked |
| Task 1.4 dual-agent model | ✅ Clear | Ada creates token file, I consume in component CSS |
| Task 5 split (Lina docs + Thurgood MCP) | ✅ Correct | I write README/meta, Thurgood validates MCP health |
| Completion documentation paths | ✅ Standard | Follows established pattern |

---

#### Observation

**[LINA-T4] Agrees with ADA-T2 — tokens.ts needs creation**

Task 1.4 should note that `Nav-Header-App/tokens.ts` is a new file. I'll need to create the import and wire it into the component's CSS. This is implicit in "consumption is Lina" but worth noting for task tracking — my work on Task 2.1 depends on this file existing.

---

#### Ready to Execute

Tasks 2–4 are well-scoped. Once Ada completes Task 1, I can begin immediately. No ambiguity about what I need to deliver.

### Ada — Token Task Review (2026-05-08)

#### Overall Assessment

Task structure is clean. Sequencing is correct — my token work (Task 1) gates Lina's implementation (Tasks 2–3). Subtask granularity is appropriate. Two issues and one observation:

---

#### Issues

**[ADA-T1] Task 1.1 — @font-face registration follows existing pattern**

The subtask says "Register `@font-face` declarations for web platform." This follows the established pattern: `@font-face` CSS co-located with font files in `src/assets/fonts/` (same as Inter at `src/assets/fonts/inter/inter.css` and Rajdhani at `src/assets/fonts/rajdhani/rajdhani.css`).

Deliverable:
- `src/assets/fonts/figtree/figtree.css` (+ move font files from `primitive-assets/`)
- `src/assets/fonts/commit-mono/commit-mono.css` (+ move font files from `primitive-assets/`)

No ambiguity — just noting the concrete file paths for implementation clarity.

**[ADA-T2] Task 1.4 — Component token file doesn't exist yet**

The subtask says "Create `navButton.padding.vertical` and `navHeader.padding.inline`" but doesn't note that `src/components/core/Nav-Header-App/tokens.ts` needs to be created from scratch. This is the first component token file for Nav-Header-App.

Minor — Lina and I both know this — but for task clarity, the subtask should note: "Create `src/components/core/Nav-Header-App/tokens.ts` using `defineComponentTokens()` pattern."

---

#### Observation

**[ADA-T3] Peter's deliverables are already present**

The design-outline's deliverables tracker shows outbound link icon SVG and DesignerPunk logo as "⏳ Awaiting." But both files already exist in `primitive-assets/`:
- `primitive-assets/external-link.svg` ✅
- `primitive-assets/designerPunkLogo.svg` ✅

These aren't blockers. Task 3.6 can proceed.

---

#### Confirmations

- **Sequencing**: Task 1 → Tasks 2/3 → Task 4 → Task 5. Correct — tokens must exist before consumption.
- **Agent assignments**: Task 1 is mine. Correct.
- **Task 1.4 dual-agent note**: "Ada + Lina (token creation is Ada, consumption is Lina)" — accurate. I create the `tokens.ts` file; Lina imports and uses the values in the component CSS.
- **Requirement references**: All `_Requirements:` annotations on Task 1 subtasks are correct (Req 1 for fonts, Req 2 for semantic/component tokens).
- **No missing subtasks**: Task 1 covers everything I need to do. Font primitives, semantic color, semantic typography, component tokens — complete.

---

#### Ready to Execute

Task 1 is well-scoped and I can begin immediately. No blockers — all font assets exist in `primitive-assets/`, all primitive tokens I need to reference exist, and the pipeline infrastructure for semantic and component tokens is established.
