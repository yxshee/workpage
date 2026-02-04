# Design System

> Single source of truth for design tokens, layout rules, and component patterns.
> Last updated: 2026-02-05

---

## Architecture Summary

| Layer | Technology | Notes |
|-------|------------|-------|
| Framework | Next.js 16.1.5 | App Router |
| Styling | Tailwind CSS v4 + BEM classes | CSS-first config via `@import "tailwindcss"` |
| Animation | Framer Motion 12 | Used in OrbitCarousel, transitions |
| Icons | lucide-react | SVG icon set |

**Style file:** `src/app/globals.css` (~1,400 lines)

---

## Spacing Scale (8px base)

| Token | Value | Pixels | Use case |
|-------|-------|--------|----------|
| `--space-1` | `0.25rem` | 4px | Tight gaps, inline spacing |
| `--space-2` | `0.5rem` | 8px | Icon gaps, small padding |
| `--space-3` | `0.75rem` | 12px | Compact component padding |
| `--space-4` | `1rem` | 16px | Default component padding |
| `--space-5` | `1.5rem` | 24px | Section internal spacing |
| `--space-6` | `2rem` | 32px | Between sections |
| `--space-8` | `3rem` | 48px | Major section breaks |
| `--space-10` | `4rem` | 64px | Page-level spacing |

**Fluid tokens:**
- `--container-pad`: responsive container gutter
- `--section-gap`: vertical rhythm between major sections
- `--content-gap`: internal content spacing

---

## Typography Scale

| Token | Value | Use case |
|-------|-------|----------|
| `--text-xs` | `clamp(0.56rem, 1.7vw, 0.66rem)` | Labels, captions, meta |
| `--text-sm` | `clamp(0.7rem, 2.2vw, 0.82rem)` | Secondary text, nav links |
| `--text-base` | `clamp(0.88rem, 2.8vw, 1rem)` | Body copy |
| `--text-lg` | `clamp(1rem, 3.2vw, 1.2rem)` | Lead paragraphs |
| `--h2-size` | `clamp(1.7rem, 8vw, 2.8rem)` | Section headings |
| `--h1-size` | `clamp(2.6rem, 13vw, 4.5rem)` | Page titles |

**Line heights:**
- `--line-tight`: 0.9 (headings)
- `--line-copy`: 1.45 (body)

**Font stack:** `"Neue Haas Grotesk Display Pro", "Inter", sans-serif`

---

## Color Palette

### Light Mode (default)

| Token | Value | Purpose |
|-------|-------|---------|
| `--bg-900` | `#fcfcfc` | Page background |
| `--bg-800` | `#f5f5f5` | Secondary background |
| `--surface-700` | `#ffffff` | Cards, panels |
| `--surface-600` | `#fafafa` | Alternate surface |
| `--text-high` | `#0a0a0a` | Primary text |
| `--text-medium` | `#333333` | Secondary text |
| `--muted-500` | `#999999` | Tertiary/disabled |
| `--accent` | `#0008ff` | Brand blue |
| `--accent-strong` | `#0006cc` | Hover state |
| `--border` | `rgba(0,0,0,0.08)` | Subtle borders |
| `--glass` | `rgba(0,0,0,0.02)` | Glass surfaces |

### Dark Mode (`[data-theme="dark"]`)

| Token | Value |
|-------|-------|
| `--bg-900` | `#000000` |
| `--bg-800` | `#0a0a0a` |
| `--surface-700` | `#111111` |
| `--text-high` | `#f7f7f9` |
| `--accent` | `#d4af37` (gold) |

---

## Radius Scale

| Token | Value | Use case |
|-------|-------|----------|
| `--radius-sm` | `0.25rem` | Badges, chips |
| `--radius-md` | `0.5rem` | Cards, inputs |
| `--radius-lg` | `0.75rem` | Modals, panels |
| `--radius-full` | `9999px` | Pills, avatars |

---

## Shadow Scale

| Token | Value | Use case |
|-------|-------|----------|
| `--shadow-1` | `0 6px 20px rgba(0,0,0,0.08)` | Cards, dropdowns |
| `--shadow-2` | `0 12px 32px rgba(0,0,0,0.12)` | Elevated panels |
| `--shadow-3` | `0 20px 48px rgba(0,0,0,0.18)` | Modals |

---

## Breakpoints

| Name | Width | Targets |
|------|-------|---------|
| `sm` | 481px | Large phones, small tablets |
| `md` | 769px | Tablets |
| `lg` | 1025px | Small laptops |
| `xl` | 1281px | Desktop |
| `2xl` | 1537px | Large desktop |

---

## Layout Primitives

### Container
```css
.container {
  width: min(100%, var(--container-max));
  margin-inline: auto;
  padding-inline: var(--container-pad);
}
```

### Section
```css
.section {
  padding-block: var(--section-gap);
}
```

### Stack (vertical rhythm)
```css
.stack > * + * {
  margin-top: var(--stack-gap, var(--space-4));
}
```

---

## Component Patterns

### Buttons
- `.btn` — base button reset
- `.btn--primary` — accent background, light text
- `.btn--secondary` — transparent, border, accent text
- `.btn--ghost` — transparent, no border, accent text on hover

### Glass Panels
```css
.glass-panel {
  backdrop-filter: blur(6px);
  background: var(--glass);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-1);
}
```

### Focus States
```css
:focus-visible {
  outline: var(--focus);
  outline-offset: 2px;
}
```
Where `--focus: 2px solid rgba(0, 8, 255, 0.2)` (light) or gold-tinted (dark).

---

## Change Log

### 2026-02-05 — Design System Refactor

#### Phase 1: Token Consolidation
- Aligned spacing scale to 8px base (`--space-1` through `--space-10`)
- Removed `--space-7` (2.5rem) as it breaks 8px alignment
- Added `--space-10` (4rem / 64px) for page-level gaps
- Added `--shadow-2`, `--shadow-3` for elevation hierarchy
- Removed redundant `--color-*` aliases (use canonical tokens)
- Fixed `--radius-sm` from 0.2rem → 0.25rem for 4px alignment
- Added `--radius-full: 9999px` for pill shapes

#### Phase 2: Global Resets
- Removed aggressive `font-weight: 300 !important` hack from all headings
- Split heading and bold/strong weight rules for semantic correctness
- Scoped scrollbar hiding to `html, body` only (was `*`)
- Preserved accessibility by keeping scrollbar functionality

#### Phase 3: Layout Primitives
- Added `.container` — max-width + auto margins + padding
- Added `.section` / `.section--sm` / `.section--lg` — vertical rhythm
- Added `.stack` / `.stack--sm` / `.stack--lg` — vertical spacing
- Added `.cluster` — flexbox with wrap and gap
- Added `.center` — flex centering utility

#### Phase 4: Button System
- Added `.btn` base with consistent sizing (44px min-height)
- Added `.btn--primary`, `.btn--secondary`, `.btn--ghost` variants
- Added `.btn--sm`, `.btn--lg` size variants
- Added disabled state styling

#### Phase 5: Text Color Utilities
- Added `.text-high`, `.text-medium`, `.text-muted`, `.text-accent`
- Added `.bg-primary`, `.bg-surface`
- Added `.border-subtle`

#### Phase 6: Component Cleanup
- Removed inline `style={{}}` props from Header, Footer, pages
- Consolidated colors to CSS classes for theme consistency
- Added border styling to `.work-list__row`, `.archive-table__row`
- Added `.info-cert-item` border styling

#### Pre-existing Issues (not addressed)
- 2 ESLint warnings in WorkList.tsx and OrbitCarousel.tsx about `setState` in effects
- These are React pattern issues, not styling concerns

---

## Guidelines

1. **Use tokens, not magic numbers** — Every spacing, color, and size should reference a token.
2. **Prefer composition over customization** — Combine `.container`, `.section`, `.stack` rather than writing custom layout rules.
3. **Respect the scale** — If a value isn't in the scale, question whether it's needed.
4. **Mobile-first** — Base styles target mobile; use `min-width` media queries to enhance.
5. **Accessibility** — Maintain 44px tap targets, visible focus rings, sufficient contrast.
