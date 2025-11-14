"use client";

import { personalInfo } from "@/lib/data";
import { motion } from "framer-motion";

export default function CertificatesSection() {
  const certificates = personalInfo.certificates;

  return (
    <section className="py-24 px-5 bg-[#fcfcfc]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-end mb-16 border-b border-black/10 pb-6">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#999] block mb-2">
              CREDENTIALS
            </span>
            <h2 className="text-5xl font-black uppercase tracking-[-0.04em] leading-[0.9]">
              CERTIFICATIONS
            </h2>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#999]">
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
              className="group relative bg-white border border-black/5 p-6 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] hover:border-[#0008ff]/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              itemScope
              itemType="https://schema.org/EducationalOccupationalCredential"
            >
              {/* Certificate Number */}
              <span className="absolute top-4 right-4 text-[10px] font-black text-[#999] opacity-40 group-hover:opacity-100 transition-opacity">
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Issuer Badge */}
              <div className="inline-block px-3 py-1 bg-black/5 text-[9px] font-black uppercase tracking-widest mb-4 group-hover:bg-[#0008ff]/10 transition-colors">
                <span itemProp="credentialCategory">{cert.issuer}</span>
              </div>

              {/* Title */}
              <h3 
                className="text-sm font-black uppercase tracking-tight leading-tight mb-3 group-hover:text-[#0008ff] transition-colors"
                itemProp="name"
              >
                {cert.title}
              </h3>

              {/* Year */}
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-[#999] uppercase" itemProp="dateCreated">
                  {cert.year}
                </span>
                <span className="text-[9px] font-black uppercase tracking-widest text-[#0008ff] opacity-0 group-hover:opacity-100 transition-opacity">
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
