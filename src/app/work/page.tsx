import { personalInfo } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";

export default function WorkPage() {
  return (
    <div className="min-h-screen px-5 pb-20" style={{ backgroundColor: 'var(--bg-900)', paddingTop: 'calc(var(--site-header-height) + 48px)' }}>
      <div className="flex justify-between items-end mb-20">
        <h1 className="text-8xl font-black uppercase tracking-tighter leading-[0.8]" style={{ color: 'var(--text-high)' }}>Selected<br/>Works</h1>
        <div className="text-right">
          <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--muted-500)' }}>2021 — 2025</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-px border-t border-b" style={{ backgroundColor: 'var(--border)', borderColor: 'var(--border)' }}>
        {personalInfo.projects.map((project) => (
          <Link 
            key={project.id} 
            href={`/work/${project.id}`}
            className="group relative flex justify-between items-center py-12 px-4 transition-colors"
            style={{ backgroundColor: 'var(--surface-700)', color: 'var(--text-high)' }}
          >
            <div className="flex items-center gap-10">
              <span className="text-[10px] font-black uppercase tracking-tighter opacity-40 group-hover:opacity-100" style={{ color: 'var(--text-high)' }}>0{project.id}</span>
              <h3 className="text-4xl font-black uppercase tracking-tighter" style={{ color: 'var(--text-high)' }}>{project.title}</h3>
            </div>
            
            <div className="flex items-center gap-20">
              <span className="text-xs font-bold uppercase tracking-tight opacity-40 group-hover:opacity-100" style={{ color: 'var(--text-high)' }}>{project.category}</span>
              <span className="text-xs font-bold uppercase tracking-tight" style={{ color: 'var(--text-high)' }}>{project.year}</span>
            </div>

            {/* Hover Reveal Image - NO TILT, NO BLUR, STRAIGHT AND CLEAR */}
            <div className="project-image absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-80 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-500 ease-out pointer-events-none shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden z-50">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="256px"
                className="object-cover"
                loading="lazy"
                decoding="async"
                quality={90}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
