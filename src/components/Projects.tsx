import { useState } from 'react';
import { ArrowUpRight, X, CheckCircle2, ArrowRight } from 'lucide-react';
import { PROJECTS, type ProjectItem } from '../data/portfolioData';
import { useInView } from '../hooks/useInView';

const CATEGORIES = ['All', 'EdTech', 'E-Commerce & Booking', 'Full-Stack'] as const;

const ARCHITECTURES: Record<
  string,
  { client: string; server: string; data: string }
> = {
  lms: {
    client: 'React + Tailwind Dual-Hub UI (Public Knowledge Hub & Gated Portal)',
    server: 'Laravel REST API + Role-Based Auth (Admin, Teacher, Student)',
    data: 'MySQL (Enrollments, Academic Papers, Interactive Quizzes)',
  },
  kalappai: {
    client: 'React Categorized Media Gallery & Interactive Booking Calendar',
    server: 'Laravel Automated Installment Splitter & Notification Engine',
    data: 'MySQL + Automated Reminders + YouTube Video Sync',
  },
  wanlanka: {
    client: 'Responsive Tour Package Explorer (50+ Customizable Packages)',
    server: 'Laravel MVC Dynamic Pricing Engine (Transport, Stay, Guides)',
    data: 'MySQL Relational Tour & Booking Schema',
  },
};

interface ProjectsProps {
  accent: 'blue' | 'emerald';
  selectedProject: ProjectItem | null;
  onSelectProject: (project: ProjectItem | null) => void;
}

export function Projects({
  accent,
  selectedProject,
  onSelectProject,
}: ProjectsProps) {
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>('All');
  const { ref, isVisible } = useInView();
  const isEmerald = accent === 'emerald';

  const filtered =
    activeCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  const selectedArch = selectedProject ? ARCHITECTURES[selectedProject.id] : null;

  return (
    <section id="projects" className="border-b border-zinc-300 bg-[#F7F8FA] py-20 sm:py-24">
      <div
        ref={ref}
        className={`mx-auto max-w-[1400px] px-6 transition-all duration-700 sm:px-10 lg:px-14 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        <div className="flex flex-col justify-between gap-6 border-b border-zinc-300 pb-6 md:flex-row md:items-end">
          <div>
            <span
              className={`font-mono text-xs font-semibold uppercase tracking-[0.2em] ${
                isEmerald ? 'text-emerald-700' : 'text-blue-700'
              }`}
            >
              [ 02 / SELECTED WORK ]
            </span>
            <h2 className="mt-2 font-condensed text-5xl tracking-wide text-zinc-950 uppercase sm:text-6xl">
              Featured Projects
            </h2>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-3.5 py-2 font-mono text-[11px] font-semibold uppercase tracking-wider transition-colors ${
                  activeCategory === category
                    ? isEmerald
                      ? 'bg-emerald-600 text-white'
                      : 'bg-blue-600 text-white'
                    : 'border border-zinc-300 bg-white text-zinc-600 hover:border-zinc-950 hover:text-zinc-950'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid border border-zinc-300 bg-white md:grid-cols-3 md:divide-x md:divide-zinc-300">
          {filtered.map((project, index) => (
            <article
              key={project.id}
              className="group relative flex flex-col justify-between overflow-hidden border-b border-zinc-300 p-7 transition-colors hover:bg-zinc-50/80 md:border-b-0"
            >
              <span className="pointer-events-none absolute right-3 bottom-1 font-condensed text-8xl leading-none text-zinc-100 select-none">
                0{index + 1}
              </span>

              <div className="relative z-10">
                <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-zinc-400">
                  <span>0{index + 1}</span>
                  <span className="text-zinc-500">{project.category}</span>
                </div>

                <h3
                  className={`mt-5 font-condensed text-3xl tracking-wide text-zinc-950 uppercase transition-colors ${
                    isEmerald ? 'group-hover:text-emerald-700' : 'group-hover:text-blue-700'
                  }`}
                >
                  {project.title}
                </h3>
                <p className="mt-1 font-mono text-[11px] text-zinc-500">
                  {project.tagline}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-zinc-600">
                  {project.summary}
                </p>

                {project.impactMetric && (
                  <div
                    className={`mt-4 inline-block border px-2.5 py-1 font-mono text-[11px] font-semibold ${
                      isEmerald
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                        : 'border-blue-200 bg-blue-50 text-blue-800'
                    }`}
                  >
                    {project.impactMetric}
                  </div>
                )}

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="border border-zinc-200 bg-zinc-50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative z-10 mt-8 flex items-center justify-between border-t border-zinc-200 pt-4">
                <button
                  type="button"
                  onClick={() => onSelectProject(project)}
                  className={`inline-flex items-center gap-1 font-mono text-xs font-semibold uppercase tracking-wider ${
                    isEmerald
                      ? 'text-emerald-700 hover:text-emerald-900'
                      : 'text-blue-700 hover:text-blue-900'
                  }`}
                >
                  Architecture
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs text-zinc-600 hover:text-zinc-950"
                  >
                    {project.liveLabel}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/45 p-4 backdrop-blur-xs"
          onClick={() => onSelectProject(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-zinc-200 bg-white p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-zinc-200 pb-4">
              <div>
                <span
                  className={`font-mono text-xs font-semibold uppercase tracking-wider ${
                    isEmerald ? 'text-emerald-700' : 'text-blue-700'
                  }`}
                >
                  {selectedProject.category}
                </span>
                <h3 className="mt-1 font-condensed text-3xl tracking-wide text-zinc-950 uppercase">
                  {selectedProject.title}
                </h3>
                <p className="mt-1 font-mono text-xs text-zinc-500">
                  {selectedProject.tagline}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onSelectProject(null)}
                className="p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-zinc-600">
              {selectedProject.summary}
            </p>

            {selectedArch && (
              <div className="mt-6">
                <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  System Architecture Flow
                </h4>
                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  <div className="border border-zinc-200 bg-zinc-50 p-3">
                    <div className="font-mono text-[10px] font-bold uppercase text-zinc-400">
                      01 / Client Layer
                    </div>
                    <div className="mt-1 text-xs font-medium text-zinc-800">
                      {selectedArch.client}
                    </div>
                  </div>
                  <div className="border border-zinc-200 bg-zinc-50 p-3">
                    <div className="flex items-center gap-1 font-mono text-[10px] font-bold uppercase text-zinc-400">
                      <ArrowRight className="h-3 w-3" /> 02 / API &amp; Logic
                    </div>
                    <div className="mt-1 text-xs font-medium text-zinc-800">
                      {selectedArch.server}
                    </div>
                  </div>
                  <div className="border border-zinc-200 bg-zinc-50 p-3">
                    <div className="flex items-center gap-1 font-mono text-[10px] font-bold uppercase text-zinc-400">
                      <ArrowRight className="h-3 w-3" /> 03 / Data &amp; Sync
                    </div>
                    <div className="mt-1 text-xs font-medium text-zinc-800">
                      {selectedArch.data}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <h4 className="mt-6 font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Implementation Highlights
            </h4>
            <ul className="mt-3 space-y-2.5">
              {selectedProject.highlights.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-700"
                >
                  <CheckCircle2
                    className={`mt-0.5 h-4 w-4 shrink-0 ${
                      isEmerald ? 'text-emerald-600' : 'text-blue-600'
                    }`}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {selectedProject.stack.map((tech) => (
                <span
                  key={tech}
                  className="border border-zinc-200 bg-zinc-50 px-2.5 py-1 font-mono text-xs text-zinc-700"
                >
                  {tech}
                </span>
              ))}
            </div>

            {selectedProject.liveUrl && (
              <div className="mt-7 flex justify-end border-t border-zinc-200 pt-4">
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-white ${
                    isEmerald
                      ? 'bg-emerald-600 hover:bg-emerald-700'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  Open {selectedProject.liveLabel}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
