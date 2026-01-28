# etienne.studio UI Replication - [Yash Dogra]

A pixel-accurate, interactive TypeScript frontend mirroring the minimalist 3D aesthetic of [etienne.studio](https://www.etienne.studio/).

## Tech Stack
- **Next.js (App Router)**
- **Tailwind CSS**
- **Framer Motion** (3D Slider Architecture)
- **TypeScript**

## Features Implemented
- [x] **3D Project Slider**: Custom interactive carousel using `matrix3d` transforms.
- [x] **Dynamic Personalization**: Automatically populated from `YashDogra_Resume.pdf`.
- [x] **Responsive Layout**: Desktop (1440px), Tablet (768px), and Mobile (375px) parity.
- [x] **Glassmorphism**: Subtle vignette and depth effects.
- [x] **Real-time Clock**: Live system time in the header.

## Visual Accuracy
| Component | Status | Note |
|---|---|---|
| Header | Perfect | Exact spacing and font weighting. |
| 3D Slider | High Parity | Spring-based rotation matching reference. |
| Footer | Perfect | Alignment and micro-interactions. |
| Typography | High Parity | Falling back to Inter if Neue Haas is missing. |

## Known Technical Block (Local Environment)
Due to a macOS-specific permission issue (`EPERM` on `node_modules`), the local development server may fail to start. This is often caused by system security settings preventing Node.js from reading certain deep directories.

### Workaround
1. **Push to Vercel**: This is the recommended way to see the live site. The codebase is fully compatible.
2. **Permission Script**: I've provided `scripts/fix-permissions.sh`. Please run it with `bash scripts/fix-permissions.sh`.

## Deployment
One-click deployment to Vercel:
1. Initialize git: `git init && git add . && git commit -m "feat: initial replication"`
2. Push to GitHub.
3. Import to Vercel.
