import { personalInfo } from "@/lib/data";
import Image from "next/image";

export default function ArchivePage() {
  return (
    <div className="page-shell page-shell--archive" style={{ backgroundColor: 'var(--bg-900)' }}>
      <h1 className="page-title" style={{ color: 'var(--text-high)' }}>Archive</h1>

      <div className="archive-grid">
        {personalInfo.archive.map((archiveItem) => (
          <div 
            key={archiveItem.id} 
            className="archive-grid__item group relative overflow-hidden"
            style={{ backgroundColor: 'var(--surface-600)' }}
          >
            {archiveItem.image && (
              <Image
                src={archiveItem.image}
                alt={archiveItem.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
                className="archive-grid__image object-cover transition-transform duration-700 ease-[0.23,1,0.32,1]"
                loading="lazy"
                decoding="async"
                quality={85}
              />
            )}
            <div className="archive-grid__overlay absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-all duration-500" />
            <div className="archive-grid__caption absolute bottom-0 left-0 right-0 transition-all duration-500 ease-[0.23,1,0.32,1]">
              <span className="archive-grid__year">{archiveItem.year}</span>
              <h3 className="archive-grid__title">{archiveItem.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Table view for non-image items */}
      <table className="archive-table">
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--muted-500)' }}>
            <th>Year</th>
            <th>Project</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {personalInfo.archive.map((archiveItem) => (
            <tr key={archiveItem.id} className="archive-table__row transition-colors group" style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ color: 'var(--text-high)' }}>{archiveItem.year}</td>
              <td>
                <span style={{ color: 'var(--text-high)' }}>{archiveItem.title}</span>
              </td>
              <td style={{ color: 'var(--muted-500)' }}>External</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
