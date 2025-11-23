import { personalInfo } from "@/lib/data";
import Image from "next/image";

export default function ArchivePage() {
  return (
    <div className="page-shell min-h-screen px-5 pb-20" style={{ backgroundColor: 'var(--bg-900)' }}>
      <h1 className="text-6xl md:text-7xl uppercase tracking-tighter mb-16" style={{ color: 'var(--text-high)' }}>Archive</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {personalInfo.archive.map((archiveItem) => (
          <div 
            key={archiveItem.id} 
            className="group relative aspect-[3/4] overflow-hidden"
            style={{ backgroundColor: 'var(--surface-600)' }}
          >
            {archiveItem.image && (
              <Image
                src={archiveItem.image}
                alt={archiveItem.title}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 ease-[0.23,1,0.32,1] group-hover:scale-105"
                loading="lazy"
                decoding="async"
                quality={85}
              />
            )}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-[0.23,1,0.32,1]">
              <span className="text-[10px] text-white/50 uppercase tracking-widest">{archiveItem.year}</span>
              <h3 className="text-base text-white uppercase tracking-tight mt-1">{archiveItem.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Table view for non-image items */}
      <table className="w-full border-collapse mt-16">
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--muted-500)' }}>
            <th className="text-left py-4 text-xs font-semibold uppercase tracking-[0.14em]">Year</th>
            <th className="text-left py-4 text-xs font-semibold uppercase tracking-[0.14em]">Project</th>
            <th className="text-right py-4 text-xs font-semibold uppercase tracking-[0.14em]">Type</th>
          </tr>
        </thead>
        <tbody>
          {personalInfo.archive.map((archiveItem) => (
            <tr key={archiveItem.id} className="transition-colors group" style={{ borderBottom: '1px solid var(--border)' }}>
              <td className="py-6 text-sm font-semibold" style={{ color: 'var(--text-high)' }}>{archiveItem.year}</td>
              <td className="py-6">
                <span className="text-sm font-semibold transition-colors" style={{ color: 'var(--text-high)' }}>{archiveItem.title}</span>
              </td>
              <td className="py-6 text-right text-xs font-medium" style={{ color: 'var(--muted-500)' }}>External</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
