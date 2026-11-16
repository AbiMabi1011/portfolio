import { useState } from 'react';
import { SKILL_GROUPS } from '../data/portfolioData';
import { useInView } from '../hooks/useInView';

const SKILL_USAGE: Record<string, string> = {
  'React.js': 'UltraKerb POS System · LMS Platform · Kalappai Studio',
  Laravel: 'LMS Platform · Kalappai Studio · Wanlanka Travel',
  'Node.js': 'UltraKerb POS Backend & APIs',
  Express: 'UltraKerb POS RESTful Services',
  PHP: 'CodeVita (Offero.lk) · Laravel Platforms',
  MySQL: 'CodeVita (Offero.lk) · LMS · Kalappai · Wanlanka',
  'Tailwind CSS': 'LMS Platform · Responsive UI Systems',
  'JavaScript (ES6+)': 'UltraKerb · CodeVita (Offero.lk) · Web Platforms',
  'RESTful API Development': 'UltraKerb POS · CodeVita · Kalappai',
  'MVC Pattern': 'Laravel Applications · Wanlanka Travel',
  Git: 'GitHub & GitLab CI/CD Workflows',
  GitHub: 'CI/CD Deployment & Version Control',
  GitLab: 'CI/CD Deployment & Team Workflows',
};

interface SkillsProps {
  accent: 'blue' | 'emerald';
}

export function Skills({ accent }: SkillsProps) {
  const { ref, isVisible } = useInView();
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const isEmerald = accent === 'emerald';

  return (
    <section id="skills" className="border-b border-zinc-300 bg-white py-20 sm:py-24">
      <div
        ref={ref}
        className={`mx-auto max-w-[1400px] px-6 transition-all duration-700 sm:px-10 lg:px-14 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        <div className="flex flex-col justify-between gap-4 border-b border-zinc-300 pb-6 md:flex-row md:items-end">
          <div>
            <span
              className={`font-mono text-xs font-semibold uppercase tracking-[0.2em] ${
                isEmerald ? 'text-emerald-700' : 'text-blue-700'
              }`}
            >
              [ 04 / TECHNICAL MATRIX ]
            </span>
            <h2 className="mt-2 font-condensed text-5xl tracking-wide text-zinc-950 uppercase sm:text-6xl">
              Skills &amp; Stack
            </h2>
          </div>

          <p className="font-mono text-xs uppercase tracking-wider text-zinc-500">
            {selectedSkill
              ? `${selectedSkill} → ${
                  SKILL_USAGE[selectedSkill] ?? 'Applied across academic & production engineering'
                }`
              : 'SELECT ANY SKILL TO INSPECT PRODUCTION USAGE'}
          </p>
        </div>

        <div className="mt-8 divide-y divide-zinc-300 border border-zinc-300 bg-[#F7F8FA]">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.category}
              className="grid gap-4 p-5 sm:grid-cols-12 sm:items-center sm:p-6"
            >
              <div className="font-mono text-xs font-semibold uppercase tracking-widest text-zinc-500 sm:col-span-3">
                {group.category}
              </div>
              <div className="flex flex-wrap gap-2 sm:col-span-9">
                {group.items.map((item) => {
                  const isSelected = selectedSkill === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() =>
                        setSelectedSkill((prev) => (prev === item ? null : item))
                      }
                      className={`border px-3 py-1.5 font-mono text-xs font-medium transition-colors ${
                        isSelected
                          ? isEmerald
                            ? 'border-emerald-600 bg-emerald-600 text-white'
                            : 'border-blue-600 bg-blue-600 text-white'
                          : 'border-zinc-300 bg-white text-zinc-800 hover:border-zinc-950'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
