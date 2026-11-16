import { EXPERIENCES } from '../data/portfolioData';
import { useInView } from '../hooks/useInView';

interface ExperienceProps {
  accent: 'blue' | 'emerald';
}

export function Experience({ accent }: ExperienceProps) {
  const { ref, isVisible } = useInView();
  const isEmerald = accent === 'emerald';

  return (
    <section id="experience" className="border-b border-zinc-300 bg-white py-20 sm:py-24">
      <div
        ref={ref}
        className={`mx-auto max-w-[1400px] px-6 transition-all duration-700 sm:px-10 lg:px-14 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        <div className="flex flex-col justify-between gap-4 border-b border-zinc-300 pb-6 sm:flex-row sm:items-end">
          <div>
            <span
              className={`font-mono text-xs font-semibold uppercase tracking-[0.2em] ${
                isEmerald ? 'text-emerald-700' : 'text-blue-700'
              }`}
            >
              [ 01 / EXPERIENCE ]
            </span>
            <h2 className="mt-2 font-condensed text-5xl tracking-wide text-zinc-950 uppercase sm:text-6xl">
              Professional History
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            12 Months Combined Industry Experience
          </p>
        </div>

        <div className="divide-y divide-zinc-300">
          {EXPERIENCES.map((exp, index) => (
            <article
              key={exp.id}
              className="relative grid gap-6 overflow-hidden py-10 md:grid-cols-12"
            >
              <span className="pointer-events-none absolute right-2 bottom-2 font-condensed text-8xl leading-none text-zinc-100 select-none">
                0{index + 1}
              </span>

              <div className="relative z-10 md:col-span-4">
                <div className="font-mono text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  {exp.period}
                </div>
                <h3 className="mt-2 font-condensed text-3xl tracking-wide text-zinc-950 uppercase">
                  {exp.company}
                </h3>
                <p
                  className={`mt-1 font-mono text-xs font-semibold uppercase tracking-wider ${
                    isEmerald ? 'text-emerald-700' : 'text-blue-700'
                  }`}
                >
                  {exp.role}
                </p>
                <p className="mt-2 text-xs italic text-zinc-500">{exp.subtitle}</p>
              </div>

              <div className="relative z-10 md:col-span-8">
                <ul className="space-y-3">
                  {exp.highlights.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm leading-relaxed text-zinc-700 sm:text-[15px]"
                    >
                      <span
                        className={`mt-2 h-1.5 w-1.5 shrink-0 ${
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
                      className="border border-zinc-300 bg-zinc-50 px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-wider text-zinc-700"
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
