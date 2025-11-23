import { personalInfo } from "@/lib/data";
import Image from "next/image";

export default function WorkPage() {
  return (
    <div className="page-shell min-h-screen px-5 pb-20" style={{ backgroundColor: 'var(--bg-900)' }}>
      <div className="flex justify-between items-end mb-20">
        <h1 className="text-7xl md:text-8xl uppercase tracking-tighter leading-[0.82]" style={{ color: 'var(--text-high)' }}>Selected<br/>Works</h1>
        <div className="text-right">
          <span className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--muted-500)' }}>2021 — 2026</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-px border-t border-b" style={{ backgroundColor: 'var(--border)', borderColor: 'var(--border)' }}>
        {personalInfo.projects.map((project) => (
          <a
            key={project.id} 
            href={project.repoUrl ?? personalInfo.socials.github}
            target="_blank"
            rel="noreferrer"
            className="group relative flex justify-between items-center py-12 px-4 transition-colors"
            style={{ backgroundColor: 'var(--surface-700)', color: 'var(--text-high)' }}
          >
            <div className="flex items-center gap-8">
              <span className="text-[10px] uppercase tracking-tighter opacity-40 group-hover:opacity-100" style={{ color: 'var(--text-high)' }}>0{project.id}</span>
              <h3 className="text-3xl md:text-4xl uppercase tracking-tighter" style={{ color: 'var(--text-high)' }}>{project.title}</h3>
            </div>
            
            <div className="flex items-center gap-20">
              <span className="text-xs uppercase tracking-tight opacity-40 group-hover:opacity-100" style={{ color: 'var(--text-high)' }}>{project.category}</span>
              <span className="text-xs uppercase tracking-tight" style={{ color: 'var(--text-high)' }}>{project.year}</span>
            </div>

            {/* Hover Reveal Image - smaller with subtle shrink on hover */}
            <div className="project-image absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-64 opacity-0 group-hover:opacity-100 scale-100 group-hover:scale-[0.97] pointer-events-none shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden z-50 transition-all duration-300 ease-out">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="192px"
                className="object-cover"
                loading="lazy"
                decoding="async"
                quality={90}
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
