# Cleanup Plan

## Wave 1: Historical/Temporary Artifacts (LOW RISK)

| Candidate | Evidence | Risk | Status |
|-----------|----------|------|--------|
| `BRANCH_ARCHIVE.md` | Merge history only | Low | Pending |
| `CHANGES_SUMMARY.md` | Merge history only | Low | Pending |
| `final-merge-log.txt` | Merge artifact | Low | Pending |
| `final-merge-report.md` | Merge artifact | Low | Pending |
| `merge-conflicts.log` | Merge artifact | Low | Pending |
| `core-rename-manifest.json` | Migration artifact | Low | Pending |
| `report/` folder | Diagnostics only | Low | Pending |

**Verification**: `npm run build` passes

---

## Wave 2: Duplicate Files (LOW RISK)

| Candidate | Evidence | Risk | Status |
|-----------|----------|------|--------|
| `YashDogra_Resume.pdf` (root) | Same file exists in `public/` | Low | Pending |

**Verification**: Resume link still works

---

## Wave 3: Source/Dev Files (MEDIUM RISK)

| Candidate | Evidence | Risk | Status |
|-----------|----------|------|--------|
| `Certificates/` folder | 15 source PDFs/PNGs; processed images in `public/images/` | Medium | Verify first |
| `WORKFLOW.md` | Historical workflow doc | Medium | Verify not linked |

**Verification**: All certificate images display correctly

---

## Wave 4: Unused Dependencies (MEDIUM RISK)

| Candidate | Evidence | Risk | Status |
|-----------|----------|------|--------|
| `clsx` | Check imports | Medium | Search needed |
| `tailwind-merge` | Check imports | Medium | Search needed |

**Verification**: `npm run build && npm run dev`

---

## Wave 5: Unused Public Assets

| Candidate | Evidence | Risk | Status |
|-----------|----------|------|--------|
| `public/file.svg` | Check references | Medium | Search needed |
| `public/globe.svg` | Check references | Medium | Search needed |
| `public/next.svg` | Check references | Medium | Search needed |
| `public/vercel.svg` | Check references | Medium | Search needed |
| `public/window.svg` | Check references | Medium | Search needed |

**Verification**: No 404s on all pages
