"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { personalInfo } from "@/lib/data";

// Lerp utility for smooth animations
const lerp = (start: number, end: number, factor: number): number => start + (end - start) * factor;

export default function OrbitCarousel() {
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const trackRotationRef = useRef(0);
  const rotationVelocityRef = useRef(0);
  const rotationRafRef = useRef<number | null>(null);
  const parallaxLoopRafRef = useRef<number | null>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  
  // Parallax state with refs for smooth animation
  const mouseTargetRef = useRef({ x: 0, y: 0 });
  const mouseCurrentRef = useRef({ x: 0, y: 0 });
  const parallaxCardRefs = useRef<HTMLDivElement[]>([]);
  
  const projects = personalInfo.projects;
  const projectCount = projects.length;
  const degreesPerProject = 360 / projectCount;
  const maxRotationVelocity = 3.5;
  
  // Detect reduced motion preference
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const animateRotation = () => {
      // Apply friction
      rotationVelocityRef.current *= 0.95;

      // Update rotation
      trackRotationRef.current = (trackRotationRef.current + rotationVelocityRef.current) % 360;
      if (trackRotationRef.current < 0) trackRotationRef.current += 360;

      // Apply to carousel track element (GPU-accelerated)
      if (carouselTrackRef.current) {
        carouselTrackRef.current.style.transform = `translateZ(0) rotateY(${trackRotationRef.current}deg)`;
      }

      // Calculate active index based on rotation
      const normalizedRotation = ((trackRotationRef.current % 360) + 360) % 360;
      const index = Math.round(normalizedRotation / degreesPerProject) % projectCount;
      setActiveProjectIndex((projectCount - index) % projectCount);

      rotationRafRef.current = requestAnimationFrame(animateRotation);
    };

    // Start continuous animation
    rotationRafRef.current = requestAnimationFrame(animateRotation);
    
    // Wheel handler - maps vertical scroll to rotation
    const onWheel = (event: WheelEvent) => {
      // Only capture on Home page
      if (!carouselContainerRef.current?.closest('.orbit-page')) return;
      
      const delta = event.deltaY || event.deltaX;
      rotationVelocityRef.current += (delta > 0 ? 1 : -1) * 0.15;
      rotationVelocityRef.current = Math.max(-maxRotationVelocity, Math.min(maxRotationVelocity, rotationVelocityRef.current));
      
      // IMPORTANT: Prevent vertical page scroll on Home
      event.preventDefault();
    };
    
    // Touch handlers for mobile
    let touchStartY: number | null = null;
    
    const onTouchStart = (event: TouchEvent) => {
      if (!carouselContainerRef.current?.closest('.orbit-page')) return;
      touchStartY = event.touches[0].clientY;
    };
    
    const onTouchMove = (event: TouchEvent) => {
      if (!carouselContainerRef.current?.closest('.orbit-page') || touchStartY === null) return;
      
      const dy = event.touches[0].clientY - touchStartY;
      rotationVelocityRef.current += -dy * 0.012;
      rotationVelocityRef.current = Math.max(-maxRotationVelocity, Math.min(maxRotationVelocity, rotationVelocityRef.current));
      touchStartY = event.touches[0].clientY;
      
      // Prevent vertical scroll on Home
      event.preventDefault();
    };
    
    const onTouchEnd = () => {
      touchStartY = null;
    };
    
    // Add event listeners with passive: false to allow preventDefault
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    
    // Visibility handling
    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        if (rotationRafRef.current) cancelAnimationFrame(rotationRafRef.current);
      } else {
        rotationRafRef.current = requestAnimationFrame(animateRotation);
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    
    return () => {
      if (rotationRafRef.current) cancelAnimationFrame(rotationRafRef.current);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [degreesPerProject, projectCount, maxRotationVelocity]);

  // Mouse tracking for custom cursor AND parallax
  const onMouseMove = (event: React.MouseEvent) => {
    // Update parallax target position (only if not reduced motion)
    if (!prefersReducedMotion && carouselContainerRef.current) {
      const rect = carouselContainerRef.current.getBoundingClientRect();
      const cx = (event.clientX - rect.left) / rect.width;  // 0..1
      const cy = (event.clientY - rect.top) / rect.height;  // 0..1
      mouseTargetRef.current.x = (cx - 0.5) * 2;  // -1..1
      mouseTargetRef.current.y = (cy - 0.5) * 2;  // -1..1
    }
  };
  
  // Parallax animation loop (separate from rotation for independence)
  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const animateParallaxLoop = () => {
      // Smooth interpolation towards target
      mouseCurrentRef.current.x = lerp(mouseCurrentRef.current.x, mouseTargetRef.current.x, 0.08);
      mouseCurrentRef.current.y = lerp(mouseCurrentRef.current.y, mouseTargetRef.current.y, 0.08);
      
      // Apply transforms to each parallax card
      parallaxCardRefs.current.forEach((parallaxCardElement, cardIndex) => {
        if (!parallaxCardElement) return;
        const depth = (cardIndex + 1) / projectCount;  // 0..1 depth factor
        const tx = mouseCurrentRef.current.x * 12 * depth;  // X translation in px
        const ty = mouseCurrentRef.current.y * 8 * depth;   // Y translation in px
        const rx = mouseCurrentRef.current.y * 4 * depth;   // rotateX
        const ry = mouseCurrentRef.current.x * -4 * depth;  // rotateY
        
        // Apply GPU-accelerated transform
        parallaxCardElement.style.setProperty('--parallax-x', `${tx}px`);
        parallaxCardElement.style.setProperty('--parallax-y', `${ty}px`);
        parallaxCardElement.style.setProperty('--parallax-rx', `${rx}deg`);
        parallaxCardElement.style.setProperty('--parallax-ry', `${ry}deg`);
      });
      
      parallaxLoopRafRef.current = requestAnimationFrame(animateParallaxLoop);
    };
    
    parallaxLoopRafRef.current = requestAnimationFrame(animateParallaxLoop);
    
    return () => {
      if (parallaxLoopRafRef.current) cancelAnimationFrame(parallaxLoopRafRef.current);
    };
  }, [prefersReducedMotion, projectCount]);
  
  // Reset parallax position when mouse leaves
  const onMouseLeave = () => {
    // Smoothly return to center
    mouseTargetRef.current = { x: 0, y: 0 };
  };

  return (
    <div 
      ref={carouselContainerRef}
      className="relative w-full h-full flex items-center justify-center"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ backgroundColor: 'var(--bg-900)' }}
    >
      {/* 3D Carousel Container with orbit-carousel spacing */}
      <div 
        className="orbit-carousel relative w-full h-full flex items-center justify-center"
        style={{ perspective: "1400px" }}
      >
        <div
          ref={carouselTrackRef}
          className="orbit-carousel__track relative u-preserve-3d"
          style={{ 
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          {projects.map((project, projectIndex) => {
            const angle = projectIndex * degreesPerProject;
            const isActive = projectIndex === activeProjectIndex;
            
            return (
              <div
                key={project.id}
                ref={(parallaxCardElement) => { if (parallaxCardElement) parallaxCardRefs.current[projectIndex] = parallaxCardElement; }}
                className="absolute inset-0 cursor-pointer orbit-carousel__card orbit-carousel__card--parallax"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(var(--slider-radius, 500px)) translate3d(var(--parallax-x, 0), var(--parallax-y, 0), 0) rotateX(var(--parallax-rx, 0)) rotateY(var(--parallax-ry, 0))`,
                  ['--angle' as string]: `${angle}deg`,
                  backfaceVisibility: "hidden",
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                  ['--parallax-x' as string]: '0px',
                  ['--parallax-y' as string]: '0px',
                  ['--parallax-rx' as string]: '0deg',
                  ['--parallax-ry' as string]: '0deg',
                }}
              >
                <div 
                  className={`
                    w-full h-full overflow-hidden
                    shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]
                    transition-all duration-500
                    ${isActive ? "scale-100" : "scale-90 opacity-60"}
                  `}
                  style={{ backgroundColor: 'var(--surface-700)' }}
                >
                  {/* Project Image */}
                  <div className="relative w-full h-[170px] overflow-hidden group" style={{ backgroundColor: 'var(--surface-600)' }}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover transition-transform duration-1000 ease-[0.23,1,0.32,1] group-hover:scale-110"
                      priority={isActive}
                      quality={90}
                    />
                    {/* Glassmorphism Hover overlay */}
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  
                  {/* Card Footer */}
                  <div className="p-3 flex justify-between items-center" style={{ backgroundColor: 'var(--surface-700)', borderTop: '1px solid var(--border)' }}>
                    <div>
                      <span className="block text-[10px] font-bold tracking-tight" style={{ color: 'var(--text-high)' }}>PROJ—0{projectIndex + 1}</span>
                      <span className="text-[9px] uppercase tracking-tight" style={{ color: 'var(--muted-500)' }}>{project.category}</span>
                    </div>
                    <span className="text-[10px] font-bold" style={{ color: 'var(--text-high)' }}>{project.year}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Info Overlay - reserved corner space so text never overlaps cards */}
      <div className="absolute bottom-8 md:bottom-28 left-4 md:left-8 z-50 pointer-events-none">
        <div className="orbit-carousel__info-panel w-[min(92vw,780px)] md:w-[min(62vw,780px)] h-[180px] md:h-[200px] lg:h-[220px] px-3 py-3 md:px-4 md:py-4 overflow-hidden flex flex-col items-center justify-center text-center gap-3">
          <div className="flex items-center justify-center gap-4">
            <span className="text-[10px] font-bold uppercase tracking-tighter" style={{ color: 'var(--muted-500)' }}>
              {activeProjectIndex + 1} / {projectCount}
            </span>
            <div className="w-16 h-[1px] relative overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
              <motion.div
                className="absolute inset-0"
                style={{
                  width: `${((activeProjectIndex + 1) / projectCount) * 100}%`,
                  backgroundColor: 'var(--accent)'
                }}
              />
            </div>
          </div>

          <motion.h2
            key={activeProjectIndex}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-[-0.04em] leading-[0.9] w-full text-center"
            style={{ color: 'var(--text-high)' }}
          >
            {projects[activeProjectIndex]?.title}
          </motion.h2>
          <motion.p
            key={`desc-${activeProjectIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm w-full text-center"
            style={{ color: 'var(--text-medium)' }}
          >
            {projects[activeProjectIndex]?.description}
          </motion.p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--muted-500)' }}>
        ↓ Scroll to explore
      </div>

    </div>
  );
}
