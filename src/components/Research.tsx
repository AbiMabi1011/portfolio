import { useEffect, useState } from 'react';
import { ArrowRight, Check, FlaskConical } from 'lucide-react';
import { RESEARCH } from '../data/portfolioData';
import { useInView } from '../hooks/useInView';

interface ResearchProps {
  accent: 'blue' | 'emerald';
}

const PIPELINE_NODES = [
  {
    step: '01',
    title: 'Satellite Data',
    sub: 'CHIRPS · IMERG · GSMaP',
  },
  {
    step: '02',
    title: 'Error Analysis',
    sub: 'Gauge vs. Satellite',
  },
  {
    step: '03',
    title: 'Python ML Model',
    sub: 'River-Level Forecast',
  },
  {
    step: '04',
    title: 'Flood Metrics',
    sub: 'Hits · Misses · Alarms',
  },
];

const ERROR_FACTORS = [
  'Rainfall Peak Underestimation',
  'Random Rainfall Timing Shifts',
  'Missed High-Water Events',
  'False-Alarm Flood Alerts',
];

export function Research({ accent }: ResearchProps) {
  const { ref, isVisible } = useInView();
  const [activeNode, setActiveNode] = useState(0);
  const [paused, setPaused] = useState(false);
  const isEmerald = accent === 'emerald';

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % PIPELINE_NODES.length);
    }, 2200);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <section id="research" className="border-b border-zinc-300 bg-white py-20 sm:py-24">
      <div
        ref={ref}
        className={`mx-auto max-w-[1400px] px-6 transition-all duration-700 sm:px-10 lg:px-14 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        }`}
      >
        {/* Section Header */}
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
          <div className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">
            B.Sc. (Hons) CS &middot; Supervisor: {RESEARCH.supervisor}
          </div>
        </div>

        {/* Asymmetric Bento Research Showcase */}
        <div className="mt-10 grid gap-5 lg:grid-cols-12">
          {/* Left Dark Thesis Anchor Card with Satellite & Flowing River Animation */}
          <div
            className={`group relative flex flex-col justify-between overflow-hidden border border-zinc-900 bg-zinc-950 p-7 text-white transition-all duration-700 delay-100 sm:p-9 lg:col-span-5 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            {/* Satellite & Flowing Kalu Ganga River SVG Backdrop */}
            <svg
              viewBox="0 0 400 380"
              className="pointer-events-none absolute inset-0 h-full w-full opacity-45"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {/* Satellite orbital arc & scan beam */}
              <path
                d="M 240 -10 Q 320 65, 395 110"
                fill="none"
                stroke="#3F3F46"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              {/* Satellite node + radar rings */}
              <g className="animate-satellite-scan">
                <circle
                  cx="332"
                  cy="62"
                  r="18"
                  fill="none"
                  stroke={isEmerald ? '#10B981' : '#3B82F6'}
                  strokeWidth="1"
                  strokeOpacity="0.4"
                />
                <circle
                  cx="332"
                  cy="62"
                  r="30"
                  fill="none"
                  stroke={isEmerald ? '#10B981' : '#3B82F6'}
                  strokeWidth="0.8"
                  strokeOpacity="0.22"
                />
                {/* Satellite icon geometry */}
                <rect
                  x="328"
                  y="58"
                  width="8"
                  height="8"
                  rx="1"
                  fill="#FFFFFF"
                />
                <line x1="319" y1="62" x2="327" y2="62" stroke={isEmerald ? '#34D399' : '#60A5FA'} strokeWidth="2.5" />
                <line x1="337" y1="62" x2="345" y2="62" stroke={isEmerald ? '#34D399' : '#60A5FA'} strokeWidth="2.5" />
                {/* Precipitation beam lines */}
                <line
                  x1="332"
                  y1="72"
                  x2="285"
                  y2="245"
                  stroke={isEmerald ? '#10B981' : '#3B82F6'}
                  strokeWidth="0.8"
                  strokeDasharray="3 5"
                  strokeOpacity="0.4"
                />
                <line
                  x1="332"
                  y1="72"
                  x2="355"
                  y2="230"
                  stroke={isEmerald ? '#10B981' : '#3B82F6'}
                  strokeWidth="0.8"
                  strokeDasharray="3 5"
                  strokeOpacity="0.3"
                />
              </g>

              {/* Animated rainfall droplets from satellite to river */}
              <circle
                cx="326"
                cy="92"
                r="2"
                fill={isEmerald ? '#34D399' : '#60A5FA'}
                className="animate-rain-1"
              />
              <circle
                cx="336"
                cy="88"
                r="1.8"
                fill={isEmerald ? '#6EE7B7' : '#93C5FD'}
                className="animate-rain-2"
              />
              <circle
                cx="318"
                cy="100"
                r="1.6"
                fill="#FFFFFF"
                className="animate-rain-3"
              />

              {/* Flowing Kalu Ganga River currents */}
              <path
                d="M -20 285 Q 80 250, 175 290 T 420 265"
                fill="none"
                stroke={isEmerald ? '#10B981' : '#3B82F6'}
                strokeWidth="2"
                strokeOpacity="0.55"
                className="animate-river-flow"
              />
              <path
                d="M -20 305 Q 95 270, 195 310 T 420 285"
                fill="none"
                stroke={isEmerald ? '#14B8A6' : '#60A5FA'}
                strokeWidth="1.5"
                strokeOpacity="0.35"
                className="animate-river-flow-slow"
              />
              <path
                d="M -20 325 Q 110 295, 210 330 T 420 308"
                fill="none"
                stroke="#52525B"
                strokeWidth="1"
                strokeOpacity="0.4"
                className="animate-river-flow"
              />

              {/* River gauge station node + double ripple */}
              <circle
                cx="285"
                cy="274"
                r="12"
                fill="none"
                stroke={isEmerald ? '#34D399' : '#60A5FA'}
                strokeWidth="1"
                strokeOpacity="0.35"
                className="animate-ping"
              />
              <circle
                cx="285"
                cy="274"
                r="6"
                fill={isEmerald ? '#10B981' : '#3B82F6'}
                className="animate-ping"
              />
              <circle cx="285" cy="274" r="3" fill="#FFFFFF" />
            </svg>

            <div
              className={`pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full blur-3xl opacity-20 transition-transform duration-700 group-hover:scale-125 ${
                isEmerald ? 'bg-emerald-500' : 'bg-blue-500'
              }`}
            />

            <div className="relative z-10">
              <span
                className={`inline-flex items-center gap-2 border px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest ${
                  isEmerald
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                    : 'border-blue-500/40 bg-blue-500/10 text-blue-300'
                }`}
              >
                <FlaskConical className="h-3 w-3 animate-pulse" />
                Kalu Ganga Basin · Sri Lanka
              </span>

              <h3 className="mt-6 font-display text-2xl font-bold leading-snug text-white">
                {RESEARCH.title}
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                {RESEARCH.summary}
              </p>
            </div>

            <div className="relative z-10 mt-8 space-y-2 border-t border-zinc-800 pt-5 font-mono text-xs">
              <div className="flex items-center justify-between text-zinc-400">
                <span>Degree</span>
                <span className="text-zinc-100">BSc (Hons) Computer Science</span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>Supervisor</span>
                <span className="text-zinc-100">{RESEARCH.supervisor}</span>
              </div>
            </div>
          </div>

          {/* Right Bento Stack */}
          <div className="flex flex-col gap-5 lg:col-span-7">
            {/* Top Wide Card: Animated 4-Stage Pipeline */}
            <div
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              className={`border border-zinc-300 bg-[#F7F8FA] p-6 transition-all duration-700 delay-200 sm:p-8 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
                  Experimental Architecture
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold ${
                    isEmerald ? 'text-emerald-700' : 'text-blue-700'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full animate-ping ${
                      isEmerald ? 'bg-emerald-600' : 'bg-blue-600'
                    }`}
                  />
                  Stage 0{activeNode + 1} / 04
                </span>
              </div>

              {/* Animated progress bar */}
              <div className="mt-3 h-0.5 w-full bg-zinc-200">
                <div
                  className={`h-full transition-all duration-500 ${
                    isEmerald ? 'bg-emerald-600' : 'bg-blue-600'
                  }`}
                  style={{ width: `${((activeNode + 1) / PIPELINE_NODES.length) * 100}%` }}
                />
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-4">
                {PIPELINE_NODES.map((node, i) => {
                  const isActive = activeNode === i;
                  return (
                    <button
                      key={node.step}
                      type="button"
                      onClick={() => setActiveNode(i)}
                      onMouseEnter={() => setActiveNode(i)}
                      className={`group relative border p-4 text-left transition-all duration-300 ${
                        isActive
                          ? isEmerald
                            ? '-translate-y-1 border-emerald-600 bg-white shadow-md'
                            : '-translate-y-1 border-blue-600 bg-white shadow-md'
                          : 'border-zinc-300 bg-white/80 hover:-translate-y-0.5 hover:border-zinc-500 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`font-condensed text-2xl leading-none transition-colors ${
                            isActive
                              ? isEmerald
                                ? 'text-emerald-600'
                                : 'text-blue-600'
                              : 'text-zinc-400'
                          }`}
                        >
                          {node.step}
                        </span>
                        {i < PIPELINE_NODES.length - 1 && (
                          <ArrowRight
                            className={`hidden h-3.5 w-3.5 transition-transform duration-300 sm:block ${
                              isActive
                                ? isEmerald
                                  ? 'translate-x-0.5 text-emerald-600'
                                  : 'translate-x-0.5 text-blue-600'
                                : 'text-zinc-300'
                            }`}
                          />
                        )}
                      </div>
                      <div className="mt-3 font-display text-sm font-bold text-zinc-950">
                        {node.title}
                      </div>
                      <div className="mt-1 font-mono text-[10px] text-zinc-500">
                        {node.sub}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Split: Error Factors + Toolkit */}
            <div
              className={`grid flex-1 gap-5 transition-all duration-700 delay-300 sm:grid-cols-2 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
            >
              <div className="border border-zinc-300 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-500">
                <div className="font-mono text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
                  Error Factors Evaluated
                </div>
                <ul className="mt-4 space-y-2.5">
                  {ERROR_FACTORS.map((factor) => (
                    <li
                      key={factor}
                      className="flex items-center gap-2.5 text-xs font-medium text-zinc-800 sm:text-sm"
                    >
                      <Check
                        className={`h-3.5 w-3.5 shrink-0 ${
                          isEmerald ? 'text-emerald-600' : 'text-blue-600'
                        }`}
                      />
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col justify-between border border-zinc-300 bg-[#F7F8FA] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-500">
                <div>
                  <div className="font-mono text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
                    Research Stack &amp; Data
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {RESEARCH.stack.map((item) => (
                      <span
                        key={item}
                        className="border border-zinc-300 bg-white px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-zinc-700 transition-colors hover:border-zinc-950"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 border-t border-zinc-300 pt-3 font-mono text-[11px] text-zinc-500">
                  Reproducible Python &amp; QGIS Workflow
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
