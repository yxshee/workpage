import { personalInfo } from "@/lib/data";

export default function InfoPage() {
  const hasCertifications = personalInfo.certifications?.length > 0;
  return (
    <div className="page-shell h-screen w-full px-5 overflow-hidden" style={{ backgroundColor: 'var(--bg-900)' }}>
      <h1 className="text-6xl md:text-7xl uppercase tracking-tighter mb-12" style={{ color: 'var(--text-high)' }}>Info</h1>
      
      <div className={`grid grid-cols-1 ${hasCertifications ? "lg:grid-cols-2" : ""} gap-20`}>
        <div>
          <p className="text-lg md:text-xl leading-relaxed mb-10" style={{ color: 'var(--text-medium)' }}>
            {personalInfo.summary}
          </p>
          
          <div className="space-y-8">
            <section>
              <h3 className="text-xs uppercase tracking-[0.14em] mb-4" style={{ color: 'var(--muted-500)' }}>Contact</h3>
              <div className="space-y-1">
                <p className="text-sm" style={{ color: 'var(--text-high)' }}>{personalInfo.email}</p>
                <p className="text-sm" style={{ color: 'var(--muted-500)' }}>{personalInfo.phone}</p>
                <p className="text-sm" style={{ color: 'var(--muted-500)' }}>{personalInfo.location}</p>
                <a
                  href={personalInfo.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-sm link-hoverable link-underline arrow-nudge"
                  style={{ color: 'var(--text-high)' }}
                >
                  Resume
                </a>
              </div>
            </section>
            
            <section>
              <h3 className="text-xs uppercase tracking-[0.14em] mb-4" style={{ color: 'var(--muted-500)' }}>Education</h3>
              {personalInfo.education.map((educationEntry, educationIndex) => (
                <div key={educationIndex} className="mb-4">
                  <p className="text-sm" style={{ color: 'var(--text-high)' }}>{educationEntry.institution}</p>
                  <p className="text-xs" style={{ color: 'var(--muted-500)' }}>{educationEntry.degree}</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--muted-500)' }}>{educationEntry.period} • {educationEntry.score}</p>
                </div>
              ))}
            </section>
          </div>
        </div>

        {hasCertifications && (
          <div>
            <section>
              <h3 className="text-xs uppercase tracking-[0.14em] mb-4" style={{ color: 'var(--muted-500)' }}>Certifications</h3>
              <div className="space-y-2">
                {personalInfo.certifications.map((certification) => (
                  <div key={certification.id} className="flex justify-between pb-2" style={{ borderBottom: '1px solid var(--border)' }}>
                    <span className="text-xs" style={{ color: 'var(--text-high)' }}>{certification.title}</span>
                    <span className="text-xs" style={{ color: 'var(--muted-500)' }}>{certification.year}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
