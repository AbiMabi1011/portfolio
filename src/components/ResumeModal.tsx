import { Printer, X } from 'lucide-react';
import {
  PROFILE,
  EXPERIENCES,
  PROJECTS,
  EDUCATION,
  SKILL_GROUPS,
  CERTIFICATIONS,
} from '../data/portfolioData';

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
  accent: 'blue' | 'emerald';
}

export function ResumeModal({ open, onClose, accent }: ResumeModalProps) {
  if (!open) return null;
  const isEmerald = accent === 'emerald';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/50 p-4 backdrop-blur-xs print:static print:block print:bg-white print:p-0"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto border border-zinc-200 bg-white shadow-2xl print:max-h-none print:max-w-none print:overflow-visible print:border-0 print:shadow-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Action Bar */}
        <div className="no-print sticky top-0 z-10 flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-6 py-3">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-600">
            Curriculum Vitae — Preview
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className={`inline-flex items-center gap-1.5 rounded-md px-3.5 py-1.5 font-mono text-xs font-semibold text-white ${
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

        {/* Printable ATS-Friendly Sheet */}
        <div className="space-y-5 p-8 text-zinc-900 sm:p-10 print:space-y-4 print:p-0">
          <header className="border-b border-zinc-300 pb-4">
            <h1 className="font-display text-2xl font-extrabold tracking-tight text-zinc-950">
              {PROFILE.name}
            </h1>
            <p className="mt-1 text-sm font-semibold text-zinc-700">
              {PROFILE.subHeadline}
            </p>
            <p className="mt-1 font-mono text-xs text-zinc-500">
              {PROFILE.location} &nbsp;|&nbsp; {PROFILE.email} &nbsp;|&nbsp; {PROFILE.phone}
            </p>
          </header>

          <section>
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-500">
              Professional Profile
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-zinc-700">
              {PROFILE.summary}
            </p>
          </section>

          <section>
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-500">
              Professional Experience
            </h2>
            <div className="mt-2 space-y-4">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id}>
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-sm font-bold text-zinc-950">
                      {exp.role} &mdash; {exp.company}
                    </h3>
                    <span className="font-mono text-[11px] text-zinc-500">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-xs italic text-zinc-500">{exp.subtitle}</p>
                  <ul className="mt-1.5 list-disc space-y-1 pl-4 text-xs text-zinc-700">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-500">
              Key Projects
            </h2>
            <div className="mt-2 space-y-3">
              {PROJECTS.map((proj) => (
                <div key={proj.id}>
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-sm font-bold text-zinc-950">{proj.title}</h3>
                    {proj.liveLabel && (
                      <span className="font-mono text-[11px] text-zinc-500">
                        {proj.liveLabel}
                      </span>
                    )}
                  </div>
                  <ul className="mt-1 list-disc space-y-1 pl-4 text-xs text-zinc-700">
                    {proj.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-500">
              Education &amp; Certifications
            </h2>
            <div className="mt-2 grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                {EDUCATION.map((edu) => (
                  <div key={edu.degree}>
                    <div className="text-xs font-bold text-zinc-900">{edu.degree}</div>
                    <div className="text-xs text-zinc-600">{edu.institution}</div>
                    <div className="font-mono text-[11px] text-zinc-500">{edu.period}</div>
                  </div>
                ))}
              </div>
              <ul className="list-disc space-y-1 pl-4 text-xs text-zinc-700">
                {CERTIFICATIONS.map((c) => (
                  <li key={`${c.title}-${c.issuer}`}>
                    {c.title} &mdash; {c.issuer}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-500">
              Technical Skills
            </h2>
            <div className="mt-2 space-y-1 text-xs text-zinc-700">
              {SKILL_GROUPS.map((g) => (
                <div key={g.category}>
                  <span className="font-bold text-zinc-900">{g.category}: </span>
                  <span>{g.items.join(', ')}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
