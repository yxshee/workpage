import { personalInfo } from "@/lib/data";
import WorkList from "@/app/work/WorkList";

export default function WorkPage() {
  return (
    <div className="page-shell min-h-screen px-5 pb-20" style={{ backgroundColor: 'var(--bg-900)' }}>
      <div className="flex justify-between items-end mb-20">
        <h1 className="text-7xl md:text-8xl uppercase tracking-tighter leading-[0.82]" style={{ color: 'var(--text-high)' }}>Selected<br/>Works</h1>
        <div className="text-right">
          <span className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--muted-500)' }}>2021 — 2026</span>
        </div>
      </div>

      <WorkList projects={personalInfo.projects} githubUrl={personalInfo.socials.github} />
    </div>
  );
}
