# Cleanup Audit

## Canonical Commands
| Purpose | Command |
|---------|---------|
| Install | `npm install` |
| Dev | `npm run dev` |
| Build | `npm run build` |
| Lint | `npm run lint` |
| Start | `npm run start` |

## Repo Structure
```
/
├── src/
│   ├── app/           # Next.js App Router
│   │   ├── page.tsx   # Home
│   │   ├── layout.tsx # Root layout
│   │   ├── globals.css
│   │   ├── work/      # /work page
│   │   ├── info/      # /info page
│   │   └── archive/   # /archive page
│   ├── components/    # React components
│   │   ├── CustomCursor.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── HomeHero.tsx (new)
│   │   ├── OrbitCarousel.tsx (new)
│   │   └── ThemeProvider.tsx
│   └── lib/           # Utilities
│       ├── data.ts
│       └── header-sync.ts
├── public/            # Static assets
│   ├── images/        # Project images
│   ├── YashDogra_Resume.pdf (DUPLICATE)
│   └── *.svg          # Icons
├── Certificates/      # Source certificate files (15)
├── docs/              # Documentation (naming guides)
├── report/            # Diagnostics JSON
└── Config files
```

## Build Tooling
- **Framework**: Next.js 16.1.5 (App Router)
- **React**: 19.2.3
- **CSS**: Tailwind CSS v4 + PostCSS
- **Bundler**: Turbopack (via Next.js)

## Dependencies (7 prod, 8 dev)
**Production**: clsx, framer-motion, lucide-react, next, react, react-dom, tailwind-merge
**DevDeps**: @tailwindcss/postcss, @types/node, @types/react, @types/react-dom, eslint, eslint-config-next, tailwindcss, typescript

## Potential Removal Candidates

### Low Risk
| Item | Reason |
|------|--------|
| `YashDogra_Resume.pdf` (root) | Duplicate of `public/YashDogra_Resume.pdf` |
| `BRANCH_ARCHIVE.md` | Historical merge docs, not runtime |
| `CHANGES_SUMMARY.md` | Historical merge docs |
| `final-merge-log.txt` | Historical merge artifact |
| `final-merge-report.md` | Historical merge artifact |
| `merge-conflicts.log` | Historical merge artifact |
| `core-rename-manifest.json` | Historical migration artifact |
| `report/` folder | Diagnostics JSON, not runtime |
| `WORKFLOW.md` | Legacy workflow doc (24KB) |

### Medium Risk
| Item | Reason |
|------|--------|
| `Certificates/` folder | Source files, not served; images already in public/ |
| Unused SVGs in public/ | Need to verify references |

### Needs Verification
| Item | Status |
|------|--------|
| `clsx` | Check if used |
| `tailwind-merge` | Check if used |
| Unused CSS classes | Requires usage analysis |
