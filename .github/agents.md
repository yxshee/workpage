# AGENTS.md — Portfolio Site Operating Guide

This repository is a personal portfolio built on Next.js App Router. Optimize for fast, safe, minimal diffs with high visual fidelity.

## 1) Repo Snapshot
- Framework: Next.js `16.1.5` + React `19` + TypeScript `5`
- Styling: Tailwind CSS 4 + CSS variables in `src/app/globals.css`
- Animation: Framer Motion in `src/components/OrbitCarousel.tsx`
- Primary content source: `src/lib/data.ts` (`personalInfo` object)

## 2) Source of Truth Rules (Do Not Violate)
- Keep personal/site data in `src/lib/data.ts`.
- Do not hardcode projects, social links, resume URLs, archive years, or contact data inside page/components.
- If content changes, update data first, then map it in UI.

## 3) Key Entry Points
- Root layout: `src/app/layout.tsx`
- Home: `src/app/page.tsx` → `src/components/HomeHero.tsx` → `src/components/OrbitCarousel.tsx`
- Work page: `src/app/work/page.tsx`
- Archive page: `src/app/archive/page.tsx`
- Info page: `src/app/info/page.tsx`
- Header/Footer: `src/components/Header.tsx`, `src/components/Footer.tsx`

## 4) UI Invariants
- Header is fixed and must remain visually separated from page content.
  - Use `.header-bar` styles in `globals.css`.
  - Use `.page-shell` for top spacing on non-home pages.
- Never allow section headings to visually collapse into the fixed header while scrolling.
- Home carousel title/description panel must stay in a reserved area and not collide with rotating cards.
- Custom cursor is site-wide via `CustomCursor.tsx`; hidden for touch devices and reduced-motion.
- Work page project hover image has subtle shrink effect (`scale-[0.97]`) with transition.

## 5) Project Linking Rules
- Work list links should point to external repo URLs (`project.repoUrl`) when available.
- If no `repoUrl` exists, fallback to `personalInfo.socials.github`.
- Avoid dead internal links like `/work/[id]` unless that route is implemented.

## 6) GitHub Profile Canonicalization
- Canonical GitHub profile for this repo: `https://github.com/yxshee`
- If updating docs/data, keep GitHub references aligned to this URL.

## 7) Edit Workflow (Efficiency-First)
1. Discover before editing:
   - `rg --files`
   - `rg -n "<term>" src .github`
2. Make the smallest safe diff.
3. Prefer editing existing components/styles over introducing new abstractions.
4. Reuse existing image assets in `public/images/core/` for placeholders.

## 8) Validation Commands (Run Before Handoff)
- `npm run lint -- --max-warnings=0`
- `npm run build`

If either fails, fix before finishing (unless blocked by an unrelated pre-existing failure; then document exactly what is failing and why).

## 9) Styling & Theming Constraints
- Use CSS variables (`var(--text-high)`, `var(--bg-900)`, etc.) for colors.
- Avoid hardcoded light/dark color utility classes that break theme switching.
- Keep dark mode true-black behavior intact.

## 10) Performance and Safety Defaults
- Prefer `rg` for search and `rg --files` for file discovery.
- Keep animation changes focused; avoid unnecessary global transition changes.
- Avoid destructive git commands (`reset --hard`, checkout file rollback) unless explicitly requested.

## 11) PR/Change Summary Expectations
When handing off changes, include:
- What changed (files + behavior)
- Why it changed
- Validation results (`lint`, `build`)
- Any assumptions/fallbacks used
