import { EXPERIENCES } from '../data/portfolioData';
import { useInView } from '../hooks/useInView';

interface ExperienceProps {
  accent: 'blue' | 'emerald';
}

export function Experience({ accent }: ExperienceProps) {
  const { ref, isVisible } = useInView();
  const isEmerald = accent === 'emerald';

  return (
    <section id="experience" className="border-b border-zinc-200 bg-zinc-50/60 py-20 sm:py-24">
      <div
        ref={ref}
        className={`mx-auto max-w-6xl px-4 transition-all duration-700 sm:px-6 lg:px-8 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        <div className="flex flex-col justify-between gap-4 border-b border-zinc-200 pb-6 sm:flex-row sm:items-end">
          <div>
            <span
              className={`font-mono text-xs font-semibold uppercase tracking-widest ${
                isEmerald ? 'text-emerald-700' : 'text-blue-700'
              }`}
            >
              01 / Experience
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
              Professional History
            </h2>
          </div>
          <p className="font-mono text-xs text-zinc-500">
            12 MONTHS COMBINED INDUSTRY EXPERIENCE
          </p>
        </div>

        <div className="divide-y divide-zinc-200">
          {EXPERIENCES.map((exp) => (
            <article
              key={exp.id}
              className="grid gap-6 py-10 transition-colors md:grid-cols-12"
            >
              <div className="md:col-span-4">
                <div className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  {exp.period}
                </div>
                <h3 className="mt-2 font-display text-xl font-bold text-zinc-950">
                  {exp.company}
                </h3>
                <p
                  className={`mt-1 text-sm font-semibold ${
                    isEmerald ? 'text-emerald-700' : 'text-blue-700'
                  }`}
                >
                  {exp.role}
                </p>
                <p className="mt-1 text-xs text-zinc-500">{exp.subtitle}</p>
              </div>

              <div className="md:col-span-8">
                <ul className="space-y-3">
                  {exp.highlights.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm leading-relaxed text-zinc-700 sm:text-[15px]"
                    >
                      <span
                        className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
                          isEmerald ? 'bg-emerald-600' : 'bg-blue-600'
                        }`}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {exp.stack.map((tech) => (
                    <span
                      key={tech}
                      className="border border-zinc-200 bg-white px-2.5 py-1 font-mono text-[11px] font-medium text-zinc-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
