"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor component that follows the mouse.
 * - Shows dot cursor by default
 * - Expands on interactive element hover
 * - Respects reduced-motion and touch devices
 * - Uses pointer-events: none to not block clicks
 */
export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Check for touch device and reduced motion
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasFineMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    
    if (isTouchDevice || prefersReducedMotion || !hasFineMouse) {
      // Enable default cursor for these cases
      document.documentElement.style.cursor = 'auto';
      return;
    }

    setIsEnabled(true);

    // Lerp utility
    const lerp = (start: number, end: number, factor: number) => 
      start + (end - start) * factor;

    // Animation loop for smooth cursor
    const animate = () => {
      posRef.current.x = lerp(posRef.current.x, targetRef.current.x, 0.15);
      posRef.current.y = lerp(posRef.current.y, targetRef.current.y, 0.15);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
      
      if (!isVisible) {
        setIsVisible(true);
        // Initialize position immediately on first move
        posRef.current.x = e.clientX;
        posRef.current.y = e.clientY;
      }
    };

    // Hover detection for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('interactive') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.slider-item');
      
      setIsHovering(!!isInteractive);
    };

    // Hide cursor when leaving window
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Start animation
    rafRef.current = requestAnimationFrame(animate);

    // Add listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isEnabled) return null;

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      style={{
        opacity: isVisible ? 1 : 0,
        width: isHovering ? '48px' : '12px',
        height: isHovering ? '48px' : '12px',
      }}
      aria-hidden="true"
    >
      {isHovering && (
        <span className="text-[8px] font-bold uppercase tracking-wider" style={{ color: 'var(--bg-900)' }}>
          View
        </span>
      )}
    </div>
  );
}
