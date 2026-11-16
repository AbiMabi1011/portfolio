import { Mail, Phone } from 'lucide-react';
import {
  EDUCATION,
  CERTIFICATIONS,
  SPOKEN_LANGUAGES,
  REFERENCES,
} from '../data/portfolioData';
import { useInView } from '../hooks/useInView';

interface CredentialsProps {
  accent: 'blue' | 'emerald';
}

export function Credentials({ accent }: CredentialsProps) {
  const { ref, isVisible } = useInView();
  const isEmerald = accent === 'emerald';

  return (
    <section id="credentials" className="border-b border-zinc-300 bg-[#F7F8FA] py-20 sm:py-24">
      <div
        ref={ref}
        className={`mx-auto max-w-[1400px] px-6 transition-all duration-700 sm:px-10 lg:px-14 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        <div className="border-b border-zinc-300 pb-6">
          <span
            className={`font-mono text-xs font-semibold uppercase tracking-[0.2em] ${
              isEmerald ? 'text-emerald-700' : 'text-blue-700'
            }`}
          >
            [ 06 / BACKGROUND ]
          </span>
          <h2 className="mt-2 font-condensed text-5xl tracking-wide text-zinc-950 uppercase sm:text-6xl">
            Education &amp; Credentials
          </h2>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          {/* Left: Education & Languages */}
          <div className="space-y-10 lg:col-span-5">
            <div>
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Education
              </h3>
              <div className="mt-4 divide-y divide-zinc-200 border border-zinc-200 bg-zinc-50/50">
                {EDUCATION.map((edu) => (
                  <div key={edu.degree} className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="font-display text-base font-bold text-zinc-950">
                        {edu.degree}
                      </h4>
                      <span
                        className={`shrink-0 font-mono text-[11px] font-semibold ${
                          isEmerald ? 'text-emerald-700' : 'text-blue-700'
                        }`}
                      >
                        {edu.period}
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-medium text-zinc-700">
                      {edu.institution}
                    </p>
                    {edu.detail && (
                      <p className="mt-0.5 text-xs text-zinc-500">{edu.detail}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Languages
              </h3>
              <div className="mt-4 grid grid-cols-2 divide-x divide-zinc-200 border border-zinc-200 bg-zinc-50/50">
                {SPOKEN_LANGUAGES.map((lang) => (
                  <div key={lang.language} className="p-4">
                    <div className="font-display text-sm font-bold text-zinc-950">
                      {lang.language}
                    </div>
                    <div className="mt-0.5 font-mono text-xs text-zinc-500">
                      {lang.level}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Certifications & References */}
          <div className="space-y-10 lg:col-span-7">
            <div>
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Verified Certifications
              </h3>
              <div className="mt-4 divide-y divide-zinc-200 border border-zinc-200 bg-white">
                {CERTIFICATIONS.map((cert) => (
                  <div
                    key={`${cert.title}-${cert.issuer}`}
                    className="flex flex-col justify-between gap-1 px-5 py-3.5 sm:flex-row sm:items-center"
                  >
                    <span className="text-sm font-semibold text-zinc-900">
                      {cert.title}
                    </span>
                    <span className="font-mono text-xs text-zinc-500">
                      {cert.issuer}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Academic References
              </h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {REFERENCES.map((ref) => (
                  <div
                    key={ref.email}
                    className="border border-zinc-200 bg-zinc-50/50 p-5"
                  >
                    <h4 className="font-display text-sm font-bold text-zinc-950">
                      {ref.name}
                    </h4>
                    <p
                      className={`mt-1 text-xs font-medium ${
                        isEmerald ? 'text-emerald-700' : 'text-blue-700'
                      }`}
                    >
                      {ref.role}
                    </p>
                    <p className="mt-0.5 text-xs text-zinc-500">{ref.institution}</p>
                    <div className="mt-4 space-y-1.5 border-t border-zinc-200 pt-3 font-mono text-[11px] text-zinc-600">
                      <a
                        href={`mailto:${ref.email}`}
                        className="flex items-center gap-1.5 hover:text-zinc-950"
                      >
                        <Mail className="h-3 w-3 text-zinc-400" />
                        {ref.email}
                      </a>
                      <a
                        href={`tel:${ref.phone.replace(/\s+/g, '')}`}
                        className="flex items-center gap-1.5 hover:text-zinc-950"
                      >
                        <Phone className="h-3 w-3 text-zinc-400" />
                        {ref.phone}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
