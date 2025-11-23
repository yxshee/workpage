# Naming Audit

## Scope
This audit covers naming consistency across `src/` for CSS class selectors, JSX class usage, and JS/TS selector references.

## Taxonomy
- App routes
  - `src/app/page.tsx` (home)
  - `src/app/work/page.tsx`
  - `src/app/archive/page.tsx`
  - `src/app/info/page.tsx`
- Core layout/components
  - `src/app/layout.tsx`
  - `src/components/Header.tsx`
  - `src/components/Footer.tsx`
  - `src/components/HomeHero.tsx`
  - `src/components/OrbitCarousel.tsx`
  - `src/components/CustomCursor.tsx`
- Styling + selector contracts
  - `src/app/globals.css`
  - `src/lib/header-sync.ts`

## Naming Issues Identified

### 1) Mixed semantic and generic class names
- Examples:
  - `.site-header`, `.site-footer`, `.site-content` (layout semantics)
  - `.rotor`, `.slider-item`, `.parallax-item` (generic/mechanical)
  - `.home-root`, `.home-inner` (page-level but non-domain naming)
- Files: `src/app/globals.css`, `src/components/OrbitCarousel.tsx`, `src/components/HomeHero.tsx`, `src/app/layout.tsx`.

### 2) Inconsistent class naming scheme
- Examples:
  - `nav-link` + `nav-link-muted` (dash-variant style)
  - `underline-reveal`, `link-hover` (behavior naming, no block context)
  - `hide-mobile` (utility naming without utility prefix)
- Files: `src/components/Header.tsx`, `src/components/Footer.tsx`, `src/app/info/page.tsx`, `src/app/globals.css`.

### 3) JS selector dependencies coupled to old class names
- `querySelector('.site-header')` in layout and header-sync.
- `closest('.home-root')` and `closest('.slider-item')` in cursor/carousel behavior.
- Files: `src/app/layout.tsx`, `src/lib/header-sync.ts`, `src/components/OrbitCarousel.tsx`, `src/components/CustomCursor.tsx`.

### 4) Utility naming inconsistency
- Utilities like `hide-mobile`, `show-mobile-only`, `preserve-3d` are mixed with component classes.
- Files: `src/app/globals.css`, `src/components/OrbitCarousel.tsx`, `src/components/Header.tsx`.

## High-Risk Coupling Points
- `src/components/OrbitCarousel.tsx`
- `src/components/CustomCursor.tsx`
- `src/app/layout.tsx` (embedded `themeScript` selector)
- `src/lib/header-sync.ts`
- `src/app/globals.css`

## Refactor Wave Target
- Wave 1 (this implementation):
  - Area A: Nav/Header/Footer naming
  - Area B: Orbit/HomeHero/Carousel naming
