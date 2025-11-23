"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: required for SSR hydration to prevent theme flash
    setIsMounted(true);

    // Initialize theme from localStorage or system preference
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    const systemDarkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");

    function applyThemePreference(theme: Theme | null) {
      const root = document.documentElement;
      if (theme === "dark") {
        root.setAttribute("data-theme", "dark");
        root.style.backgroundColor = "#000000"; // TRUE BLACK
      } else if (theme === "light") {
        root.removeAttribute("data-theme");
        root.style.backgroundColor = "#fcfcfc";
      } else {
        // System preference
        if (systemDarkModeQuery.matches) {
          root.setAttribute("data-theme", "dark");
          root.style.backgroundColor = "#000000"; // TRUE BLACK
        } else {
          root.removeAttribute("data-theme");
          root.style.backgroundColor = "#fcfcfc";
        }
      }
    }

    applyThemePreference(storedTheme);

    // Listen to system preference changes
    const onSystemThemeChange = () => {
      const savedThemePreference = localStorage.getItem("theme") as Theme | null;
      if (!savedThemePreference || savedThemePreference === "system") {
        applyThemePreference("system");
      }
    };

    systemDarkModeQuery.addEventListener("change", onSystemThemeChange);

    // Expose global controller for external use
    (window as unknown as { ThemeController: { set: (nextTheme: Theme) => void; get: () => Theme } }).ThemeController = {
      set(nextTheme: Theme) {
        if (nextTheme === "system") {
          localStorage.removeItem("theme");
        } else {
          localStorage.setItem("theme", nextTheme);
        }
        applyThemePreference(nextTheme);
      },
      get() {
        return (localStorage.getItem("theme") as Theme) || "system";
      },
    };

    return () => systemDarkModeQuery.removeEventListener("change", onSystemThemeChange);
  }, []);

  // Prevent flash of incorrect theme
  if (!isMounted) {
    return null;
  }

  return <>{children}</>;
}

export function ThemeToggle() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: required for SSR hydration
    setIsMounted(true);
  }, []);

  const cycleTheme = () => {
    const root = document.documentElement;
    const isDarkTheme = root.getAttribute("data-theme") === "dark";
    const nextTheme: Theme = isDarkTheme ? "light" : "dark";
    
    localStorage.setItem("theme", nextTheme);
    
    if (nextTheme === "dark") {
      root.setAttribute("data-theme", "dark");
      root.style.backgroundColor = "#000000"; // TRUE BLACK
    } else {
      root.removeAttribute("data-theme");
      root.style.backgroundColor = "#fcfcfc";
    }
  };

  if (!isMounted) {
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

  const isDarkTheme = typeof window !== "undefined" && document.documentElement.getAttribute("data-theme") === "dark";

  return (
    <button
      onClick={cycleTheme}
      className="theme-toggle"
      aria-label={isDarkTheme ? "Switch to light mode" : "Switch to dark mode"}
      title={isDarkTheme ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkTheme ? (
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
