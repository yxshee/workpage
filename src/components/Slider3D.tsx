"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import Image from "next/image";
import { personalInfo } from "@/lib/data";

export default function Slider3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  const items = personalInfo.projects;
  const itemCount = items.length;
  const angleStep = 360 / itemCount;
  
  // Scroll-based rotation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Map scroll progress to rotation (multiple full rotations for smooth experience)
  const rawRotation = useTransform(scrollYProgress, [0, 1], [0, -360 * 2]);
  const rotation = useSpring(rawRotation, { stiffness: 50, damping: 30 });
  
  // Calculate active index based on rotation
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    const unsubscribe = rotation.on("change", (value) => {
      const normalizedRotation = ((value % 360) + 360) % 360;
      const index = Math.round(normalizedRotation / angleStep) % itemCount;
      setActiveIndex((itemCount - index) % itemCount);
    });
    return () => unsubscribe();
  }, [rotation, angleStep, itemCount]);

  // Mouse tracking for custom cursor
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div 
      ref={containerRef}
      className="relative h-[400vh]"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* 3D Carousel Container */}
        <div 
          className="relative w-full h-full flex items-center justify-center"
          style={{ perspective: "1200px" }}
        >
          <motion.div
            className="relative preserve-3d"
            style={{ 
              rotateY: rotation,
              transformStyle: "preserve-3d",
              width: "400px",
              height: "280px"
            }}
          >
            {items.map((project, index) => {
              const angle = index * angleStep;
              const isActive = index === activeIndex;
              
              return (
                <motion.div
                  key={project.id}
                  className="absolute inset-0 cursor-pointer"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(500px)`,
                    backfaceVisibility: "hidden",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div 
                    className={`
                      w-full h-full bg-white overflow-hidden
                      shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]
                      transition-all duration-500
                      ${isActive ? "scale-100" : "scale-90 opacity-60"}
                    `}
                  >
                    {/* Project Image */}
                    <div className="relative w-full h-[200px] bg-[#f5f5f5] overflow-hidden group">
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
                    <div className="p-4 bg-white flex justify-between items-center border-t border-black/5">
                      <div>
                        <span className="block text-[10px] font-bold tracking-tight">PROJ—0{index + 1}</span>
                        <span className="text-[9px] text-[#999] uppercase tracking-tight">{project.category}</span>
                      </div>
                      <span className="text-[10px] font-bold">{project.year}</span>
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
            <span className="text-[10px] font-bold uppercase tracking-tighter text-[#999]">
              {activeIndex + 1} / {itemCount}
            </span>
            <div className="w-12 h-[1px] bg-black/10 relative overflow-hidden">
              <motion.div 
                className="absolute inset-0 bg-[#0000FF]"
                style={{ 
                  width: `${((activeIndex + 1) / itemCount) * 100}%`
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
          >
            {items[activeIndex]?.title}
          </motion.h2>
          <motion.p
            key={`desc-${activeIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-[#666] mt-2 max-w-[300px]"
          >
            {items[activeIndex]?.description}
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest text-[#999]">
          ↓ Scroll to explore
        </div>

        {/* Custom Cursor - "View" button */}
        {isHovering && (
          <motion.div
            className="fixed pointer-events-none z-[100] w-24 h-24 bg-[#0000FF] backdrop-blur-md bg-opacity-90 rounded-full flex items-center justify-center border border-white/20 shadow-2xl"
            style={{
              left: mousePosition.x - 48,
              top: mousePosition.y - 48,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <span className="text-white text-[11px] font-bold uppercase tracking-[0.2em] ml-1">View</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
