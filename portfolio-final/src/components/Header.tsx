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
    <header className="fixed top-0 left-0 w-full flex justify-between items-start p-5 z-[100] pointer-events-none">
      <div className="pointer-events-auto">
        <Link href="/" className="text-sm font-black tracking-tight uppercase leading-none" style={{ color: 'var(--text-high)' }}>
          {personalInfo.name}
        </Link>
      </div>

      <nav className="absolute left-1/2 -translate-x-1/2 flex gap-8 pointer-events-auto">
        <Link href="/work" className="nav-link">WORK</Link>
        <Link href="/archive" className="nav-link">ARCHIVE</Link>
        <Link href="/info" className="nav-link">INFO</Link>
      </nav>

      <div className="flex items-center gap-4 pointer-events-auto">
        <ThemeToggle />
        <span className="text-xs font-medium tabular-nums" style={{ color: 'var(--text-medium)' }}>
          {time}
        </span>
      </div>
    </header>
  );
}
