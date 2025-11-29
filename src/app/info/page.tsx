import { personalInfo } from "@/lib/data";

export default function InfoPage() {
  const hasCertifications = personalInfo.certifications?.length > 0;
  return (
    <div
      className="page-shell page-shell--info"
      style={{
        backgroundColor: "var(--bg-900)",
      }}
    >
      <h1 className="page-title" style={{ color: 'var(--text-high)' }}>Info</h1>
      
      <div className={`info-layout ${hasCertifications ? "info-layout--with-certs" : ""}`}>
        <div className="info-layout__main">
          <p className="info-summary" style={{ color: 'var(--text-medium)' }}>
            {personalInfo.summary}
          </p>
          
          <div className="info-sections">
            <section>
              <h3 className="info-section__title" style={{ color: 'var(--muted-500)' }}>Contact</h3>
              <div className="info-section__content">
                <p className="info-line" style={{ color: 'var(--text-high)' }}>{personalInfo.email}</p>
                <p className="info-line" style={{ color: 'var(--muted-500)' }}>{personalInfo.phone}</p>
                <p className="info-line" style={{ color: 'var(--muted-500)' }}>{personalInfo.location}</p>
                <a
                  href={personalInfo.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="info-link link-underline"
                  style={{ color: 'var(--text-high)' }}
                >
                  Resume
                </a>
              </div>
            </section>
            
            <section>
              <h3 className="info-section__title" style={{ color: 'var(--muted-500)' }}>Education</h3>
              {personalInfo.education.map((educationEntry, educationIndex) => (
                <div key={educationIndex} className="info-education">
                  <p className="info-line" style={{ color: 'var(--text-high)' }}>{educationEntry.institution}</p>
                  <p className="info-subline" style={{ color: 'var(--muted-500)' }}>{educationEntry.degree}</p>
                  <p className="info-subline info-subline--spaced" style={{ color: 'var(--muted-500)' }}>{educationEntry.period} • {educationEntry.score}</p>
                </div>
              ))}
            </section>
          </div>
        </div>

        {hasCertifications && (
          <div className="info-layout__side">
            <section>
              <h3 className="info-section__title" style={{ color: 'var(--muted-500)' }}>Certifications</h3>
              <div className="info-cert-list">
                {personalInfo.certifications.map((certification) => (
                  <div key={certification.id} className="info-cert-item" style={{ borderBottom: '1px solid var(--border)' }}>
                    <span className="info-cert-item__title" style={{ color: 'var(--text-high)' }}>{certification.title}</span>
                    <span className="info-cert-item__year" style={{ color: 'var(--muted-500)' }}>{certification.year}</span>
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
