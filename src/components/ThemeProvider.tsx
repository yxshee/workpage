"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: required for SSR hydration to prevent theme flash
    setMounted(true);

    // Initialize theme from localStorage or system preference
    const stored = localStorage.getItem("theme") as Theme | null;
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    function apply(theme: Theme | null) {
      const root = document.documentElement;
      if (theme === "dark") {
        root.setAttribute("data-theme", "dark");
        root.style.backgroundColor = "#000000"; // TRUE BLACK
      } else if (theme === "light") {
        root.removeAttribute("data-theme");
        root.style.backgroundColor = "#fcfcfc";
      } else {
        // System preference
        if (media.matches) {
          root.setAttribute("data-theme", "dark");
          root.style.backgroundColor = "#000000"; // TRUE BLACK
        } else {
          root.removeAttribute("data-theme");
          root.style.backgroundColor = "#fcfcfc";
        }
      }
    }

    apply(stored);

    // Listen to system preference changes
    const handleChange = () => {
      const current = localStorage.getItem("theme") as Theme | null;
      if (!current || current === "system") {
        apply("system");
      }
    };

    media.addEventListener("change", handleChange);

    // Expose global controller for external use
    (window as unknown as { ThemeController: { set: (t: Theme) => void; get: () => Theme } }).ThemeController = {
      set(t: Theme) {
        if (t === "system") {
          localStorage.removeItem("theme");
        } else {
          localStorage.setItem("theme", t);
        }
        apply(t);
      },
      get() {
        return (localStorage.getItem("theme") as Theme) || "system";
      },
    };

    return () => media.removeEventListener("change", handleChange);
  }, []);

  // Prevent flash of incorrect theme
  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: required for SSR hydration
    setMounted(true);
  }, []);

  const cycleTheme = () => {
    const root = document.documentElement;
    const isDark = root.getAttribute("data-theme") === "dark";
    const newTheme: Theme = isDark ? "light" : "dark";
    
    localStorage.setItem("theme", newTheme);
    
    if (newTheme === "dark") {
      root.setAttribute("data-theme", "dark");
      root.style.backgroundColor = "#000000"; // TRUE BLACK
    } else {
      root.removeAttribute("data-theme");
      root.style.backgroundColor = "#fcfcfc";
    }
  };

  if (!mounted) {
    return (
      <button
        className="theme-toggle"
        aria-label="Toggle theme"
        disabled
      >
        <div className="w-4 h-4 rounded-full bg-current opacity-30" />
      </button>
    );
  }

  const isDark = typeof window !== "undefined" && document.documentElement.getAttribute("data-theme") === "dark";

  return (
    <button
      onClick={cycleTheme}
      className="theme-toggle"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        // Sun icon for dark mode (click to go light)
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      ) : (
        // Moon icon for light mode (click to go dark)
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  );
}
