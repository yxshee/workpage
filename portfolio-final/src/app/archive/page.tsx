import { personalInfo } from "@/lib/data";

export default function ArchivePage() {
  return (
    <div className="min-h-screen pt-32 px-5 pb-20">
      <h1 className="text-7xl font-black uppercase tracking-tighter mb-16">Archive</h1>

      <table className="w-full border-collapse">
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
