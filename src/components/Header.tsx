"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { personalInfo } from "@/lib/data";
import { ThemeToggle } from "./ThemeProvider";

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <header className={`header-bar ${isHomePage ? "header-bar--home" : ""}`}>
      <div className="header-bar__inner">
        <div className="header-bar__brand">
          <Link
            href="/"
            className="header-brand link-hoverable"
            style={{ color: "var(--text-high)" }}
          >
            {personalInfo.name}
          </Link>
        </div>

        <nav className="header-nav">
          <Link href="/work" className="header-nav__link link-underline">Work</Link>
          <Link href="/archive" className="header-nav__link link-underline u-hide-mobile">Archive</Link>
          <Link href="/info" className="header-nav__link link-underline">Info</Link>
        </nav>

        <div className="header-bar__actions">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
