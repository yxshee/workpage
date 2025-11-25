"use client";

import { usePathname } from "next/navigation";
import { personalInfo } from "@/lib/data";

export default function Footer() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <footer className={`footer-bar ${isHomePage ? "footer-bar--home" : ""} fixed bottom-0 left-0 w-full grid grid-cols-3 items-center px-6 py-4 z-[100] pointer-events-none`}>
      <div className="flex flex-col gap-1 pointer-events-auto justify-self-start">
        <span className="text-sm font-bold uppercase tracking-tighter" style={{ color: 'var(--muted-500)' }}>© 2025 {personalInfo.name}</span>
      </div>

      <div className="flex gap-6 pointer-events-auto justify-self-center">
        <a href={personalInfo.socials.instagram} target="_blank" rel="noreferrer" className="text-sm font-bold uppercase tracking-tighter link-hoverable link-underline" style={{ color: 'var(--text-high)' }}>Instagram</a>
        <a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" className="text-sm font-bold uppercase tracking-tighter link-hoverable link-underline" style={{ color: 'var(--text-high)' }}>LinkedIn</a>
        <a href={personalInfo.socials.github} target="_blank" rel="noreferrer" className="text-sm font-bold uppercase tracking-tighter link-hoverable link-underline" style={{ color: 'var(--text-high)' }}>GitHub</a>
      </div>

      <div className="flex flex-col items-end pointer-events-auto justify-self-end">
        <a href={`mailto:${personalInfo.email}`} className="text-sm font-bold uppercase tracking-tighter link-hoverable link-underline" style={{ color: 'var(--text-high)' }}>{personalInfo.email}</a>
        <span className="text-sm font-bold uppercase tracking-tighter" style={{ color: 'var(--muted-500)' }}>{personalInfo.phone}</span>
      </div>
    </footer>
  );
}
