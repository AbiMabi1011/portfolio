import { Printer, X, Mail, Phone, MapPin, Globe } from 'lucide-react';
import {
  PROFILE,
  EXPERIENCES,
  PROJECTS,
  EDUCATION,
  SKILL_GROUPS,
  CERTIFICATIONS,
  SPOKEN_LANGUAGES,
  REFERENCES,
} from '../data/portfolioData';

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
  accent: 'blue' | 'emerald';
}

export function ResumeModal({ open, onClose, accent }: ResumeModalProps) {
  if (!open) return null;
  const isEmerald = accent === 'emerald';
  const accentText = isEmerald ? 'text-emerald-700' : 'text-blue-700';
  const accentBg = isEmerald ? 'bg-emerald-600' : 'bg-blue-600';
  const accentBorder = isEmerald ? 'border-emerald-600' : 'border-blue-600';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/55 p-4 backdrop-blur-xs print:static print:block print:bg-white print:p-0"
      onClick={onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-4xl overflow-y-auto border border-zinc-200 bg-white shadow-2xl print:max-h-none print:max-w-none print:overflow-visible print:border-0 print:shadow-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Action Bar (hidden when printing) */}
        <div className="no-print sticky top-0 z-10 flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-6 py-3">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-600">
            Curriculum Vitae — Print &amp; PDF Preview
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className={`inline-flex items-center gap-1.5 rounded-md px-4 py-1.5 font-mono text-xs font-semibold text-white transition-colors ${
                isEmerald
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              <Printer className="h-3.5 w-3.5" />
              Print / Save PDF
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md p-1.5 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900"
              aria-label="Close resume preview"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Top Accent Strip */}
        <div className={`h-1.5 w-full ${accentBg}`} />

        {/* Executive ATS-Ready CV Sheet */}
        <div className="space-y-5 p-7 text-zinc-900 sm:p-10 print:space-y-4 print:p-0 print:pt-3">
          {/* Header */}
          <header className="flex flex-col justify-between gap-4 border-b border-zinc-300 pb-4 sm:flex-row sm:items-end print:flex-row print:items-end">
            <div>
              <h1 className="font-display text-2xl font-extrabold tracking-tight text-zinc-950 sm:text-3xl">
                {PROFILE.name}
              </h1>
              <p className={`mt-1 text-xs font-semibold sm:text-sm ${accentText}`}>
                {PROFILE.subHeadline}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-1 font-mono text-[11px] text-zinc-600 sm:text-right print:text-right">
              <div className="inline-flex items-center gap-1.5 sm:justify-end print:justify-end">
                <MapPin className="h-3 w-3 text-zinc-400" />
                <span>{PROFILE.location}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 sm:justify-end print:justify-end">
                <Mail className="h-3 w-3 text-zinc-400" />
                <span>{PROFILE.email}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 sm:justify-end print:justify-end">
                <Phone className="h-3 w-3 text-zinc-400" />
                <span>{PROFILE.phone}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 sm:justify-end print:justify-end">
                <Globe className="h-3 w-3 text-zinc-400" />
                <span>abishanan.tech</span>
              </div>
            </div>
          </header>

          {/* Professional Profile */}
          <section className="break-inside-avoid">
            <h2 className={`border-b ${accentBorder} pb-1 font-mono text-[11px] font-bold uppercase tracking-widest ${accentText}`}>
              Professional Profile
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-zinc-700">
              {PROFILE.summary}
            </p>
          </section>

          {/* Professional Experience */}
          <section className="break-inside-avoid">
            <h2 className={`border-b ${accentBorder} pb-1 font-mono text-[11px] font-bold uppercase tracking-widest ${accentText}`}>
              Professional Experience
            </h2>
            <div className="mt-2.5 space-y-3.5">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="break-inside-avoid">
                  <div className="flex items-baseline justify-between gap-4">
                    <div>
                      <span className="text-sm font-bold text-zinc-950">
                        {exp.role}
                      </span>
                      <span className="text-sm font-semibold text-zinc-700">
                        {' '}
                        &mdash; {exp.company}
                      </span>
                    </div>
                    <span className="shrink-0 font-mono text-[11px] font-medium text-zinc-500">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-[11px] italic text-zinc-500">{exp.subtitle}</p>
                  <ul className="mt-1.5 list-disc space-y-1 pl-4 text-xs leading-relaxed text-zinc-700">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Key Projects */}
          <section className="break-inside-avoid">
            <h2 className={`border-b ${accentBorder} pb-1 font-mono text-[11px] font-bold uppercase tracking-widest ${accentText}`}>
              Key Projects
            </h2>
            <div className="mt-2.5 space-y-3">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="break-inside-avoid">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-sm font-bold text-zinc-950">{proj.title}</h3>
                    {proj.liveLabel && (
                      <span className={`shrink-0 font-mono text-[11px] font-medium ${accentText}`}>
                        {proj.liveLabel}
                      </span>
                    )}
                  </div>
                  <ul className="mt-1 list-disc space-y-1 pl-4 text-xs leading-relaxed text-zinc-700">
                    {proj.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Technical Skills (Strictly Aligned 2-Column Table) */}
          <section className="break-inside-avoid">
            <h2 className={`border-b ${accentBorder} pb-1 font-mono text-[11px] font-bold uppercase tracking-widest ${accentText}`}>
              Technical Skills
            </h2>
            <div className="mt-2.5 space-y-1.5 text-xs">
              {SKILL_GROUPS.map((g) => (
                <div
                  key={g.category}
                  className="grid grid-cols-1 gap-1 sm:grid-cols-[165px_1fr] print:grid-cols-[155px_1fr]"
                >
                  <span className="font-semibold text-zinc-900">{g.category}</span>
                  <span className="text-zinc-700">{g.items.join(' · ')}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Education & Certifications */}
          <section className="break-inside-avoid grid gap-6 sm:grid-cols-2 print:grid-cols-2">
            <div>
              <h2 className={`border-b ${accentBorder} pb-1 font-mono text-[11px] font-bold uppercase tracking-widest ${accentText}`}>
                Education
              </h2>
              <div className="mt-2.5 space-y-2.5">
                {EDUCATION.map((edu) => (
                  <div key={edu.degree}>
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-xs font-bold text-zinc-950">{edu.degree}</span>
                      <span className="shrink-0 font-mono text-[10px] text-zinc-500">
                        {edu.period}
                      </span>
                    </div>
                    <div className="text-xs text-zinc-700">{edu.institution}</div>
                    {edu.detail && (
                      <div className="text-[11px] text-zinc-500">{edu.detail}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className={`border-b ${accentBorder} pb-1 font-mono text-[11px] font-bold uppercase tracking-widest ${accentText}`}>
                Certifications
              </h2>
              <ul className="mt-2.5 list-disc space-y-1 pl-4 text-xs text-zinc-700">
                {CERTIFICATIONS.map((c) => (
                  <li key={`${c.title}-${c.issuer}`}>
                    <span className="font-medium text-zinc-900">{c.title}</span> &mdash;{' '}
                    <span className="text-zinc-500">{c.issuer}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Languages & References */}
          <section className="break-inside-avoid grid gap-6 sm:grid-cols-2 print:grid-cols-2">
            <div>
              <h2 className={`border-b ${accentBorder} pb-1 font-mono text-[11px] font-bold uppercase tracking-widest ${accentText}`}>
                Languages
              </h2>
              <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-xs text-zinc-700">
                {SPOKEN_LANGUAGES.map((l) => (
                  <span key={l.language}>
                    <strong className="text-zinc-900">{l.language}</strong> ({l.level})
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className={`border-b ${accentBorder} pb-1 font-mono text-[11px] font-bold uppercase tracking-widest ${accentText}`}>
                References
              </h2>
              <div className="mt-2 grid gap-2 sm:grid-cols-2 print:grid-cols-2">
                {REFERENCES.map((r) => (
                  <div key={r.email} className="text-[11px] leading-snug text-zinc-600">
                    <div className="font-bold text-zinc-900">{r.name}</div>
                    <div>{r.role}, SLIIT Northern Uni</div>
                    <div className="font-mono text-[10px]">{r.email}</div>
                    <div className="font-mono text-[10px]">{r.phone}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
