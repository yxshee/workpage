# Naming Standard

## Goals
- Predictable and semantic names.
- One naming scheme across CSS/JS selectors.
- Mechanical renames with zero behavior drift.

## CSS Naming

### Pattern
- Use semantic BEM-like kebab-case:
  - Block: `.header-nav`, `.orbit-carousel`
  - Element: `.header-nav__link`, `.orbit-carousel__card`
  - Modifier: `.header-nav__link--muted`, `.orbit-carousel__card--parallax`

### Utilities
- Utility classes must use `u-` prefix:
  - Example: `.u-hide-mobile`, `.u-preserve-3d`

### Rules
- Avoid generic names like `item`, `box`, `temp`, `thing`.
- Avoid parallel naming schemes for same concept.

## JS/TS Naming
- `camelCase` for variables/functions.
- `PascalCase` for components/types.
- Event handlers use `onXxx`/`handleXxx`.
- Keep selector names synchronized with CSS and JSX.

## File/Folder Naming
- React component files remain `PascalCase`.
- CSS class names remain kebab-case BEM-style.

## Selector Mapping Rule (Critical)
Any CSS class/ID rename requires updating all of:
1. JSX `className` usage.
2. JS/TS selectors (`querySelector`, `closest`, `getElementById`, etc.).
3. Docs/comments that reference selector contracts.

## Validation Rule
Each rename wave must pass:
- `npm run lint -- --max-warnings=0`
- `npm run build`
- local route smoke checks (`/`, `/work`, `/archive`, `/info`)
