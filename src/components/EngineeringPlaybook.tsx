import { Code2, Database, GitBranch } from 'lucide-react';
import { useInView } from '../hooks/useInView';

interface EngineeringPlaybookProps {
  accent: 'blue' | 'emerald';
}

const CAPABILITIES = [
  {
    index: '01',
    title: 'Full-Stack Web Systems',
    subtitle: 'React · Laravel · Node.js · .NET',
    icon: Code2,
    description:
      'End-to-end delivery from responsive frontend interfaces to role-based dashboards, POS workflows, and clean MVC/REST architectures.',
    points: ['Component-Driven UIs', 'Role-Based Access Control', 'Payment & Calendar Automation'],
  },
  {
    index: '02',
    title: 'API & Database Engineering',
    subtitle: 'MySQL · MongoDB · SQL Server',
    icon: Database,
    description:
      'Designing normalized relational schemas and NoSQL collections with optimized query paths for real-time tracking and reporting.',
    points: ['RESTful API Design', 'Query & Data-Flow Optimization', 'Dynamic Pricing Logic'],
  },
  {
    index: '03',
    title: 'CI/CD & Startup Velocity',
    subtitle: 'GitHub · GitLab · Agile Delivery',
    icon: GitBranch,
    description:
      'Shipping production updates directly with founders and cross-functional teams using automated version control and deployment pipelines.',
    points: ['GitHub & GitLab CI/CD', 'Rapid Feature Scoping', 'Production Issue Resolution'],
  },
];

export function EngineeringPlaybook({ accent }: EngineeringPlaybookProps) {
  const { ref, isVisible } = useInView();
  const isEmerald = accent === 'emerald';

  return (
    <section id="playbook" className="border-b border-zinc-300 bg-[#F7F8FA] py-20 sm:py-24">
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
              [ 04 / ENGINEERING PLAYBOOK ]
            </span>
            <h2 className="mt-2 font-condensed text-5xl tracking-wide text-zinc-950 uppercase sm:text-6xl">
              How I Build
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            Architecture &middot; Data &middot; Delivery
          </p>
        </div>

        <div className="mt-10 grid border border-zinc-300 bg-white md:grid-cols-3 md:divide-x md:divide-zinc-300">
          {CAPABILITIES.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.index}
                className="group relative flex flex-col justify-between overflow-hidden border-b border-zinc-300 p-7 transition-colors hover:bg-zinc-50/80 md:border-b-0"
              >
                <span className="pointer-events-none absolute right-3 bottom-1 font-condensed text-8xl leading-none text-zinc-100 select-none">
                  {cap.index}
                </span>

                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-10 w-10 items-center justify-center border ${
                        isEmerald
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                          : 'border-blue-200 bg-blue-50 text-blue-700'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                      {cap.index}
                    </span>
                  </div>

                  <h3 className="mt-6 font-condensed text-3xl tracking-wide text-zinc-950 uppercase">
                    {cap.title}
                  </h3>
                  <p
                    className={`mt-1 font-mono text-[11px] font-semibold ${
                      isEmerald ? 'text-emerald-700' : 'text-blue-700'
                    }`}
                  >
                    {cap.subtitle}
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-zinc-600">
                    {cap.description}
                  </p>
                </div>

                <ul className="relative z-10 mt-6 space-y-2 border-t border-zinc-200 pt-4">
                  {cap.points.map((pt) => (
                    <li
                      key={pt}
                      className="flex items-center gap-2 font-mono text-[11px] text-zinc-700"
                    >
                      <span
                        className={`h-1.5 w-1.5 ${
                          isEmerald ? 'bg-emerald-600' : 'bg-blue-600'
                        }`}
                      />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
