# Yash Dogra | Portfolio

A creative developer & ML engineer portfolio site specializing in NLP and computer vision.

## Tech Stack

- **Framework**: Next.js 16+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + PostCSS
- **Animations**: Framer Motion
- **3D Graphics**: CSS 3D Transforms

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view.

## Pages

| Route      | Description                              |
|------------|------------------------------------------|
| `/`        | Home with interactive 3D project carousel |
| `/work`    | Detailed project portfolio               |
| `/info`    | About & information                      |
| `/archive` | Project archive                          |

## Project Structure

```
src/
├── app/           # Next.js App Router pages
├── components/    # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Slider3D.tsx
│   └── ThemeProvider.tsx
├── lib/           # Utilities and data
│   └── data.ts
public/
└── images/        # Static assets
```

## Features

- 🎨 Light/Dark theme with system preference detection
- 🎠 Interactive 3D carousel with scroll/touch controls
- ✨ Smooth parallax effects and animations
- 📱 Fully responsive design
- ♿ Reduced motion support for accessibility

