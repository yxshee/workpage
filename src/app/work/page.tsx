import { personalInfo } from "@/lib/data";
import WorkList from "@/app/work/WorkList";

export default function WorkPage() {
  return (
    <div className="page-shell page-shell--info bg-primary">
      <div className="page-heading page-heading--split">
        <h1 className="page-title page-title--work text-high">Selected<br/>Projects</h1>
        <div className="page-heading__meta">
          <span className="page-kicker text-muted">2021 — 2026</span>
        </div>
      </div>

      <WorkList projects={personalInfo.projects} githubUrl={personalInfo.socials.github} />
    </div>
  );
}
