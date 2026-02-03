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
  const [isCursorEnabled] = useState(() => {
    if (typeof window === "undefined") return false;
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasFineMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    return !isTouchDevice && !prefersReducedMotion && hasFineMouse;
  });
  const cursorPositionRef = useRef({ x: 0, y: 0 });
  const cursorTargetRef = useRef({ x: 0, y: 0 });
  const cursorRafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isCursorEnabled) {
      document.documentElement.style.cursor = "auto";
      return;
    }

    // Check for touch device and reduced motion
    // Lerp utility
    const lerp = (start: number, end: number, factor: number) => 
      start + (end - start) * factor;

    // Animation loop for smooth cursor
    const animateCursor = () => {
      cursorPositionRef.current.x = lerp(cursorPositionRef.current.x, cursorTargetRef.current.x, 0.15);
      cursorPositionRef.current.y = lerp(cursorPositionRef.current.y, cursorTargetRef.current.y, 0.15);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorPositionRef.current.x}px, ${cursorPositionRef.current.y}px)`;
      }

      cursorRafRef.current = requestAnimationFrame(animateCursor);
    };

    // Mouse move handler
    const onMouseMove = (event: MouseEvent) => {
      cursorTargetRef.current.x = event.clientX;
      cursorTargetRef.current.y = event.clientY;
      
      if (!isVisible) {
        setIsVisible(true);
        // Initialize position immediately on first move
        cursorPositionRef.current.x = event.clientX;
        cursorPositionRef.current.y = event.clientY;
      }
    };

    // Hover detection for interactive elements
    const onMouseOver = (event: MouseEvent) => {
      const eventTarget = event.target as HTMLElement;
      const isInteractive = 
        eventTarget.tagName === 'A' ||
        eventTarget.tagName === 'BUTTON' ||
        eventTarget.closest('a') ||
        eventTarget.closest('button') ||
        eventTarget.classList.contains('interactive') ||
        eventTarget.classList.contains('cursor-pointer') ||
        eventTarget.closest('.orbit-carousel__card');
      
      setIsHovering(!!isInteractive);
    };

    // Hide cursor when leaving window
    const onMouseLeaveWindow = () => setIsVisible(false);
    const onMouseEnterWindow = () => setIsVisible(true);

    // Start animation
    cursorRafRef.current = requestAnimationFrame(animateCursor);

    // Add listeners
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.documentElement.addEventListener('mouseleave', onMouseLeaveWindow);
    document.documentElement.addEventListener('mouseenter', onMouseEnterWindow);

    return () => {
      if (cursorRafRef.current) cancelAnimationFrame(cursorRafRef.current);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.documentElement.removeEventListener('mouseleave', onMouseLeaveWindow);
      document.documentElement.removeEventListener('mouseenter', onMouseEnterWindow);
    };
  }, [isCursorEnabled, isVisible]);

  if (!isCursorEnabled) return null;

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
