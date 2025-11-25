"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { personalInfo } from "@/lib/data";
import { ThemeToggle } from "./ThemeProvider";

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <header className={`header-bar ${isHomePage ? "header-bar--home" : ""} fixed top-0 left-0 w-full grid grid-cols-3 items-center px-6 py-4 z-[120] pointer-events-none`}>
      <div className="pointer-events-auto justify-self-start">
        <Link href="/" className="text-lg tracking-tight uppercase leading-none link-hoverable" style={{ color: 'var(--text-high)' }}>
          {personalInfo.name}
        </Link>
      </div>

      <nav className="pointer-events-auto justify-self-center flex gap-5 md:gap-10 items-center">
        <Link href="/work" className="header-nav__link link-underline">Work</Link>
        <Link href="/archive" className="header-nav__link link-underline u-hide-mobile">Archive</Link>
        <Link href="/info" className="header-nav__link link-underline">Info</Link>
      </nav>

      <div className="pointer-events-auto justify-self-end">
        <ThemeToggle />
      </div>
    </header>
  );
}
