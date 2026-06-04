# Task 1.1 Completion: Install Astro and Create Config

**Date**: 2026-06-04
**Task**: 1.1 Install Astro and create config
**Type**: Setup
**Status**: Complete

---

## Artifacts Created/Modified

- `astro.config.mjs` — created (`output: 'static'`, `outDir: '_site'`)
- `package.json` — scripts updated, `astro` + `concurrently` added as devDependencies
- `package-lock.json` — updated (244 packages added)
- `.gitignore` — `_site/` added under Build outputs

---

## Implementation Notes

### Package.json Scripts

| Script | Command |
|--------|---------|
| `build:scripts` | esbuild → `public/scripts/` (changed from `dist/scripts/`) |
| `build` | `npm run build:scripts && astro build` |
| `dev` | `concurrently "astro dev" "npm run build:scripts -- --watch=forever"` |
| `preview` | `astro preview` |

Old `build:page` and `dev` (esbuild-only serve) scripts removed.

### Verification

- `npm run build` passes (esbuild bundles 9 scripts to `public/scripts/`, then Astro builds `_site/`)
- `_site/index.html` exists at root
- Astro found existing `src/pages/index.html` and processed it
- Node 22.20.0 (meets Astro 6 requirement of ≥22.12.0)

---

## Validation

- [x] Astro installed as devDependency
- [x] concurrently installed as devDependency
- [x] `astro.config.mjs` specifies `output: 'static'` and `outDir: '_site'`
- [x] `_site/` in `.gitignore`
- [x] `npm run build` produces `_site/index.html`
- [x] esbuild outputs to `public/scripts/`
