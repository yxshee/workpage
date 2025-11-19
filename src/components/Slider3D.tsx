"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { personalInfo } from "@/lib/data";

export default function Slider3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rotorRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const speedRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const items = personalInfo.projects;
  const itemCount = items.length;
  const angleStep = 360 / itemCount;
  const maxSpeed = 0.4;

  // Continuous animation loop (never stops)
  const animate = useCallback(() => {
    // Apply friction
    speedRef.current *= 0.98;
    
    // Update rotation
    rotationRef.current = (rotationRef.current + speedRef.current) % 360;
    if (rotationRef.current < 0) rotationRef.current += 360;
    
    // Apply to rotor element (GPU-accelerated)
    if (rotorRef.current) {
      rotorRef.current.style.transform = `translateZ(0) rotateY(${rotationRef.current}deg)`;
    }
    
    // Calculate active index based on rotation
    const normalizedRotation = ((rotationRef.current % 360) + 360) % 360;
    const index = Math.round(normalizedRotation / angleStep) % itemCount;
    setActiveIndex((itemCount - index) % itemCount);
    
    // Continue animation
    rafRef.current = requestAnimationFrame(animate);
  }, [angleStep, itemCount]);

  useEffect(() => {
    // Start continuous animation
    rafRef.current = requestAnimationFrame(animate);
    
    // Wheel handler - maps vertical scroll to rotation
    const handleWheel = (e: WheelEvent) => {
      // Only capture on Home page
      if (!containerRef.current?.closest('.home-root')) return;
      
      const delta = e.deltaY || e.deltaX;
      speedRef.current += (delta > 0 ? 1 : -1) * 0.025;
      speedRef.current = Math.max(-maxSpeed, Math.min(maxSpeed, speedRef.current));
      
      // IMPORTANT: Prevent vertical page scroll on Home
      e.preventDefault();
    };
    
    // Touch handlers for mobile
    let startY: number | null = null;
    
    const handleTouchStart = (e: TouchEvent) => {
      if (!containerRef.current?.closest('.home-root')) return;
      startY = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!containerRef.current?.closest('.home-root') || startY === null) return;
      
      const dy = e.touches[0].clientY - startY;
      speedRef.current += -dy * 0.0015;
      speedRef.current = Math.max(-maxSpeed, Math.min(maxSpeed, speedRef.current));
      startY = e.touches[0].clientY;
      
      // Prevent vertical scroll on Home
      e.preventDefault();
    };
    
    const handleTouchEnd = () => {
      startY = null;
    };
    
    // Add event listeners with passive: false to allow preventDefault
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    // Visibility handling
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      } else {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [animate, maxSpeed]);

  // Mouse tracking for custom cursor
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ backgroundColor: 'var(--bg-900)' }}
    >
      {/* 3D Carousel Container with rotor-wrapper for spacing */}
      <div 
        className="rotor-wrapper relative w-full h-full flex items-center justify-center"
        style={{ perspective: "1400px" }}
      >
        <div
          ref={rotorRef}
          className="rotor relative preserve-3d"
          style={{ 
            transformStyle: "preserve-3d",
            width: "400px",
            height: "280px",
            willChange: "transform",
          }}
        >
          {items.map((project, index) => {
            const angle = index * angleStep;
            const isActive = index === activeIndex;
            
            return (
              <div
                key={project.id}
                className="absolute inset-0 cursor-pointer slider-item"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(500px)`,
                  backfaceVisibility: "hidden",
                  transformStyle: "preserve-3d",
                  willChange: "transform",
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
                  <div className="relative w-full h-[200px] overflow-hidden group" style={{ backgroundColor: 'var(--surface-600)' }}>
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
                  <div className="p-4 flex justify-between items-center" style={{ backgroundColor: 'var(--surface-700)', borderTop: '1px solid var(--border)' }}>
                    <div>
                      <span className="block text-[10px] font-bold tracking-tight" style={{ color: 'var(--text-high)' }}>PROJ—0{index + 1}</span>
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

      {/* Project Info Overlay - Bottom Left - with responsive gap from rotor */}
      <div className="absolute bottom-36 left-10 z-40 pointer-events-none" style={{ marginTop: 'clamp(48px, 8vh, 120px)' }}>
        <div className="flex items-center gap-4 mb-3">
          <span className="text-[10px] font-bold uppercase tracking-tighter" style={{ color: 'var(--muted-500)' }}>
            {activeIndex + 1} / {itemCount}
          </span>
          <div className="w-12 h-[1px] relative overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
            <motion.div 
              className="absolute inset-0"
              style={{ 
                width: `${((activeIndex + 1) / itemCount) * 100}%`,
                backgroundColor: 'var(--accent)'
              }}
            />
          </div>
        </div>
        <motion.h2
          key={activeIndex}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl font-black uppercase tracking-[-0.04em] leading-[0.9]"
          style={{ color: 'var(--text-high)' }}
        >
          {items[activeIndex]?.title}
        </motion.h2>
        <motion.p
          key={`desc-${activeIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm mt-2 max-w-[300px]"
          style={{ color: 'var(--text-medium)' }}
        >
          {items[activeIndex]?.description}
        </motion.p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--muted-500)' }}>
        ↓ Scroll to explore
      </div>

      {/* Custom Cursor - "View" button */}
      {isHovering && (
        <motion.div
          className="fixed pointer-events-none z-[100] w-24 h-24 backdrop-blur-md bg-opacity-90 rounded-full flex items-center justify-center border shadow-2xl"
          style={{
            left: mousePosition.x - 48,
            top: mousePosition.y - 48,
            backgroundColor: 'var(--accent)',
            borderColor: 'var(--border)',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] ml-1" style={{ color: 'var(--bg-900)' }}>View</span>
        </motion.div>
      )}
    </div>
  );
}
