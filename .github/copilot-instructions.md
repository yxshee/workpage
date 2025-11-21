# Copilot Instructions - Portfolio Site

## Architecture Overview

This is a **Next.js 16+ App Router** portfolio site built with React 19, TypeScript 5, and Tailwind CSS 4. It features a 3D carousel, theme switching, and Framer Motion animations.

### Key Architectural Decisions
- **Single Source of Truth**: All content lives in `src/lib/data.ts` (`personalInfo` object). Never hardcode personal info, projects, certifications, or skills in components.
- **CSS Variables over Tailwind classes**: Theme colors use CSS custom properties defined in `globals.css` (e.g., `var(--text-high)`, `var(--bg-900)`) for seamless light/dark switching.
- **Client Components**: Animation-heavy components (`Slider3D`, `ThemeProvider`, `Header`) use `"use client"` directive.

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── layout.tsx       # Root layout with ThemeProvider, Header, Footer
│   ├── globals.css      # CSS variables, theme tokens, component classes
│   └── [route]/page.tsx # Route pages (work, info, archive)
├── components/          # Reusable React components
│   └── ThemeProvider.tsx # Exposes global ThemeController on window
├── lib/
│   └── data.ts          # ALL content data - projects, skills, certs
```

## Styling Patterns

### Theme System
- Light/dark mode via `data-theme="dark"` attribute on `<html>`
- True black (#000000) in dark mode, off-white (#fcfcfc) in light
- Access theme programmatically: `window.ThemeController.set('dark' | 'light' | 'system')`

### CSS Variable Usage (Required Pattern)
```tsx
// ✅ Correct - inline style with CSS variables
<div style={{ color: 'var(--text-high)', backgroundColor: 'var(--bg-900)' }}>

// ❌ Avoid - hardcoded colors that break theme switching
<div className="text-black bg-white">
```

### Key CSS Variables
| Variable | Light | Dark | Usage |
|----------|-------|------|-------|
| `--bg-900` | #fcfcfc | #000000 | Main background |
| `--text-high` | #0a0a0a | #F7F7F9 | Primary text |
| `--accent` | #0008ff | #D4AF37 | Accent/links |
| `--muted-500` | #999999 | #5B6470 | Secondary text |
| `--site-header-height` | dynamic | dynamic | Header offset (synced via JS) |

## Component Conventions

### Page Layout Pattern
```tsx
// Non-home pages use shared shell spacing under fixed header
<div className="page-shell min-h-screen ...">
```

### Header + Spacing Rules
- Fixed header must use `site-header` class (see `src/components/Header.tsx`)
- Header-height sync targets `.site-header` in `src/app/layout.tsx` and `src/lib/header-sync.ts`
- Avoid inline page padding top on route pages; use `.page-shell` from `globals.css`

### Adding New Content
1. Add data to `personalInfo` object in `src/lib/data.ts`
2. Import and map in components: `import { personalInfo } from "@/lib/data"`

### Image Handling
- Images stored in `public/images/core/`
- Use Next.js `<Image>` component with `fill` or explicit dimensions
- WebP format preferred for performance

## Developer Workflow

```bash
npm run dev    # Development server at localhost:3000
npm run build  # Production build
npm run lint   # ESLint with Next.js rules
```

### ESLint Notes
- Uses ESLint 9 flat config (`eslint.config.mjs`)
- Some hooks rules have intentional suppressions documented with `// eslint-disable-next-line` + explanation

## Animation Patterns

### Framer Motion Usage
- Wrap animated elements in `motion.div`
- Use `prefersReducedMotion` check for accessibility (see `Slider3D.tsx`)

### 3D Carousel (Slider3D)
- Controlled by scroll/touch events on home page
- Uses CSS 3D transforms with `transform-style: preserve-3d`
- Continuous RAF loop for smooth animation
- Keep title/description inside the reserved `project-info-panel` area to prevent overlap with rotating cards

## UX Invariants
- Work page hover preview: image appears on hover with subtle shrink effect (`scale-[0.97]`)
- Custom cursor is site-wide via `CustomCursor.tsx` component in layout; respects touch devices and reduced-motion
- Default system cursor hidden via `globals.css` only for `(hover: hover) and (pointer: fine)` devices
- Link micro-interactions use `.underline-reveal` and `.link-hover` classes for consistent hover effects
- External project links should use `project.repoUrl` with fallback to `personalInfo.socials.github`

## Micro-interaction Classes
| Class | Effect |
|-------|--------|
| `.underline-reveal` | Animated underline on hover |
| `.link-hover` | Subtle translateY + opacity shift |
| `.arrow-nudge` | Arrow slides right on hover |
| `.heading-hover` | Letter-spacing shift on hover |

