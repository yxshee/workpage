import { personalInfo } from "@/lib/data";

export default function InfoPage() {
  return (
    <div className="min-h-screen pt-32 px-5 pb-20 max-w-4xl">
      <h1 className="text-7xl font-black uppercase tracking-tighter mb-12">Info</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <p className="text-xl font-medium leading-relaxed mb-10">
            {personalInfo.summary}
          </p>
          
          <div className="space-y-8">
            <section>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-[#999] mb-4">Contact</h3>
              <div className="space-y-1">
                <p className="text-sm font-bold uppercase">{personalInfo.email}</p>
                <p className="text-sm font-bold uppercase text-[#999]">{personalInfo.phone}</p>
                <p className="text-sm font-bold uppercase text-[#999]">{personalInfo.location}</p>
              </div>
            </section>
          </div>
        </div>

        <div className="space-y-12">
          <section>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-[#999] mb-4">Education</h3>
            {personalInfo.education.map((edu, i) => (
              <div key={i} className="mb-4">
                <p className="text-sm font-bold uppercase">{edu.institution}</p>
                <p className="text-xs font-bold uppercase text-[#999]">{edu.degree}</p>
                <p className="text-[10px] uppercase text-[#999] mt-1">{edu.period} • {edu.score}</p>
              </div>
            ))}
          </section>

          <section>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-[#999] mb-4">Certifications</h3>
            <div className="space-y-2">
              {personalInfo.archive.map((item) => (
                <div key={item.id} className="flex justify-between border-b border-black/5 pb-2">
                  <span className="text-[10px] font-bold uppercase">{item.title}</span>
                  <span className="text-[10px] font-bold uppercase text-[#999]">{item.year}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
