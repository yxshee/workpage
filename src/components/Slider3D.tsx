"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { personalInfo } from "@/lib/data";

export default function Slider3D() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const items = personalInfo.projects;
  const itemCount = items.length;
  const angleStep = 360 / itemCount;

  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 30, mass: 0.5 });
  const rotationY = useTransform(springX, (value) => value);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [itemCount]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % itemCount);
    x.set(x.get() - angleStep);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + itemCount) % itemCount);
    x.set(x.get() + angleStep);
  };

  return (
    <div 
      className="relative w-full h-[70vh] flex items-center justify-center slider-container select-none cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        style={{ rotateY: rotationY }}
        className="relative w-[450px] h-[320px] preserve-3d"
      >
        {items.map((project, index) => {
          const angle = index * angleStep;
          const isActive = index === activeIndex;
          
          return (
            <motion.div
              key={project.id}
              className={`absolute inset-0 bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden slider-item border border-black/5 ${
                isActive ? "z-20" : "z-10"
              }`}
              style={{
                transform: `rotateY(${angle}deg) translateZ(500px)`,
                backfaceVisibility: "hidden",
              }}
              animate={{
                opacity: Math.abs(index - activeIndex) <= 1 || (index === 0 && activeIndex === itemCount - 1) || (index === itemCount - 1 && activeIndex === 0) ? 1 : 0.3,
                scale: isActive ? 1.05 : 0.95,
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Project Image */}
              <div className="relative flex-1 bg-[#f0f0f0] group overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading={isActive ? "eager" : "lazy"}
                  decoding="async"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0008ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Card Footer */}
              <div className="p-5 bg-white flex justify-between items-center border-t border-black/5">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black leading-none mb-1">PROJ—0{index + 1}</span>
                  <span className="text-[9px] text-[#999] uppercase font-bold tracking-tight">{project.category}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black leading-none block">{project.year}</span>
                  <span className="text-[9px] text-[#0008ff] font-bold uppercase tracking-tight opacity-0 group-hover:opacity-100 transition-opacity">Open Project</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Navigation Areas */}
      <div className="absolute inset-x-0 inset-y-0 flex z-30">
        <div className="flex-1" onClick={handlePrev} title="Previous" />
        <div className="flex-1" onClick={handleNext} title="Next" />
      </div>

      {/* Indicators */}
      <div className="absolute bottom-10 left-10 flex flex-col gap-2 pointer-events-none z-40">
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-black uppercase tracking-tighter text-[#999]">
            {activeIndex + 1} — {itemCount}
          </span>
          <div className="w-12 h-[1px] bg-black/10 relative overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-[#0008ff]"
              animate={{ x: `${(activeIndex / (itemCount - 1)) * 100 - 100}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.h2
            key={activeIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl font-black uppercase tracking-[-0.05em] leading-[0.85]"
          >
            {items[activeIndex].title}
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* Floating View Text */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="fixed pointer-events-none z-[60] text-[10px] font-black uppercase tracking-widest text-[#0008ff] mix-blend-difference"
        style={{ left: "50%", transform: "translateX(-50%) translateY(200px)" }}
      >
        Scroll to Explore
      </motion.div>
    </div>
  );
}
