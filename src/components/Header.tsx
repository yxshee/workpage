"use client";

import Link from "next/link";
import { personalInfo } from "@/lib/data";
import { ThemeToggle } from "./ThemeProvider";

export default function Header() {
  return (
    <header className="site-header fixed top-0 left-0 w-full grid grid-cols-3 items-center px-6 py-4 z-[120] pointer-events-none">
      <div className="pointer-events-auto justify-self-start">
        <Link href="/" className="text-lg font-black tracking-tight uppercase leading-none link-hover" style={{ color: 'var(--text-high)' }}>
          {personalInfo.name}
        </Link>
      </div>

      <nav className="pointer-events-auto justify-self-center flex gap-5 md:gap-10 items-center">
        <Link href="/work" className="nav-link underline-reveal">Work</Link>
        <Link href="/archive" className="nav-link underline-reveal nav-link-muted hide-mobile">Archive</Link>
        <Link href="/info" className="nav-link underline-reveal nav-link-muted">Info</Link>
      </nav>

      <div className="pointer-events-auto justify-self-end">
        <ThemeToggle />
      </div>
    </header>
  );
}
