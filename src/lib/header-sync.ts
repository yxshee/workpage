"use client";

/**
 * Header Height Sync Utility
 * Dynamically updates --site-header-height CSS variable based on actual header height
 */

// Debounce utility for resize events
function debounce<T extends (...args: unknown[]) => void>(fn: T, ms: number): T {
  let timeoutId: ReturnType<typeof setTimeout>;
  return ((...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), ms);
  }) as T;
}

// Sync header height to CSS variable
export function syncHeaderHeight(): void {
  if (typeof window === 'undefined') return;
  
  const header = document.querySelector('.site-header');
  if (!header) return;
  
  const height = header.getBoundingClientRect().height;
  document.documentElement.style.setProperty('--site-header-height', `${Math.ceil(height)}px`);
}

// Check if user prefers reduced motion
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Initialize header sync with resize listener
export function initHeaderSync(): (() => void) | undefined {
  if (typeof window === 'undefined') return;
  
  // Initial sync
  syncHeaderHeight();
  
  // Debounced resize handler
  const debouncedSync = debounce(syncHeaderHeight, 120);
  window.addEventListener('resize', debouncedSync);
  
  // Cleanup function
  return () => {
    window.removeEventListener('resize', debouncedSync);
  };
}

// Lerp (linear interpolation) for smooth animations
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}
