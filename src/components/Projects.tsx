import { useState } from 'react';
import { ArrowUpRight, X, CheckCircle2, ArrowRight } from 'lucide-react';
import { PROJECTS, type ProjectItem } from '../data/portfolioData';
import { useInView } from '../hooks/useInView';
import { TiltCard } from './TiltCard';

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
    <section id="projects" className="border-b border-zinc-200 bg-white py-20 sm:py-24">
      <div
        ref={ref}
        className={`mx-auto max-w-6xl px-4 transition-all duration-700 sm:px-6 lg:px-8 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        <div className="flex flex-col justify-between gap-6 border-b border-zinc-200 pb-6 md:flex-row md:items-end">
          <div>
            <span
              className={`font-mono text-xs font-semibold uppercase tracking-widest ${
                isEmerald ? 'text-emerald-700' : 'text-blue-700'
              }`}
            >
              02 / Selected Work
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
              Featured Projects
            </h2>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-md px-3 py-1.5 font-mono text-xs font-medium transition-colors ${
                  activeCategory === category
                    ? isEmerald
                      ? 'bg-emerald-600 text-white'
                      : 'bg-blue-600 text-white'
                    : 'border border-zinc-200 bg-zinc-50 text-zinc-600 hover:border-zinc-300 hover:text-zinc-950'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {filtered.map((project, index) => (
            <TiltCard
              key={project.id}
              accent={accent}
              className="group flex flex-col justify-between border border-zinc-200 bg-zinc-50/40 p-6 transition-colors hover:border-zinc-400 hover:bg-white"
            >
              <div className="flex h-full flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-zinc-400">
                    <span>0{index + 1}</span>
                    <span className="uppercase tracking-wider text-zinc-500">
                      {project.category}
                    </span>
                  </div>

                  <h3
                    className={`mt-5 font-display text-xl font-bold text-zinc-950 transition-colors ${
                      isEmerald ? 'group-hover:text-emerald-700' : 'group-hover:text-blue-700'
                    }`}
                  >
                    {project.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-zinc-500">
                    {project.tagline}
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-zinc-600">
                    {project.summary}
                  </p>

                  {project.impactMetric && (
                    <div
                      className={`mt-4 inline-block border px-2.5 py-1 font-mono text-[11px] font-semibold ${
                        isEmerald
                          ? 'border-emerald-200 bg-emerald-50/70 text-emerald-800'
                          : 'border-blue-200 bg-blue-50/70 text-blue-800'
                      }`}
                    >
                      {project.impactMetric}
                    </div>
                  )}

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="border border-zinc-200 bg-white px-2 py-0.5 font-mono text-[11px] text-zinc-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-zinc-200 pt-4">
                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    className={`inline-flex items-center gap-1 font-mono text-xs font-semibold ${
                      isEmerald
                        ? 'text-emerald-700 hover:text-emerald-900'
                        : 'text-blue-700 hover:text-blue-900'
                    }`}
                  >
                    Architecture &amp; Details
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
              </div>
            </TiltCard>
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
                <h3 className="mt-1 font-display text-2xl font-bold text-zinc-950">
                  {selectedProject.title}
                </h3>
                <p className="mt-1 font-mono text-xs text-zinc-500">
                  {selectedProject.tagline}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onSelectProject(null)}
                className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-zinc-600">
              {selectedProject.summary}
            </p>

            {/* 3-Tier System Architecture Flow */}
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
                  className={`inline-flex items-center gap-2 rounded-md px-4 py-2 font-mono text-xs font-semibold text-white ${
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
