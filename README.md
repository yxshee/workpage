# Yash Dogra's Portfolio Website

A modern, interactive portfolio website showcasing AI/ML engineering expertise, full-stack development projects, certifications, and professional achievements.

## Overview

This is a professional portfolio website built with cutting-edge web technologies, designed to present a comprehensive overview of Yash Dogra's skills, projects, education, and professional accomplishments. The portfolio features an interactive 3D carousel for project showcase, intuitive navigation, and a clean, modern design.

**Developer Profile:**
- **Name:** Yash Dogra
- **Title:** AI/ML Engineer & Full-Stack Developer
- **Location:** Hamirpur, Himachal Pradesh
- **Email:** [yxshdogra@gmail.com](mailto:yxshdogra@gmail.com)
- **Phone:** +91 7876205914

## Professional Links

- **GitHub:** [github.com/yashdogra](https://github.com/yashdogra)
- **LinkedIn:** [linkedin.com/in/yashdogra](https://linkedin.com/in/yashdogra)
- **Instagram:** [instagram.com/yxshdogra](https://instagram.com/yxshdogra)

## Key Features

### 1. **Interactive 3D Project Carousel (Home Page)**
- Scroll-linked 3D rotation animation for smooth project showcase
- Visual hover effects with scaling and opacity transitions
- Real-time project filtering based on active index
- Responsive image optimization using Next.js Image component
- Project metadata including title, category, year, and description
- Perfect spring physics animations using Framer Motion

### 2. **Dedicated Pages**
- **Home (/):** Showcase of featured projects with stunning 3D carousel
- **Work (/work):** All projects with detailed descriptions and technologies
- **Info (/info):** Comprehensive professional information:
  - Professional summary and background
  - Complete contact details
  - Education history from institutions
  - Skill categories (Languages, Frameworks, Tools)
  - All professional certifications with images
- **Archive (/archive):** Achievements including:
  - Research paper publication (ICICC 2025)
  - Sports medals and achievements
  - Leadership roles and organizational work

### 3. **Professional Certification Showcase**
- 14+ professional certifications from industry leaders:
  - **NVIDIA:** Fundamentals of Accelerated Computing with CUDA Python, Generative AI with Diffusion Models
  - **IBM:** Data Science Professional, AI Fundamentals, Building AI Solutions, Trustworthy AI, Generative AI in Action
  - **Google:** UX Design Professional Certificate
  - **Coursera:** Computer Vision Specialization, Cybersecurity Fundamentals, Mobile App Development
  - **Kaggle:** Intro to Machine Learning, Python Programming, Pandas for Data Analysis
- Beautiful visual display with certificate images
- Organized display on the Info page (removed from home page)

### 4. **Comprehensive Skills Section**
Organized into 4 categories:
- **Languages:** Python, C++, SQL, R
- **Frameworks:** TensorFlow, Keras, PyTorch, Scikit-learn, Transformers
- **Data Tools:** NumPy, Pandas, Power BI, Matplotlib, OpenCV, NLTK
- **Dev Tools:** Git, GitHub, VS Code, PyCharm, Colab, MySQL, Redis, Leaflet, OAuth 2.0, JWT

## Technology Stack

### Frontend
- **Framework:** Next.js 16.1.5 (App Router)
- **UI Library:** React 19.2.3
- **Styling:** Tailwind CSS 4 with PostCSS 4
- **Animations:** Framer Motion 12.29.2 (3D transforms and spring physics)
- **Icons/UI:** Lucide React 0.563.0
- **Utilities:** 
  - clsx (2.1.1) - Conditional CSS classes
  - tailwind-merge (3.4.0) - Tailwind utility conflict resolution

### Development Tools
- **Language:** TypeScript 5
- **Linting:** ESLint 9 with Next.js config
- **Build:** Optimized Next.js production build

### Project Structure

```
.
├── src/
│   ├── app/
│   │   ├── page.tsx              # Home page with 3D carousel
│   │   ├── work/page.tsx         # All projects showcase
│   │   ├── info/page.tsx         # Professional information
│   │   ├── archive/page.tsx      # Achievements and publications
│   │   ├── layout.tsx            # Root layout with header/footer
│   │   └── globals.css           # Global styles and CSS resets
│   ├── components/
│   │   ├── Hero.tsx              # Hero section wrapper
│   │   ├── Slider3D.tsx          # 3D carousel component
│   │   ├── Header.tsx            # Navigation header
│   │   ├── Footer.tsx            # Footer with social links
│   │   └── CertificatesSection.tsx # Certifications display (removed from home)
│   ├── lib/
│   │   └── data.ts               # Centralized portfolio data
│   └── styles/                    # Additional CSS modules
├── public/
│   ├── images/core/              # Project and hero images
│   └── certificates/             # Certificate PDFs and images
├── Certificates/                 # Raw certificate file storage
└── Configuration files (tsconfig.json, next.config.ts, postcss.config.mjs, eslint.config.mjs)
```

## Core Data Architecture

All portfolio content is centralized in `src/lib/data.ts` for single-source-of-truth management:

```typescript
personalInfo = {
  name: string
  role: string
  location: string
  email: string
  phone: string
  socials: { instagram, linkedin, github }
  summary: string
  education: [{
    institution: string
    degree: string
    period: string
    score: string
    location: string
  }]
  skills: {
    languages: string[]
    frameworks: string[]
    dataTools: string[]
    devTools: string[]
  }
  projects: [{
    id: number
    title: string
    category: string
    year: string
    image: string
    description: string
    technologies: string[]
  }]
  certifications: [{
    id: number
    title: string
    year: string
    issuer: string
    image: string
  }]
  archive: [{
    id: number
    title: string
    year: string
    type: string
    image: string
  }]
  heroImage: string
}
```

## Featured Projects

### 1. **MapMitra** (React • Node.js • MongoDB)
- Real-time campus navigation and e-rickshaw tracking system
- Landmark-based routing with intelligent wayfinding
- **Achievement:** 90% ETA prediction accuracy
- **Optimization:** 40% reduction in route computation latency via BFS and Redis caching
- **Tech Stack:** React, Node.js, MongoDB, Leaflet, Redis, OAuth 2.0, JWT

### 2. **Text Summarization** (T5 Transformer • HuggingFace)
- Multi-lingual text summarization using T5 Transformer
- Focus on Punjabi language processing
- **Achievement:** ROUGE-1 of 54.38 and ROUGE-L of 53.57 post fine-tuning
- **Tech Stack:** Python, Transformers, ROUGE metric, HuggingFace

### 3. **Toxic Terminator** (NLP • Streamlit)
- Real-world toxicity detection machine learning model
- Kaggle dataset with TF-IDF and Naive Bayes classifier
- **Achievement:** 95% test accuracy and 0.95 F1-score
- **Interface:** Real-time Streamlit web interface
- **Tech Stack:** Python, Streamlit, TF-IDF, Naive Bayes

### 4. **Campus Navigation Research** (Research • Publication)
- Academic research paper: "From Confusion to Clarity: Optimizing Navigation and Transport Systems in Educational Campuses"
- Published in Lecture Notes in Networks and Systems
- **Presented at:** ICICC 2025, Singapore
- **Tech Stack:** Research, Academic Writing, Data Analysis

## How It Works

### User Journey

#### 1. **Home Page (/)**
- Introduces Yash with hero section
- Features a scroll-driven 3D carousel rotating 4 featured projects
- Smooth spring animations based on scroll position
- Projects scale and fade based on carousel position
- Images load optimally for each device

#### 2. **Work Page (/work)**
- Grid or list display of all projects
- Detailed descriptions for each project
- Technology tags for quick skill identification
- Year and category information
- Full project metadata visible at a glance

#### 3. **Info Page (/info)**
- Professional summary section
- Contact information (email, phone, location)
- Education history with institutions and dates
- Skills organized by 4 categories
- All 14+ certifications displayed with images/badges
- Awards and achievements
- Well-organized two-column layout on desktop

#### 4. **Archive Page (/archive)**
- Historical achievements and recognition
- ICICC 2025 research paper presentation
- Sports medals (Gold/Silver)
- Leadership positions (Girl Up Patiala)
- Chronological organization for easy browsing

### Technical Implementation Details

#### 3D Carousel (Slider3D.tsx)
**Mechanism:**
- CSS 3D transforms using `rotateY()` and `translateZ()`
- Framer Motion for declarative animation control
- `useScroll()` hook tracks viewport scroll progress
- `useTransform()` maps scroll to 3D rotation angle
- `useSpring()` applies physics-based smoothing

**Interaction:**
- Cards rotate into and out of view based on scroll
- Active card scales to 100%, others fade to 60% opacity
- Responsive design adapts to all screen sizes
- Automatic index calculation from rotation angle

#### Data Flow
1. Central data source: `src/lib/data.ts`
2. Components import `personalInfo` object
3. `.map()` over arrays to render lists
4. TypeScript ensures type safety throughout
5. Single update point for all content

#### Responsive Breakpoints
- **Mobile:** <640px
- **Tablet:** 640px-1024px  
- **Desktop:** >1024px
- Fluid typography and spacing
- Mobile-first CSS approach

#### Performance Optimizations
- Next.js Image component with automatic optimization
- Automatic code splitting per route
- CSS purging through Tailwind
- Lazy loading for off-screen components
- Optimized asset delivery through public folder
- Server-side rendering for initial page load

## Styling Architecture

### CSS Framework
- **Tailwind CSS v4** for utility-first styling
- **PostCSS** for CSS processing
- **Global CSS** in `globals.css` for base styles
- **Module CSS** for component-specific styles

### Animation System
- **Framer Motion** for complex animations
- **CSS Transforms** for 3D effects
- **Spring Physics** for natural motion
- **Scroll Triggers** for section animations

### Theme & Colors
- Modern, minimalist color palette
- High contrast for accessibility
- Consistent spacing using Tailwind scale
- Professional sans-serif typography

## Browser Compatibility

- ✅ Chrome/Edge (latest 2 versions)
- ✅ Firefox (latest 2 versions)
- ✅ Safari (latest 2 versions)
- ✅ iOS Safari (latest 2 versions)
- ✅ Chrome Mobile (latest 2 versions)

## Local Development

### Prerequisites
- Node.js 18+ and npm 8+
- macOS/Linux/Windows
- Git for version control

### Setup Instructions

```bash
# Install dependencies
npm install

# Start development server (port 3000)
npm run dev

# Open in browser
# -> http://localhost:3000
```

### Development Commands

```bash
# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint

# Format with prettier (if configured)
npm run format
```

## Deployment Options

### Vercel (Recommended)
```bash
# Connect GitHub repository to Vercel
# Auto-deploys on git push
# Built-in CI/CD pipeline
```

### Other Platforms
- **Netlify:** Direct GitHub integration
- **AWS Amplify:** Serverless deployment
- **DigitalOcean:** App Platform
- **Railway:** Modern cloud platform

## Performance Metrics

- **Page Load:** <2s (Vercel CDN)
- **Time to Interactive:** <3.5s
- **Lighthouse Score:** 95+/100
- **Core Web Vitals:** All green

## Future Enhancements

- [ ] Dark mode toggle with system preference detection
- [ ] Multi-language support (Hindi, Punjabi)
- [ ] Blog/Articles section with markdown support
- [ ] Contact form with email backend integration
- [ ] Visitor analytics and tracking
- [ ] Real-time project status updates
- [ ] PWA capabilities for offline access
- [ ] Search functionality across projects and content
- [ ] Social media feed integration
- [ ] Performance monitoring dashboard

## Accessibility

- Semantic HTML5 structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast > 4.5:1
- Screen reader optimized
- Responsive touch targets (min 44x44px)

## Security

- Environment variables for sensitive data
- Content Security Policy headers
- No sensitive information in client-side code
- Regular dependency updates via npm audit
- HTTPS enforcement in production

## Maintenance

### Regular Updates
- Update dependencies monthly: `npm update`
- Security audit: `npm audit fix`
- Lint check before deployment: `npm run lint`

### Content Updates
- Edit `src/lib/data.ts` for portfolio changes
- Replace images in `public/` folder
- Update certifications with new badges
- Keep project descriptions current

## Troubleshooting

### Local Development Issues
```bash
# Clear node_modules cache
rm -rf node_modules
npm install

# Reset Next.js cache
rm -rf .next
npm run dev

# Fix permissions (macOS)
bash scripts/fix-permissions.sh
```

### Build Problems
```bash
# Full clean build
npm run build --force

# Debug build issues
npm run build --verbose
```

## Contact & Professional Inquiries

For opportunities, feedback, or professional inquiries:

- **Email:** yxshdogra@gmail.com
- **Phone:** +91 7876205914
- **LinkedIn:** [linkedin.com/in/yashdogra](https://linkedin.com/in/yashdogra)
- **GitHub:** [github.com/yashdogra](https://github.com/yashdogra)

---

**Portfolio Version:** 2.0.0  
**Last Updated:** January 28, 2026  
**Status:** Active & Maintained  
**License:** Personal Portfolio - All rights reserved
