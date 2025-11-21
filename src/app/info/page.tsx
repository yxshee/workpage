import { personalInfo } from "@/lib/data";

export default function InfoPage() {
  return (
    <div className="page-shell min-h-screen px-5 pb-20 max-w-4xl" style={{ backgroundColor: 'var(--bg-900)' }}>
      <h1 className="text-7xl font-black uppercase tracking-tighter mb-12" style={{ color: 'var(--text-high)' }}>Info</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <p className="text-xl font-medium leading-relaxed mb-10" style={{ color: 'var(--text-medium)' }}>
            {personalInfo.summary}
          </p>
          
          <div className="space-y-8">
            <section>
              <h3 className="text-[10px] font-black uppercase tracking-widest mb-4" style={{ color: 'var(--muted-500)' }}>Contact</h3>
              <div className="space-y-1">
                <p className="text-sm font-bold uppercase" style={{ color: 'var(--text-high)' }}>{personalInfo.email}</p>
                <p className="text-sm font-bold uppercase" style={{ color: 'var(--muted-500)' }}>{personalInfo.phone}</p>
                <p className="text-sm font-bold uppercase" style={{ color: 'var(--muted-500)' }}>{personalInfo.location}</p>
                <a
                  href={personalInfo.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-sm font-bold uppercase link-hover underline-reveal arrow-nudge"
                  style={{ color: 'var(--text-high)' }}
                >
                  Resume
                </a>
              </div>
            </section>
            
            <section>
              <h3 className="text-[10px] font-black uppercase tracking-widest mb-4" style={{ color: 'var(--muted-500)' }}>Education</h3>
              {personalInfo.education.map((edu, i) => (
                <div key={i} className="mb-4">
                  <p className="text-sm font-bold uppercase" style={{ color: 'var(--text-high)' }}>{edu.institution}</p>
                  <p className="text-xs font-bold uppercase" style={{ color: 'var(--muted-500)' }}>{edu.degree}</p>
                  <p className="text-[10px] uppercase mt-1" style={{ color: 'var(--muted-500)' }}>{edu.period} • {edu.score}</p>
                </div>
              ))}
            </section>
          </div>
        </div>

        <div>
          <section>
            <h3 className="text-[10px] font-black uppercase tracking-widest mb-4" style={{ color: 'var(--muted-500)' }}>Certifications</h3>
            <div className="space-y-2">
              {personalInfo.certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between pb-2" style={{ borderBottom: '1px solid var(--border)' }}>
                  <span className="text-[10px] font-bold uppercase" style={{ color: 'var(--text-high)' }}>{cert.title}</span>
                  <span className="text-[10px] font-bold uppercase" style={{ color: 'var(--muted-500)' }}>{cert.year}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
