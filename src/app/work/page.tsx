import { personalInfo } from "@/lib/data";
import WorkList from "@/app/work/WorkList";

export default function WorkPage() {
  return (
    <div className="page-shell page-shell--work" style={{ backgroundColor: 'var(--bg-900)' }}>
      <div className="page-heading page-heading--split">
        <h1 className="page-title page-title--work" style={{ color: 'var(--text-high)' }}>Selected<br/>Works</h1>
        <div className="page-heading__meta">
          <span className="page-kicker" style={{ color: 'var(--muted-500)' }}>2021 — 2026</span>
        </div>
      </div>

      <WorkList projects={personalInfo.projects} githubUrl={personalInfo.socials.github} />
    </div>
  );
}
