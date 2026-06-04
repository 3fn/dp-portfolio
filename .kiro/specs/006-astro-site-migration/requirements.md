# Requirements Document: Astro Site Migration

**Date**: 2026-06-04
**Spec**: 006 - Astro Site Migration (Phase 1: Parity)
**Status**: Requirements Phase
**Dependencies**: Spec 005 ✅, Spec 007 ✅

---

## Introduction

The portfolio site currently deploys by uploading `./src` to Dreamhost via SFTP, with build artifacts committed to git. This creates broken asset paths, no proper build pipeline, and no multi-page support. This spec migrates the site to Astro for static-site generation — producing a single deployable output directory with correct routing, optimized assets, and clean URLs.

Phase 1 achieves **parity**: the site looks and behaves identically to production, but builds and deploys through Astro.

---

## Requirements

### Requirement 1: Astro Build Pipeline

**User Story**: As a developer, I want the site to build through Astro's static pipeline, so that I have a proper build step producing optimized, deployable output.

#### Acceptance Criteria

1. WHEN `astro build` is run THEN the system SHALL produce a `_site/` directory containing a complete, deployable static site.
2. WHEN `_site/` is produced THEN `index.html` SHALL exist at the root (not nested in `/pages/`).
3. WHEN the build runs THEN it SHALL execute the esbuild script step BEFORE Astro's build (`build:scripts && astro build`).
4. WHEN `astro.config.mjs` is inspected THEN it SHALL specify `output: 'static'` and `outDir: '_site'`.

---

### Requirement 2: Visual Parity

**User Story**: As a portfolio visitor, I want the site to look and behave identically after migration, so that no content or functionality is lost.

#### Acceptance Criteria

1. WHEN the migrated site is viewed THEN all sections SHALL render identically to the pre-migration production site in standard display mode.
2. WHEN interactive elements are used (ecosystem modals, chord diagram, career chart, token animation) THEN they SHALL behave identically.
3. WHEN the page is scrolled THEN all scroll-driven effects (reveal animations, token evolution, scroll-nav) SHALL function identically.
4. WHEN CSS is inspected THEN `portfolio.css` SHALL remain a single file (not split into per-section files).

---

### Requirement 3: Clean URL Structure

**User Story**: As a visitor, I want asset URLs to not expose project internals (`/src/`, `/dist/`), so that URLs are clean and professional.

#### Acceptance Criteria

1. WHEN token CSS is served THEN its URL SHALL be `/tokens/DesignTokens.web.css` (not `/dist/tokens/...`).
2. WHEN scripts are served THEN their URLs SHALL be `/scripts/*.js` (not `/dist/scripts/...`).
3. WHEN fonts are served THEN their URLs SHALL be under `/fonts/` (not `/src/assets/fonts/...`).
4. WHEN illustrations are served THEN their URLs SHALL be under `/illustration/` (not `/src/assets/illustration/...`).
5. WHEN images are served THEN their URLs SHALL be under `/images/` (not `/src/assets/images/...`).
6. WHEN the logo/brand assets are served THEN their URLs SHALL be under `/brand/` (not `/primitive-assets/...`).

---

### Requirement 4: Token CSS Loading

**User Story**: As a developer, I want token CSS to load in the correct order without build-tool interference, so that custom properties cascade correctly.

#### Acceptance Criteria

1. WHEN the page loads THEN token CSS SHALL load in order: system tokens → product tokens.
2. WHEN token CSS is served THEN it SHALL NOT be processed by Vite (no scoping, hashing, or property resolution).
3. WHEN token CSS is served THEN it SHALL reside in `public/tokens/` (static, unprocessed).
4. WHEN `ComponentTokens.web.css` is inspected THEN it SHALL NOT be loaded (no current consumers).

---

### Requirement 5: Component Bundle Isolation

**User Story**: As a developer, I want the Web Component bundle to remain separate from Astro's build, so that Shadow DOM CSS-as-text imports are never broken by Vite processing.

#### Acceptance Criteria

1. WHEN the component bundle is built THEN it SHALL use esbuild with `--loader:.css=text` (not Vite).
2. WHEN Vite processes the project THEN it SHALL NOT touch files in the component bundle source.
3. WHEN `components.js` is served THEN it SHALL execute in `<head>` before DOM rendering (not deferred, not an island).
4. WHEN the dev server runs THEN esbuild SHALL run in watch mode concurrently with Astro dev.

---

### Requirement 6: Script Init/Cleanup Migration

**User Story**: As a developer preparing for Astro islands (Phase 2), I want all page scripts to export init/cleanup functions, so that they can be wrapped as islands without refactoring.

#### Acceptance Criteria

1. WHEN any page script (excluding `components.ts`) is inspected THEN it SHALL export an `init()` function and a `cleanup()` function.
2. WHEN `cleanup()` is called THEN it SHALL remove all event listeners, disconnect observers, and cancel animation frames.
3. WHEN scripts are loaded as `<script type="module">` THEN they SHALL self-initialize via a DOMContentLoaded fallback (backward-compatible boot).
4. WHEN `token-evolution.ts` is inspected THEN it SHALL already satisfy these criteria (completed in Spec 007).

---

### Requirement 7: Asset Path Migration

**User Story**: As a developer, I want all asset references updated to match the new URL structure, so that nothing 404s after migration.

#### Acceptance Criteria

1. WHEN `src/pages/index.astro` is inspected THEN it SHALL contain zero references to `/dist/` or `/src/assets/` or `/primitive-assets/`.
2. WHEN TypeScript files are inspected THEN hard-coded asset paths (e.g., in ecosystem modal data) SHALL use new clean URLs.
3. WHEN font CSS `@font-face` declarations are inspected THEN `url()` paths SHALL resolve correctly from their new location.
4. WHEN `product/experience-map/pages/portfolio/portfolio.yaml` is inspected THEN asset paths SHALL use new clean URLs.

---

### Requirement 8: Deploy Pipeline

**User Story**: As a maintainer, I want pushes to main to automatically build and deploy the Astro output, so that the site stays current without manual intervention.

#### Acceptance Criteria

1. WHEN a push to `main` occurs THEN GitHub Actions SHALL run `npm run build` (which runs `build:scripts && astro build`).
2. WHEN the build succeeds THEN the workflow SHALL upload `_site/` to Dreamhost via SFTP.
3. WHEN the workflow runs THEN it SHALL use Node 22 (Astro 6 requires ≥22.12.0).
4. WHEN the deploy completes THEN the site SHALL be accessible at designerpunk.ai with all assets loading correctly.

---

### Requirement 9: Dev Server

**User Story**: As a developer, I want a local dev server that serves the full site with hot reload, so that I can iterate without manual rebuilds.

#### Acceptance Criteria

1. WHEN `npm run dev` is executed THEN Astro's dev server SHALL start alongside esbuild watch mode.
2. WHEN `.astro` or `.css` files change THEN the dev server SHALL hot-reload the page.
3. WHEN component source files change THEN esbuild SHALL rebuild the bundle and the page SHALL reload.
4. WHEN the dev server is running THEN all asset paths SHALL resolve correctly (same as production).

---

### Requirement 10: Cleanup

**User Story**: As a developer, I want stale artifacts removed, so that the project doesn't carry dead weight into the new architecture.

#### Acceptance Criteria

1. WHEN the migration is complete THEN the 11 orphaned CSS files in `src/styles/` SHALL be deleted (layout.css, stats.css, why-build.css, critical-features.css, cta-footer.css, who-built.css, how-built.css, code-screenshots.css, responsive.css, utilities.css, reveal.css).
2. WHEN the migration is complete THEN `dist/scripts/page.js` SHALL be deleted.
3. WHEN `.gitignore` is inspected THEN `_site/` SHALL be listed.
4. WHEN the old deploy workflow (`localDir: './src'`) is inspected THEN it SHALL be replaced with the Astro output workflow.
