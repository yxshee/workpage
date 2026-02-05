# Stability Tracker

## Issues

| ID | Page | Symptom | Root Cause | Fix | Status |
|----|------|---------|------------|-----|--------|
| S1 | Homepage | Carousel, title, details desync | `activeProjectIndex` and `selectedProjectIndex` separate | Sync effect in OrbitCarousel.tsx:438-449 | ✅ Fixed |
| S2 | Work | "Crashes and flickering" | Code review: guards in place, proper cleanup | None needed - needs browser test | ⏳ Pending test |
| S3 | Archive | "Critical errors" | Simple SSR page, no complex client code | None needed - needs browser test | ⏳ Pending test |

## Code Review Summary

### RecursiveSketchBackground.tsx ✅
- Proper cleanup (lines 428-437): destroys p5, disconnects observers, removes listeners

### CustomCursor.tsx ✅  
- Mounted at root layout, persists across routes
- Proper RAF cleanup, listener cleanup

### WorkList.tsx ✅
- Guards `window.CursorController` before use
- Images preloaded for flicker-free previews
