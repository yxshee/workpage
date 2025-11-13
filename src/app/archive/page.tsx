import { personalInfo } from "@/lib/data";
import Image from "next/image";

export default function ArchivePage() {
  return (
    <div className="min-h-screen pt-32 px-5 pb-20">
      <h1 className="text-7xl font-black uppercase tracking-tighter mb-16">Archive</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {personalInfo.archive.map((item) => (
          <div 
            key={item.id} 
            className="group relative aspect-[4/3] bg-black/5 overflow-hidden"
          >
            {item.image && (
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-[0.23,1,0.32,1] group-hover:scale-110"
                loading="lazy"
                decoding="async"
                quality={85}
              />
            )}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-[0.23,1,0.32,1]">
              <span className="text-[10px] text-white/50 font-black uppercase tracking-widest">{item.year}</span>
              <h3 className="text-base text-white font-black uppercase tracking-tight mt-1">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Table view for non-image items */}
      <table className="w-full border-collapse mt-16">
        <thead>
          <tr className="border-b border-black text-[#999]">
            <th className="text-left py-4 text-[10px] font-black uppercase tracking-widest">Year</th>
            <th className="text-left py-4 text-[10px] font-black uppercase tracking-widest">Project</th>
            <th className="text-right py-4 text-[10px] font-black uppercase tracking-widest">Type</th>
          </tr>
        </thead>
        <tbody>
          {personalInfo.archive.map((item) => (
            <tr key={item.id} className="border-b border-black/5 hover:bg-black/5 transition-colors group">
              <td className="py-6 text-sm font-bold uppercase">{item.year}</td>
              <td className="py-6">
                <span className="text-sm font-bold uppercase group-hover:text-[#0008ff] transition-colors">{item.title}</span>
              </td>
              <td className="py-6 text-right text-xs font-bold uppercase text-[#999]">External</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
