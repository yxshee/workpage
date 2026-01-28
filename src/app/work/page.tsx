import { personalInfo } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";

export default function WorkPage() {
  return (
    <div className="min-h-screen pt-32 px-5 pb-20">
      <div className="flex justify-between items-end mb-20">
        <h1 className="text-8xl font-black uppercase tracking-tighter leading-[0.8]">Selected<br/>Works</h1>
        <div className="text-right">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#999]">2021 — 2025</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-px bg-black/5 border-t border-b border-black/5">
        {personalInfo.projects.map((project) => (
          <Link 
            key={project.id} 
            href={`/work/${project.id}`}
            className="group relative flex justify-between items-center py-12 px-4 bg-white transition-colors hover:bg-[#0008ff] hover:text-white"
          >
            <div className="flex items-center gap-10">
              <span className="text-[10px] font-black uppercase tracking-tighter opacity-40 group-hover:opacity-100">0{project.id}</span>
              <h3 className="text-4xl font-black uppercase tracking-tighter">{project.title}</h3>
            </div>
            
            <div className="flex items-center gap-20">
              <span className="text-xs font-bold uppercase tracking-tight opacity-40 group-hover:opacity-100">{project.category}</span>
              <span className="text-xs font-bold uppercase tracking-tight">{project.year}</span>
            </div>

            {/* Hover Reveal Image */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-80 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[0.23,1,0.32,1] pointer-events-none shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden z-50 group-hover:scale-105 group-hover:rotate-2">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="256px"
                className="object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                loading="lazy"
                decoding="async"
                quality={90}
              />
              <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
