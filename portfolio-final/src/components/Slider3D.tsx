"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { personalInfo } from "@/lib/data";

export default function Slider3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  
  const items = personalInfo.projects;
  const itemCount = items.length;
  const angleStep = 360 / itemCount;
  
  // Scroll-linked rotation (like etienne.studio)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Map scroll progress to rotation - 2 full rotations over the scroll distance
  const rawRotation = useTransform(scrollYProgress, [0, 1], [0, -720]);
  
  // Add spring physics for smooth rotation
  const smoothRotation = useSpring(rawRotation, {
    stiffness: 100,
    damping: 30,
    mass: 0.5
  });
  
  // Calculate active index based on current rotation
  useEffect(() => {
    const unsubscribe = smoothRotation.on("change", (value) => {
      const normalizedRotation = ((Math.abs(value) % 360) + 360) % 360;
      const index = Math.round(normalizedRotation / angleStep) % itemCount;
      setActiveIndex(index);
    });
    return () => unsubscribe();
  }, [smoothRotation, angleStep, itemCount]);

  // For reduced motion: just show a static view
  if (prefersReducedMotion) {
    return (
      <div className="relative w-full h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-900)' }}>
        <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto p-8">
          {items.map((project, index) => (
            <div key={project.id} className="card overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>
              <div className="p-4" style={{ borderTop: '1px solid var(--border)' }}>
                <span className="text-xs font-black uppercase" style={{ color: 'var(--text-high)' }}>{project.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="relative h-[400vh]"
    >
      {/* Sticky viewport - like etienne.studio */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden" style={{ backgroundColor: 'var(--bg-900)' }}>
        
        {/* 3D Carousel Container - perspective: 1400px like reference */}
        <div 
          className="relative w-full h-full flex items-center justify-center"
          style={{ perspective: "1400px" }}
        >
          <motion.div
            className="relative preserve-3d"
            style={{ 
              rotateY: smoothRotation,
              transformStyle: "preserve-3d",
              width: "450px",
              height: "320px"
            }}
          >
            {items.map((project, index) => {
              const angle = index * angleStep;
              const isActive = index === activeIndex;
              
              return (
                <motion.div
                  key={project.id}
                  className="absolute inset-0 slider-item"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(500px)`,
                    backfaceVisibility: "hidden",
                    transformStyle: "preserve-3d",
                    willChange: "transform"
                  }}
                >
                  <div 
                    className={`
                      w-full h-full overflow-hidden
                      transition-all duration-500 ease-[0.22,1,0.36,1]
                      ${isActive ? "scale-100 opacity-100" : "scale-90 opacity-50"}
                    `}
                    style={{
                      backgroundColor: 'var(--surface-700)',
                      boxShadow: 'var(--shadow-1)',
                      border: '1px solid var(--border)'
                    }}
                  >
                    {/* Project Image */}
                    <div className="relative w-full h-[240px] overflow-hidden group" style={{ backgroundColor: 'var(--surface-600)' }}>
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 450px"
                        className="object-cover transition-transform duration-700 ease-[0.23,1,0.32,1] group-hover:scale-110"
                        priority={isActive}
                        quality={90}
                      />
                      {/* Dark mode overlay for better contrast */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: 'linear-gradient(to top, var(--glass), transparent)' }}
                      />
                    </div>
                    
                    {/* Card Footer */}
                    <div 
                      className="p-5 flex justify-between items-center"
                      style={{ 
                        backgroundColor: 'var(--surface-700)',
                        borderTop: '1px solid var(--border)'
                      }}
                    >
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-[-0.02em] leading-none mb-1" style={{ color: 'var(--text-high)' }}>
                          PROJ—0{index + 1}
                        </span>
                        <span className="text-[9px] uppercase font-bold tracking-tight" style={{ color: 'var(--muted-500)' }}>
                          {project.category}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-black uppercase leading-none block" style={{ color: 'var(--text-high)' }}>
                          {project.year}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Project Info Overlay - Bottom Left */}
        <div className="absolute bottom-24 left-10 z-40 pointer-events-none">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-[10px] font-black uppercase tracking-tighter" style={{ color: 'var(--muted-500)' }}>
              {String(activeIndex + 1).padStart(2, '0')} — {String(itemCount).padStart(2, '0')}
            </span>
            <div className="w-16 h-[1px] relative overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
              <motion.div 
                className="absolute inset-y-0 left-0"
                style={{ backgroundColor: 'var(--accent)' }}
                animate={{ width: `${((activeIndex + 1) / itemCount) * 100}%` }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="text-sm mt-3 max-w-[320px] leading-relaxed"
            style={{ color: 'var(--text-medium)' }}
          >
            {items[activeIndex]?.description}
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ opacity: scrollYProgress.get() < 0.1 ? 1 : 0 }}
        >
          <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: 'var(--muted-500)' }}>
            SCROLL TO EXPLORE
          </span>
          <motion.div
            className="w-[1px] h-8"
            style={{ backgroundColor: 'var(--muted-500)' }}
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Progress Bar - Top */}
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ backgroundColor: 'var(--border)' }}>
          <motion.div 
            className="h-full"
            style={{ backgroundColor: 'var(--accent)', scaleX: scrollYProgress, transformOrigin: "left" }}
          />
        </div>
      </div>
    </div>
  );
}
