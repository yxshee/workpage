"use client";

import { usePathname } from "next/navigation";
import { personalInfo } from "@/lib/data";

export default function Footer() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <footer className={`footer-bar ${isHomePage ? "footer-bar--home" : ""}`}>
      <div className="footer-bar__inner">
        <div className="footer-bar__left">
          <span className="footer-bar__meta text-muted">© 2026 {personalInfo.name}</span>
        </div>

        <div className="footer-bar__center">
          <a href={personalInfo.socials.instagram} target="_blank" rel="noreferrer" className="footer-bar__link link-hoverable link-underline text-high">Instagram</a>
          <a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" className="footer-bar__link link-hoverable link-underline text-high">LinkedIn</a>
          <a href={personalInfo.socials.github} target="_blank" rel="noreferrer" className="footer-bar__link link-hoverable link-underline text-high">GitHub</a>
        </div>

        <div className="footer-bar__right">
          <a href={`mailto:${personalInfo.email}`} className="footer-bar__link link-hoverable link-underline text-high">{personalInfo.email}</a>
          <span className="footer-bar__meta text-muted">{personalInfo.phone}</span>
        </div>
      </div>
    </footer>
  );
}
