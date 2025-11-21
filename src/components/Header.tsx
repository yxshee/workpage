"use client";

import Link from "next/link";
import { personalInfo } from "@/lib/data";
import { ThemeToggle } from "./ThemeProvider";

export default function Header() {
  return (
    <header className="site-header fixed top-0 left-0 w-full flex justify-between items-start p-5 z-[120] pointer-events-none">
      <div className="pointer-events-auto">
        <Link href="/" className="text-sm font-black tracking-tight uppercase leading-none link-hover" style={{ color: 'var(--text-high)' }}>
          {personalInfo.name}
        </Link>
      </div>

      <nav className="absolute left-1/2 -translate-x-1/2 flex gap-4 md:gap-8 pointer-events-auto items-center">
        <Link href="/work" className="nav-link underline-reveal">Work</Link>
        <Link href="/archive" className="nav-link underline-reveal nav-link-muted hide-mobile">Archive</Link>
        <Link href="/info" className="nav-link underline-reveal nav-link-muted">Info</Link>
      </nav>

      <div className="pointer-events-auto">
        <ThemeToggle />
      </div>
    </header>
  );
}
