import { FlaskConical } from 'lucide-react';
import { RESEARCH } from '../data/portfolioData';
import { useInView } from '../hooks/useInView';

interface ResearchProps {
  accent: 'blue' | 'emerald';
}

export function Research({ accent }: ResearchProps) {
  const { ref, isVisible } = useInView();
  const isEmerald = accent === 'emerald';

  return (
    <section id="research" className="border-b border-zinc-300 bg-white py-20 sm:py-24">
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
              [ 03 / RESEARCH ]
            </span>
            <h2 className="mt-2 font-condensed text-5xl tracking-wide text-zinc-950 uppercase sm:text-6xl">
              ML &amp; Hydrological Research
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            {RESEARCH.eyebrow}
          </p>
        </div>

        <div className="mt-10 grid border border-zinc-300 bg-[#F7F8FA] lg:grid-cols-12">
          {/* Left Research Abstract */}
          <div className="relative flex flex-col justify-between overflow-hidden border-b border-zinc-300 p-7 sm:p-9 lg:col-span-6 lg:border-r lg:border-b-0">
            <span className="pointer-events-none absolute right-4 -bottom-4 font-condensed text-9xl leading-none text-zinc-200/60 select-none">
              ML
            </span>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 border border-zinc-300 bg-white px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-700">
                <FlaskConical
                  className={`h-3.5 w-3.5 ${
                    isEmerald ? 'text-emerald-600' : 'text-blue-600'
                  }`}
                />
                Kalu Ganga Basin · Sri Lanka
              </div>

              <h3 className="mt-5 font-display text-xl font-bold leading-snug text-zinc-950 sm:text-2xl">
                {RESEARCH.title}
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-zinc-600 sm:text-[15px]">
                {RESEARCH.summary}
              </p>
            </div>

            <div className="relative z-10 mt-7 border-t border-zinc-300 pt-5">
              <div className="font-mono text-[11px] text-zinc-500">
                SUPERVISOR:{' '}
                <span className="font-semibold text-zinc-900">
                  {RESEARCH.supervisor}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {RESEARCH.stack.map((item) => (
                  <span
                    key={item}
                    className="border border-zinc-300 bg-white px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-zinc-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right 3-Step Experiment Pipeline */}
          <div className="divide-y divide-zinc-300 bg-white lg:col-span-6">
            {RESEARCH.methodology.map((item) => (
              <div key={item.step} className="p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <span
                    className={`font-condensed text-3xl leading-none ${
                      isEmerald ? 'text-emerald-700' : 'text-blue-700'
                    }`}
                  >
                    {item.step}
                  </span>
                  <h4 className="font-display text-base font-bold text-zinc-950">
                    {item.title}
                  </h4>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
