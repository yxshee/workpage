"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { personalInfo } from "@/lib/data";
import { ThemeToggle } from "./ThemeProvider";

export default function Header() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: true, second: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="site-header fixed top-0 left-0 w-full flex justify-between items-start p-5 z-[120] pointer-events-none">
      <div className="pointer-events-auto">
        <Link href="/" className="text-sm font-black tracking-tight uppercase leading-none" style={{ color: 'var(--text-high)' }}>
          {personalInfo.name}
        </Link>
      </div>

      <nav className="absolute left-1/2 -translate-x-1/2 flex gap-4 md:gap-8 pointer-events-auto items-center">
        <Link href="/work" className="nav-link underline-reveal">Work</Link>
        <Link href="/archive" className="nav-link underline-reveal nav-link-muted hide-mobile">Archive</Link>
        <Link href="/info" className="nav-link underline-reveal nav-link-muted">Info</Link>
      </nav>

      <div className="flex items-center gap-4 pointer-events-auto">
        <ThemeToggle />
        <span className="text-xs font-medium tabular-nums text-right" style={{ color: 'var(--text-high)' }}>
          {time}
        </span>
      </div>
    </header>
  );
}
