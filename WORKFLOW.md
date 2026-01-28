# Portfolio Website - Technical Workflow & Architecture

## Table of Contents

1. [Application Architecture](#application-architecture)
2. [Component Workflow](#component-workflow)
3. [Data Flow Architecture](#data-flow-architecture)
4. [Page Workflows](#page-workflows)
5. [Animation & Interaction Flow](#animation--interaction-flow)
6. [Styling System](#styling-system)
7. [Build & Deployment Pipeline](#build--deployment-pipeline)

---

## Application Architecture

### Technology Stack Overview

```
┌─────────────────────────────────────────────────────────┐
│                    NEXT.JS 16.1.5                       │
│                  (App Router Pattern)                   │
├─────────────────────────────────────────────────────────┤
│  React 19.2.3 │ TypeScript 5 │ Tailwind CSS 4           │
├─────────────────────────────────────────────────────────┤
│  Framer Motion 12.29.2 │ Lucide React 0.563.0           │
├─────────────────────────────────────────────────────────┤
│  PostCSS 4 │ ESLint 9 │ clsx 2.1.1                      │
└─────────────────────────────────────────────────────────┘
```

### High-Level Architecture Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                      USER BROWSER                             │
│  ┌────────────────────────────────────────────────────────┐  │
│  │              Next.js Application                        │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │  App Router (src/app/)                           │  │  │
│  │  │  ├─ / (Home - 3D Carousel)                       │  │  │
│  │  │  ├─ /work (All Projects)                         │  │  │
│  │  │  ├─ /info (Professional Info)                    │  │  │
│  │  │  └─ /archive (Achievements)                      │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │  Components (src/components/)                    │  │  │
│  │  │  ├─ Header (Navigation)                          │  │  │
│  │  │  ├─ Hero (Hero Section)                          │  │  │
│  │  │  ├─ Slider3D (3D Carousel)                       │  │  │
│  │  │  ├─ Footer (Social Links)                        │  │  │
│  │  │  └─ CertificatesSection (Cert Display)           │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │  Data Layer (src/lib/data.ts)                    │  │  │
│  │  │  └─ personalInfo (Single Source of Truth)        │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

### Directory Structure & Responsibilities

```
src/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Home page - renders Hero + Slider3D
│   ├── layout.tsx                # Root layout - wraps all pages
│   ├── globals.css               # Global styles - reset, base styles
│   ├── work/
│   │   └── page.tsx              # Work page - all projects listing
│   ├── info/
│   │   └── page.tsx              # Info page - about, education, skills, certs
│   └── archive/
│       └── page.tsx              # Archive page - achievements, publications
│
├── components/                   # Reusable React components
│   ├── Header.tsx                # Navigation header - fixed position
│   ├── Hero.tsx                  # Hero wrapper - renders Slider3D
│   ├── Slider3D.tsx              # 3D carousel - scroll-linked rotation
│   ├── Footer.tsx                # Footer - social links
│   └── CertificatesSection.tsx   # Certificate display - used in Info page
│
├── lib/
│   └── data.ts                   # Single source of truth for all content
│
└── styles/                       # Additional CSS modules (if needed)
```

---

## Component Workflow

### 1. **Page Components** (src/app/*/page.tsx)

#### Structure Pattern
```typescript
// src/app/page.tsx (Home)
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      {/* CertificatesSection removed from home */}
    </div>
  );
}
```

#### Page Responsibilities
| File | Purpose | Renders |
|------|---------|---------|
| `page.tsx` | Home | Hero → Slider3D |
| `work/page.tsx` | Project showcase | Grid/list of projects |
| `info/page.tsx` | Professional info | Education, skills, certs |
| `archive/page.tsx` | Achievements | Publications, sports, roles |

#### Data Consumption Pattern
```typescript
import { personalInfo } from "@/lib/data";

export default function WorkPage() {
  return (
    <>
      {personalInfo.projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </>
  );
}
```

### 2. **Layout Component** (src/app/layout.tsx)

**Workflow:**
```
layout.tsx (renders once for all pages)
├── Metadata setup
├── HTML/Body structure
├── Header (fixed/sticky)
├── {children} (current page)
└── Footer
```

**Responsibilities:**
- Global HTML structure
- Header navigation (persistent across pages)
- Footer information (persistent across pages)
- Metadata for SEO
- Global CSS imports

### 3. **Presentation Components**

#### Header Component (src/components/Header.tsx)
```
Header
├── Logo/Branding
├── Navigation Links
│   ├── Home (/)
│   ├── Work (/work)
│   ├── Info (/info)
│   └── Archive (/archive)
└── Social Links (optional)
```

**Workflow:**
1. Render navigation based on current route
2. Highlight active page
3. Responsive menu (mobile hamburger if needed)
4. Fixed positioning for always-visible navigation

#### Hero Component (src/components/Hero.tsx)
```
Hero
├── Hero Image/Background
├── Main Heading
├── Subheading
└── → Slider3D (child)
```

**Workflow:**
1. Display hero image
2. Show intro text
3. Render Slider3D carousel
4. Handle scroll events (passed to Slider3D)

#### Slider3D Component (src/components/Slider3D.tsx)

**Data Flow:**
```
useScroll() hook
    ↓
    Detects scroll progress [0 → 1]
    ↓
useTransform()
    ↓
    Maps scroll to rotation degrees [0 → -720°]
    ↓
useSpring()
    ↓
    Applies physics-based smoothing
    ↓
rotation value
    ↓
Apply to DOM via Framer Motion
    ↓
CSS 3D transforms
    ↓
Visual carousel rotation
```

**Component States:**
- **Active card:** scale-100, opacity-100
- **Inactive cards:** scale-90, opacity-60
- **Transition:** Smooth spring animation

#### Footer Component (src/components/Footer.tsx)
```
Footer
├── Copyright info
├── Social media links
│   ├── GitHub
│   ├── LinkedIn
│   └── Instagram
└── Contact info
```

#### CertificatesSection Component
```
CertificatesSection
├── Section heading
├── Certificate grid
├── Individual cert cards
│   ├── Certification image
│   ├── Title
│   ├── Issuer
│   └── Year
└── Responsive layout
```

**Usage:** Only in `/info` page now (removed from home)

---

## Data Flow Architecture

### Single Source of Truth Pattern

```
src/lib/data.ts (personalInfo object)
        ↓
    Imported by components
        ↓
   Components process/display data
        ↓
   User sees rendered content
```

### Data Structure

```typescript
personalInfo = {
  // Basic Information
  name: "Yash Dogra"
  role: "AI/ML Engineer & Full-Stack Developer"
  location: "Hamirpur, Himachal Pradesh"
  email: "yxshdogra@gmail.com"
  phone: "+91 7876205914"
  
  // Social Media
  socials: {
    instagram: "https://instagram.com/yxshdogra"
    linkedin: "https://linkedin.com/in/yashdogra"
    github: "https://github.com/yashdogra"
  }
  
  // Professional Summary
  summary: "Computer Science undergraduate..."
  
  // Education Array
  education: [
    {
      institution: "Thapar Institute...",
      degree: "B.E. Computer Science",
      period: "2021 – 2025",
      score: "CGPA: 8.11",
      location: "Patiala, Punjab"
    }
  ]
  
  // Skills Categorized
  skills: {
    languages: ["Python", "C++", "SQL", "R"]
    frameworks: ["TensorFlow", "Keras", "PyTorch", ...]
    dataTools: ["NumPy", "Pandas", "Power BI", ...]
    devTools: ["Git", "GitHub", "VS Code", ...]
  }
  
  // Projects Array
  projects: [
    {
      id: 1,
      title: "MapMitra",
      category: "React • Node.js • MongoDB",
      year: "2024",
      image: "/images/core/image1.webp",
      description: "Real-time campus navigation...",
      technologies: ["React", "Node.js", "MongoDB", ...]
    }
  ]
  
  // Certifications Array
  certifications: [
    {
      id: 1,
      title: "NVIDIA Fundamentals...",
      year: "2025",
      issuer: "NVIDIA",
      image: "/images/core/page3-image1.webp"
    }
  ]
  
  // Archive Array
  archive: [
    {
      id: 101,
      title: "ICICC 2025 Research...",
      year: "2025",
      type: "Publication",
      image: "/images/core/page3-image1.webp"
    }
  ]
  
  // Hero Image
  heroImage: "/images/core/thegreats.webp"
}
```

### Data Update Workflow

```
User wants to add a new project
    ↓
Edit src/lib/data.ts
    ↓
Add new object to projects array
    ↓
Add image to public/images/core/
    ↓
Save file
    ↓
Next.js hot reload
    ↓
Project appears on all pages using personalInfo.projects
    ↓
No component changes needed!
```

---

## Page Workflows

### Home Page Workflow (/)

```
Visit localhost:3000
    ↓
Next.js renders page.tsx (src/app/page.tsx)
    ↓
Renders Hero component
    ↓
Hero renders Slider3D component
    ↓
Slider3D imported personalInfo.projects
    ↓
Component initializes scroll listeners
    ↓
User sees:
├─ Hero image
├─ Site intro
└─ 3D carousel displaying 4 projects
    ↓
User scrolls
    ↓
useScroll detects scroll progress
    ↓
rotation angle updates
    ↓
3D cards rotate into view
    ↓
Active card scales up and highlights
```

**Key Components:**
- Hero.tsx
- Slider3D.tsx
- Header.tsx
- Footer.tsx

### Work Page Workflow (/work)

```
Navigate to /work
    ↓
Next.js renders work/page.tsx
    ↓
Component imports personalInfo
    ↓
Maps over personalInfo.projects
    ↓
Renders ProjectCard for each
    ↓
User sees:
├─ All projects listed
├─ Full descriptions
├─ Technologies used
└─ Year/category info
    ↓
User clicks/hovers
    ↓
Card animations trigger
    ↓
Detailed view or navigation
```

**Data Usage:**
```typescript
{personalInfo.projects.map((project) => (
  <ProjectCard key={project.id} {...project} />
))}
```

### Info Page Workflow (/info)

```
Navigate to /info
    ↓
Next.js renders info/page.tsx
    ↓
Imports personalInfo
    ↓
Renders sections:
├─ Summary
├─ Contact
├─ Education
│   └─ Maps personalInfo.education
├─ Skills
│   └─ Shows all 4 skill categories
└─ Certifications
    └─ CertificatesSection component
        └─ Maps personalInfo.certifications
    ↓
User sees:
├─ Professional summary
├─ Contact information
├─ Education history
├─ All skills organized
└─ 14+ professional certifications
```

**Key Features:**
- Responsive 2-column layout (desktop)
- Single-column on mobile
- Organized sections
- Certificate images visible
- All certifications in one place

### Archive Page Workflow (/archive)

```
Navigate to /archive
    ↓
Next.js renders archive/page.tsx
    ↓
Maps personalInfo.archive array
    ↓
Renders achievement items
    ↓
User sees:
├─ ICICC 2025 publication
├─ Sports achievements
└─ Leadership roles
    ↓
Items displayed chronologically
    ↓
Each shows:
├─ Title
├─ Year
├─ Type/Category
└─ Image/Badge
```

---

## Animation & Interaction Flow

### 3D Carousel Animation System

#### Step 1: Scroll Detection
```
Browser Scroll Event
    ↓
useScroll() hook captures
    ↓
scrollYProgress [0 to 1]
    ↓
(0 = top, 1 = bottom)
```

#### Step 2: Rotation Calculation
```
scrollYProgress [0 → 1]
    ↓
useTransform([0, 1], [0, -720])
    ↓
rotation degrees [-0 → -720]
    ↓
(720 degrees = 2 full rotations)
```

#### Step 3: Physics Spring
```
raw rotation value
    ↓
useSpring(value, {
  stiffness: 50,
  damping: 30
})
    ↓
Smooth, bouncy animation
    ↓
No jittery jumps
```

#### Step 4: DOM Application
```
rotation value (Framer Motion)
    ↓
Apply CSS transform:
rotateY({rotation}deg)
    ↓
3D carousel rotates
```

#### Step 5: Active Index Calculation
```
rotation value update
    ↓
Calculate:
normalizedRotation = ((value % 360) + 360) % 360
activeIndex = round(rotation / angleStep) % itemCount
    ↓
Update state
    ↓
Trigger re-render
```

#### Step 6: Styling Application
```
For each card:
if (index === activeIndex) {
  scale-100, opacity-100 ← visually prominent
} else {
  scale-90, opacity-60 ← visually recessed
}
```

### Interaction Flow Diagram

```
┌────────────────────────────────┐
│   User Scrolls Page            │
└────────────┬───────────────────┘
             ↓
┌────────────────────────────────┐
│ browser scroll event fires      │
│ → Framer Motion useScroll hook  │
└────────────┬───────────────────┘
             ↓
┌────────────────────────────────┐
│ scrollYProgress value updated   │
│ [0 → 1]                        │
└────────────┬───────────────────┘
             ↓
┌────────────────────────────────┐
│ useTransform calculates         │
│ rotation degrees [-0 → -720]   │
└────────────┬───────────────────┘
             ↓
┌────────────────────────────────┐
│ useSpring applies physics       │
│ (smooth, bouncy animation)     │
└────────────┬───────────────────┘
             ↓
┌────────────────────────────────┐
│ rotation angle triggers state   │
│ calculation of activeIndex      │
└────────────┬───────────────────┘
             ↓
┌────────────────────────────────┐
│ Component re-renders with       │
│ updated activeIndex             │
└────────────┬───────────────────┘
             ↓
┌────────────────────────────────┐
│ CSS classes applied:            │
│ ├─ Active: scale-100 opacity-100│
│ └─ Inactive: scale-90 opacity-60│
└────────────┬───────────────────┘
             ↓
┌────────────────────────────────┐
│ DOM nodes updated with          │
│ CSS transforms and styles      │
└────────────┬───────────────────┘
             ↓
┌────────────────────────────────┐
│ Browser renders visual update   │
│ User sees carousel rotation    │
└────────────────────────────────┘
```

---

## Styling System

### CSS Architecture

#### Global Styles (src/app/globals.css)
```css
/* Reset & normalize */
* { margin: 0; padding: 0; }

/* Base element styles */
body { font-family: ...; }
h1, h2, h3 { ... }
a { ... }

/* Layout utilities */
.container { max-width: ...; }

/* Custom animations */
@keyframes fadeInUp { ... }
```

#### Tailwind CSS Integration

**Configuration:**
- PostCSS processes Tailwind
- Autoprefixer adds vendor prefixes
- Output CSS optimized for production
- Zero-config with Tailwind v4

**Utility Classes:**
```jsx
<div className="w-full h-screen flex items-center justify-center">
  {/* Utilities: width, height, flexbox, alignment */}
</div>

<motion.div
  className={`
    absolute inset-0           // positioning
    shadow-[...] transition... // effects
    ${isActive ? "scale-100" : "scale-90"}  // conditionals
  `}
>
```

#### Component Styling Pattern

```typescript
// src/components/Slider3D.tsx
<motion.div
  style={{
    transform: `rotateY(${rotation}deg)`,  // Framer Motion styles
    transformStyle: "preserve-3d"
  }}
  className="relative preserve-3d"        // Tailwind styles
>
  <div className={`
    bg-white overflow-hidden
    shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]
    transition-all duration-500
    ${isActive ? "scale-100" : "scale-90 opacity-60"}
  `}>
```

### Responsive Design System

#### Breakpoints
```
Mobile:   < 640px
Tablet:   640px - 1024px
Desktop:  > 1024px
```

#### Mobile-First Approach
```jsx
// Start with mobile styles
<div className="
  block              // mobile: block
  md:flex             // tablet+: flex
  text-sm             // mobile: sm
  md:text-base        // tablet+: base
  lg:text-lg          // desktop+: lg
">
```

---

## Build & Deployment Pipeline

### Development Workflow

```
1. Clone/Pull Repository
   ↓
2. npm install (install dependencies)
   ↓
3. npm run dev (start dev server on :3000)
   ↓
4. Edit files, hot reload automatically
   ↓
5. npm run lint (check code quality)
   ↓
6. Commit changes to git
```

### Production Build Process

```
npm run build
    ↓
Next.js compilation:
├─ TypeScript → JavaScript
├─ React/JSX → optimized code
├─ CSS → minified, purged
├─ Code splitting
├─ Static optimization
└─ Build artifacts → .next/
    ↓
Build output:
├─ .next/server/    (Node runtime)
├─ .next/static/    (Browser bundles)
└─ .next/app/       (Pre-rendered pages)
    ↓
npm start or npm run dev (test build locally)
    ↓
Ready for deployment
```

### Deployment to Vercel

```
1. Push code to GitHub
    ↓
2. Vercel webhook triggered (GitHub integration)
    ↓
3. Vercel clones repository
    ↓
4. npm install dependencies
    ↓
5. npm run build (optimized production build)
    ↓
6. Vercel deploys:
   ├─ Frontend (Vercel Edge Network)
   ├─ Images (Image Optimization)
   └─ API Routes (Serverless Functions)
    ↓
7. Live at production URL (auto HTTPS, CDN, etc.)
    ↓
8. Preview deployments on pull requests
```

### Performance Optimizations in Build

1. **Code Splitting:** Automatic per-route
2. **Image Optimization:** WebP, responsive sizing
3. **CSS Minification:** Tailwind purging
4. **Tree Shaking:** Remove unused code
5. **Compression:** gzip/brotli
6. **Lazy Loading:** Dynamic imports
7. **Preloading:** Critical resources

---

## Request/Response Flow Example

### User Navigates to /info (Info Page)

```
User clicks "Info" link in header
    ↓
Browser updates URL to /info
    ↓
Next.js router detects route change
    ↓
Next.js loads info/page.tsx code
    ↓
page.tsx imports personalInfo from data.ts
    ↓
page.tsx renders JSX:
├─ Imports personalInfo
├─ Maps over education array
├─ Maps over skills object
├─ Renders CertificatesSection component
│   └─ CertificatesSection maps over certifications
└─ Returns complete JSX tree
    ↓
React reconciliation:
├─ Identifies changed components
├─ Updates only necessary DOM nodes
└─ Triggers re-renders
    ↓
CSS applies styles from globals.css + Tailwind
    ↓
Framer Motion initializes (no scroll animations needed yet)
    ↓
Browser renders final HTML
    ↓
User sees Info page with:
├─ Professional summary
├─ Contact information
├─ Education timeline
├─ Organized skills
└─ All certificates displayed
```

---

## Summary of Key Workflows

| Workflow | Trigger | Process | Result |
|----------|---------|---------|--------|
| **Home Page Load** | Visit `/` | Renders Hero → Slider3D with scroll listeners | 3D carousel ready |
| **3D Carousel Rotation** | User scrolls | useScroll → useTransform → useSpring → DOM update | Smooth 3D rotation |
| **Navigation** | Link click | Next.js router → new page render | Page content changes |
| **Data Update** | Edit data.ts | Save → hot reload → components re-render | Changes appear everywhere |
| **Production Build** | `npm run build` | Compilation + optimization → .next folder | Ready to deploy |
| **Deployment** | Push to GitHub | Vercel webhook → build → deploy | Live on internet |

---

## Architecture Principles

### 1. **Single Source of Truth**
- All content in `src/lib/data.ts`
- Components import and display, don't duplicate data
- One change updates everywhere

### 2. **Component Composition**
- Small, reusable components
- Clear prop interfaces
- No deeply nested hierarchies

### 3. **Separation of Concerns**
- Pages: routing + layout
- Components: UI + interactivity
- Data: content storage
- Styles: visual presentation

### 4. **Performance First**
- Image optimization
- Code splitting
- Lazy loading
- Efficient re-renders

### 5. **Accessibility**
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Color contrast

### 6. **Maintainability**
- Clear folder structure
- Consistent naming conventions
- TypeScript for safety
- Comments for complex logic

---

## Troubleshooting Flow

```
Problem occurs
    ↓
Check browser console for errors
    ↓
Look at TypeScript type errors
    ↓
Review component props
    ↓
Check data.ts for missing/malformed data
    ↓
Clear .next folder and rebuild
    ↓
Restart dev server
    ↓
Check network tab for failed requests
    ↓
Review Vercel logs if deployed
    ↓
Issue resolved!
```

---

**Document Version:** 1.0  
**Last Updated:** January 28, 2026  
**Maintained By:** Portfolio Team
