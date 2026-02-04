import { personalInfo } from "@/lib/data";

export default function InfoPage() {
  const hasCertifications = personalInfo.certifications?.length > 0;
  return (
    <div className="page-shell page-shell--info bg-primary">
      <h1 className="page-title text-high">Info</h1>
      
      <div className={`info-layout ${hasCertifications ? "info-layout--with-certs" : ""}`}>
        <div className="info-layout__main">
          <p className="info-summary text-medium">
            {personalInfo.summary}
          </p>
          
          <div className="info-sections">
            <section>
              <h3 className="info-section__title text-muted">Contact</h3>
              <div className="info-section__content">
                <p className="info-line text-high">{personalInfo.email}</p>
                <p className="info-line text-muted">{personalInfo.phone}</p>
                <p className="info-line text-muted">{personalInfo.location}</p>
                <a
                  href={personalInfo.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="info-link link-underline text-high"
                >
                  Resume
                </a>
              </div>
            </section>
            
            <section>
              <h3 className="info-section__title text-muted">Education</h3>
              {personalInfo.education.map((educationEntry, educationIndex) => (
                <div key={educationIndex} className="info-education">
                  <p className="info-line text-high">{educationEntry.institution}</p>
                  <p className="info-subline text-muted">{educationEntry.degree}</p>
                  <p className="info-subline info-subline--spaced text-muted">{educationEntry.period} • {educationEntry.score}</p>
                </div>
              ))}
            </section>
          </div>
        </div>

        {hasCertifications && (
          <div className="info-layout__side">
            <section>
              <h3 className="info-section__title text-muted">Certifications</h3>
              <div className="info-cert-list">
                {personalInfo.certifications.map((certification) => (
                  <div key={certification.id} className="info-cert-item">
                    <span className="info-cert-item__title text-high">{certification.title}</span>
                    <span className="info-cert-item__year text-muted">{certification.year}</span>
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
