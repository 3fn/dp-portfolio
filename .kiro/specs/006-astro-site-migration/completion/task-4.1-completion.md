# Task 4.1 Completion: Update Deploy Workflow

**Date**: 2026-06-04
**Task**: 4.1 Update deploy workflow
**Type**: Implementation
**Status**: Complete

---

## Changes Made

| Field | Old | New |
|-------|-----|-----|
| `node-version` | `'18'` | `'22'` |
| Build command | `npm run build:page` | `npm run build` |
| `localDir` | `'./src'` | `'./_site'` |

SFTP config (host, username, password, remoteDir) unchanged.

---

## Validation

- [x] YAML syntax valid
- [x] Node 22 specified (Astro 6 requirement)
- [x] `npm run build` runs full pipeline (copy:tokens + build:scripts + astro build)
- [x] `localDir` points to Astro output directory
