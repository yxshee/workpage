"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/**
 * CursorController: Canonical custom cursor component
 * 
 * MODES:
 * - "default": Shows dot cursor (blue in light mode, yellow in dark mode)
 * - "hover": Expanded dot for interactive elements
 * - "image": Shows preview image as cursor (used on Work page)
 * 
 * THEME COLORS:
 * - Light mode: #0000FF (pure blue) via --cursor-color CSS variable
 * - Dark mode: #FFFF00 (pure yellow) via --cursor-color CSS variable
 * 
 * TO ADD A NEW WORK ITEM PREVIEW:
 * 1. Add image path to project in lib/data.ts
 * 2. The Work page hover automatically picks up the image
 */

type CursorMode = "default" | "hover" | "image";

interface CursorState {
  mode: CursorMode;
  imageSrc: string | null;
}

// Global cursor controller for external access
declare global {
  interface Window {
    CursorController?: {
      setMode: (mode: CursorMode, imageSrc?: string | null) => void;
      reset: () => void;
    };
  }
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorState, setCursorState] = useState<CursorState>({ mode: "default", imageSrc: null });
  const cursorModeRef = useRef<CursorMode>("default");
  
  const [isCursorEnabled] = useState(() => {
    if (typeof window === "undefined") return false;
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const hasFineMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    return !isTouchDevice && hasFineMouse;
  });
  
  const [prefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  const cursorPositionRef = useRef({ x: 0, y: 0 });
  const cursorTargetRef = useRef({ x: 0, y: 0 });
  const cursorRafRef = useRef<number | null>(null);

  // Expose global controller
  const setMode = useCallback((mode: CursorMode, imageSrc?: string | null) => {
    cursorModeRef.current = mode;
    setCursorState({ mode, imageSrc: imageSrc ?? null });
  }, []);

  const reset = useCallback(() => {
    cursorModeRef.current = "default";
    setCursorState({ mode: "default", imageSrc: null });
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.CursorController = { setMode, reset };
    }
    return () => {
      if (typeof window !== "undefined") {
        delete window.CursorController;
      }
    };
  }, [setMode, reset]);

  useEffect(() => {
    if (!isCursorEnabled) {
      document.documentElement.style.cursor = "auto";
      return;
    }

    // Lerp factor: instant for reduced motion, smooth otherwise
    const lerpFactor = prefersReducedMotion ? 1 : 0.15;
    
    const lerp = (start: number, end: number, factor: number) => 
      start + (end - start) * factor;

    const animateCursor = () => {
      cursorPositionRef.current.x = lerp(cursorPositionRef.current.x, cursorTargetRef.current.x, lerpFactor);
      cursorPositionRef.current.y = lerp(cursorPositionRef.current.y, cursorTargetRef.current.y, lerpFactor);

      if (cursorRef.current) {
        // Keep cursor centered on the pointer.
        cursorRef.current.style.transform = `translate3d(${cursorPositionRef.current.x}px, ${cursorPositionRef.current.y}px, 0) translate(-50%, -50%)`;
      }

      cursorRafRef.current = requestAnimationFrame(animateCursor);
    };

    const onMouseMove = (event: MouseEvent) => {
      cursorTargetRef.current.x = event.clientX;
      cursorTargetRef.current.y = event.clientY;
      
      if (!isVisible) {
        setIsVisible(true);
        cursorPositionRef.current.x = event.clientX;
        cursorPositionRef.current.y = event.clientY;
      }
    };

    const onMouseOver = (event: MouseEvent) => {
      // Don't override image mode from the Work page.
      // Use a ref so we avoid races between setMode() and mouseover events.
      if (cursorModeRef.current === "image") return;
      
      const eventTarget = event.target as HTMLElement;
      const isInteractive = 
        eventTarget.tagName === 'A' ||
        eventTarget.tagName === 'BUTTON' ||
        eventTarget.closest('a') ||
        eventTarget.closest('button') ||
        eventTarget.classList.contains('interactive') ||
        eventTarget.classList.contains('cursor-pointer') ||
        eventTarget.closest('.orbit-carousel__card');
      
      setCursorState(prev => ({
        ...prev,
        mode: isInteractive ? "hover" : "default"
      }));
    };

    const onMouseLeaveWindow = () => setIsVisible(false);
    const onMouseEnterWindow = () => setIsVisible(true);

    cursorRafRef.current = requestAnimationFrame(animateCursor);

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
  }, [isCursorEnabled, isVisible, prefersReducedMotion]);

  if (!isCursorEnabled) return null;

  const isImageMode = cursorState.mode === "image" && cursorState.imageSrc;
  const isHoverMode = cursorState.mode === "hover";

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      style={{
        opacity: isVisible ? 1 : 0,
      }}
      aria-hidden="true"
    >
      {/* Base cursor dot */}
      <div 
        className="cursor-dot"
        style={{
          width: isImageMode ? 0 : (isHoverMode ? '48px' : '12px'),
          height: isImageMode ? 0 : (isHoverMode ? '48px' : '12px'),
          opacity: isImageMode ? 0 : 1,
          background: 'var(--cursor-color)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'width 150ms cubic-bezier(0.34, 1.56, 0.64, 1), height 150ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 100ms ease',
        }}
      >
        {isHoverMode && !isImageMode && (
          <span className="text-[8px] font-bold uppercase tracking-wider" style={{ color: 'var(--bg-900)' }}>
            View
          </span>
        )}
      </div>
      
      {/* Image cursor for Work page */}
      {isImageMode && (
        <div 
          className="cursor-image-wrapper"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '160px',
            height: '200px',
            overflow: 'hidden',
            borderRadius: '4px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            opacity: 1,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imageRef}
            src={cursorState.imageSrc!}
            alt=""
            onError={() => {
              // Fallback to normal cursor on image error
              reset();
            }}
            decoding="async"
            draggable={false}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>
      )}
    </div>
  );
}
