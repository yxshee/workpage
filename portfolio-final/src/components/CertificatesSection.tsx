"use client";

import { personalInfo } from "@/lib/data";
import { motion } from "framer-motion";

export default function CertificatesSection() {
  const certificates = personalInfo.certificates;

  return (
    <section className="py-24 px-5" style={{ backgroundColor: 'var(--bg-800)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-end mb-16 pb-6" style={{ borderBottom: '1px solid var(--border)' }}>
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] block mb-2" style={{ color: 'var(--muted-500)' }}>
              CREDENTIALS
            </span>
            <h2 className="text-5xl font-black uppercase tracking-[-0.04em] leading-[0.9]" style={{ color: 'var(--text-high)' }}>
              CERTIFICATIONS
            </h2>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--muted-500)' }}>
            {certificates.length} CERTIFICATES
          </span>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <motion.a
              key={cert.id}
              href={cert.file}
              target="_blank"
              rel="noreferrer"
              className="group relative p-6 transition-all duration-500"
              style={{ 
                backgroundColor: 'var(--surface-700)',
                border: '1px solid var(--border)'
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              itemScope
              itemType="https://schema.org/EducationalOccupationalCredential"
            >
              {/* Certificate Number */}
              <span className="absolute top-4 right-4 text-[10px] font-black opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--muted-500)' }}>
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Issuer Badge */}
              <div 
                className="inline-block px-3 py-1 text-[9px] font-black uppercase tracking-widest mb-4 transition-colors"
                style={{ backgroundColor: 'var(--glass)', color: 'var(--text-medium)' }}
              >
                <span itemProp="credentialCategory">{cert.issuer}</span>
              </div>

              {/* Title */}
              <h3 
                className="text-sm font-black uppercase tracking-tight leading-tight mb-3 transition-colors group-hover:text-[var(--accent)]"
                style={{ color: 'var(--text-high)' }}
                itemProp="name"
              >
                {cert.title}
              </h3>

              {/* Year */}
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase" style={{ color: 'var(--muted-500)' }} itemProp="dateCreated">
                  {cert.year}
                </span>
                <span className="text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--accent)' }}>
                  VIEW →
                </span>
              </div>

              {/* Hidden schema.org data */}
              <meta itemProp="url" content={cert.file} />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
