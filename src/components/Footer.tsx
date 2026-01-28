import { personalInfo } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="site-footer fixed bottom-0 left-0 w-full flex justify-between items-end p-5 z-[100] pointer-events-none" style={{ backgroundColor: 'var(--bg-900)' }}>
      <div className="flex flex-col gap-1 pointer-events-auto">
        <span className="text-[10px] font-bold uppercase tracking-tighter" style={{ color: 'var(--muted-500)' }}>© 2025 {personalInfo.name}</span>
      </div>

      <div className="flex gap-4 pointer-events-auto">
        <a href={personalInfo.socials.instagram} target="_blank" rel="noreferrer" className="text-[10px] font-bold uppercase tracking-tighter transition-colors" style={{ color: 'var(--text-high)' }}>Instagram</a>
        <a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" className="text-[10px] font-bold uppercase tracking-tighter transition-colors" style={{ color: 'var(--text-high)' }}>LinkedIn</a>
        <a href={personalInfo.socials.github} target="_blank" rel="noreferrer" className="text-[10px] font-bold uppercase tracking-tighter transition-colors" style={{ color: 'var(--text-high)' }}>GitHub</a>
      </div>

      <div className="flex flex-col items-end pointer-events-auto">
        <a href={`mailto:${personalInfo.email}`} className="text-[10px] font-bold uppercase tracking-tighter transition-colors" style={{ color: 'var(--text-high)' }}>{personalInfo.email}</a>
        <span className="text-[10px] font-bold uppercase tracking-tighter" style={{ color: 'var(--muted-500)' }}>{personalInfo.phone}</span>
      </div>
    </footer>
  );
}
