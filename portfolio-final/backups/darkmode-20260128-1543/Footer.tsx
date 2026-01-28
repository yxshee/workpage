import { personalInfo } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full flex justify-between items-end p-5 z-[100] pointer-events-none">
      <div className="flex flex-col gap-1 pointer-events-auto">
        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">© 2025 {personalInfo.name}</span>
      </div>

      <div className="flex gap-4 pointer-events-auto">
        <a href={personalInfo.socials.instagram} target="_blank" rel="noreferrer" className="text-[10px] font-bold uppercase tracking-tighter transition-colors hover:text-[#0008ff]" aria-label="Instagram">INSTAGRAM</a>
        <a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" className="text-[10px] font-bold uppercase tracking-tighter transition-colors hover:text-[#0008ff]" aria-label="LinkedIn">LINKEDIN</a>
        <a href={personalInfo.socials.github} target="_blank" rel="noreferrer" className="text-[10px] font-bold uppercase tracking-tighter transition-colors hover:text-[#0008ff]" aria-label="GitHub">GITHUB</a>
      </div>

      <div className="flex flex-col items-end pointer-events-auto">
        <a href={`mailto:${personalInfo.email}`} className="text-[10px] font-bold uppercase tracking-tighter transition-colors hover:text-[#0008ff]">{personalInfo.email}</a>
        <span className="text-[10px] font-bold uppercase tracking-tighter text-gray-400">{personalInfo.phone}</span>
      </div>
    </footer>
  );
}
