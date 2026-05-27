# Spec Feedback: 003 Portfolio System Readiness — Design Outline

**Spec**: 003-portfolio-system-readiness
**Created**: 2026-05-25

---

## Design Outline Feedback

### Context for Reviewers

- Spec 002 (Token Compliance Audit) is complete and provides the value mappings → design-outline.md § "Context"
- @3fn/core v11.7.0 shipped product token infrastructure (format, generation, validation, MCP) → design-outline.md § "Layer 2: Product Token Infrastructure"
- Three layers can execute in parallel → design-outline.md § "Sequencing"
- Layer 2 is now resolved implementation, not open design discussion → design-outline.md § "Status: RESOLVED"
- Lessons learned doc captures the governance gap discovery → `product/lessons-learned/2026-05-25-product-level-token-governance-gap.md`

### Stakeholders

| Agent | Reason |
|-------|--------|
| Ada | Layer 1 token creation (5 primitives, 3 semantics, 1 update) |
| Leonardo | Layer 2 product token authoring + Layer 3 screen spec |
| Sparky | Consumer of all three layers in Spec 004 |
| Thurgood | Governance review, spec quality |

---

#### [THURGOOD R1]

**Overall Assessment**: Ready for Peter review with minor items below. The outline is well-structured, clearly scoped, and the Layer 2 simplification is handled cleanly.

**Strengths:**
- Layer 2 "RESOLVED" framing is excellent — captures what shipped, what questions it answered, and what tasks remain. No ambiguity.
- Sequencing diagram is clear and the parallel execution story is credible.
- Risk section is honest and mitigations are practical.
- Token tables have formula/rationale — Ada can execute without guesswork.

**Items to address:**

1. **Lessons learned vs design outline inconsistency** → design-outline.md § "Layer 2"
   - The lessons learned doc (2026-05-25) describes `src/styles/layout-tokens.css` with `--layout-*` prefix as the resolution. The design outline describes `product/tokens/layout.yaml` generating `--product-layout-*` prefixed properties. These are different naming conventions and file locations. The outline should explicitly note that v11.7.0 supersedes the interim resolution from the lessons learned doc, or the lessons learned doc needs an addendum.

2. **Layer 2 task list references `designerpunk.config.ts`** → design-outline.md § "Tasks for This Spec"
   - Does this file exist in the project? If not, this is a setup task that should be called out. If it's created by `npx designerpunk init` or similar, note that.

3. **Layer 3 scope is vague relative to Layers 1 and 2** → design-outline.md § "Layer 3"
   - Layers 1 and 2 have concrete token tables and task lists. Layer 3 says "update to reflect current page architecture" without specifying what the current architecture IS. During requirements formalization, this needs to become concrete — either reference the prototype directly or enumerate the sections/interactions.

4. **Documentation requirements are Layer 1 only** → design-outline.md § "Documentation Requirements"
   - Layer 2 also introduces a new pattern (product token authoring). Should there be documentation requirements for the product token workflow? Or does v11.7.0's own docs cover this?

5. **Success criteria count mismatch** → design-outline.md § "Success Criteria"
   - "All 8 new/updated tokens" — I count 5 primitives + 3 new semantics + 1 updated semantic = 9. Verify the count.

6. **[@ADA] Token formula validation** → design-outline.md § "Layer 1"
   - `blur400` uses `base × 4 = 16 × 4`. What's the shadow blur base (16)? Is this documented in the shadow family? The spacing base (8) and shadow offset base (4) are established — is blur base (16) a new family constant that needs documentation?

7. **[@LEONARDO] Layer 3 dependency statement** → design-outline.md § "Dependency on Layer 2"
   - "Layer 2's naming decisions must be resolved before Layer 3 can be finalized" — but naming IS resolved (v11.7.0 shipped it). Should this dependency note be removed or reworded to say "Layer 2 tokens must be authored (not designed) before Layer 3 references them"?

**Governance concerns:**
- None blocking. The spec correctly routes token creation to Ada, product authoring to Leonardo, and consumption to Sparky.
- Agent ownership in the header uses "→" chaining which implies sequence, but the body says parallel. Minor — clarify in requirements.

**Structural assessment:**
- Ready for requirements formalization after Peter reviews the items above.
- The three-layer structure maps cleanly to three parent tasks in tasks.md.
- Layer 2's "Previously Open Questions — Now Resolved" table is excellent institutional memory — preserve this in the design doc.

---

**Recommendation**: Present to Peter for review. Items 1 and 5 should be resolved before requirements.md is written. Items 3, 4, 6, 7 can be addressed during formalization.
