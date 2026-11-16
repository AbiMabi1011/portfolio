import { useState } from 'react';
import { FlaskConical, Activity, AlertTriangle, Clock } from 'lucide-react';
import { RESEARCH } from '../data/portfolioData';
import { useInView } from '../hooks/useInView';

interface ResearchProps {
  accent: 'blue' | 'emerald';
}

type ScenarioId = 'baseline' | 'underestimate' | 'shift';

const SCENARIOS: Record<
  ScenarioId,
  {
    label: string;
    badge: string;
    metricLabel: string;
    metricValue: string;
    description: string;
    satellitePath: string;
    forecastPath: string;
  }
> = {
  baseline: {
    label: 'Baseline (Gauge)',
    badge: 'Reference',
    metricLabel: 'High-Flow Alignment',
    metricValue: 'Optimal',
    description:
      'Ground rain-gauge observations aligned with historical river-level peaks in the Kalu Ganga Basin.',
    satellitePath: 'M 10 95 Q 70 90, 120 55 T 200 22 T 280 75 T 350 95',
    forecastPath: 'M 10 95 Q 70 90, 120 55 T 200 22 T 280 75 T 350 95',
  },
  underestimate: {
    label: 'Peak Underestimation',
    badge: 'Magnitude Error',
    metricLabel: 'Flood Detection Risk',
    metricValue: 'Missed Events',
    description:
      'Satellite rainfall underestimates intense storm peaks, causing ML river-level forecasts to undershoot high-water thresholds.',
    satellitePath: 'M 10 95 Q 70 90, 120 68 T 200 52 T 280 82 T 350 95',
    forecastPath: 'M 10 95 Q 70 90, 120 72 T 200 56 T 280 84 T 350 95',
  },
  shift: {
    label: 'Timing Shift',
    badge: 'Temporal Error',
    metricLabel: 'Alert Impact',
    metricValue: 'Delayed / False Alarm',
    description:
      'Random timing offsets in satellite precipitation shift predicted hydrograph peaks, degrading early-warning lead time.',
    satellitePath: 'M 10 95 Q 95 92, 150 58 T 235 28 T 305 78 T 350 95',
    forecastPath: 'M 10 95 Q 100 92, 155 60 T 240 30 T 310 80 T 350 95',
  },
};

export function Research({ accent }: ResearchProps) {
  const { ref, isVisible } = useInView();
  const [scenario, setScenario] = useState<ScenarioId>('underestimate');
  const [activeStep, setActiveStep] = useState(0);
  const isEmerald = accent === 'emerald';
  const current = SCENARIOS[scenario];

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
          {/* Left: Abstract + Interactive Sensitivity Simulator */}
          <div className="relative flex flex-col justify-between overflow-hidden border-b border-zinc-300 p-7 sm:p-9 lg:col-span-7 lg:border-r lg:border-b-0">
            <span className="pointer-events-none absolute right-4 -bottom-4 font-condensed text-9xl leading-none text-zinc-200/50 select-none">
              ML
            </span>

            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 border border-zinc-300 bg-white px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-700">
                  <FlaskConical
                    className={`h-3.5 w-3.5 ${
                      isEmerald ? 'text-emerald-600' : 'text-blue-600'
                    }`}
                  />
                  Kalu Ganga Basin · Sri Lanka
                </span>
                <span className="font-mono text-[11px] text-zinc-500">
                  SUPERVISOR: <strong className="text-zinc-900">{RESEARCH.supervisor}</strong>
                </span>
              </div>

              <h3 className="mt-5 font-display text-xl font-bold leading-snug text-zinc-950 sm:text-2xl">
                {RESEARCH.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-[15px]">
                {RESEARCH.summary}
              </p>

              {/* Interactive Error Sensitivity Hydrograph */}
              <div className="mt-7 border border-zinc-300 bg-white p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 pb-3">
                  <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-700">
                    <Activity
                      className={`h-3.5 w-3.5 animate-pulse ${
                        isEmerald ? 'text-emerald-600' : 'text-blue-600'
                      }`}
                    />
                    Sensitivity Experiment Simulator
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {(Object.keys(SCENARIOS) as ScenarioId[]).map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setScenario(key)}
                        className={`px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                          scenario === key
                            ? isEmerald
                              ? 'bg-emerald-600 text-white'
                              : 'bg-blue-600 text-white'
                            : 'border border-zinc-200 bg-zinc-50 text-zinc-600 hover:text-zinc-950'
                        }`}
                      >
                        {SCENARIOS[key].label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Animated SVG Hydrograph */}
                <div className="mt-4">
                  <svg
                    viewBox="0 0 360 110"
                    className="h-28 w-full overflow-visible"
                    role="img"
                    aria-label="Satellite rainfall error sensitivity curve"
                  >
                    {/* Threshold line */}
                    <line
                      x1="10"
                      y1="36"
                      x2="350"
                      y2="36"
                      stroke="#E4E4E7"
                      strokeDasharray="4 4"
                      strokeWidth="1"
                    />
                    <text
                      x="12"
                      y="31"
                      className="fill-zinc-400 font-mono text-[8px] uppercase"
                    >
                      High-Flow Threshold
                    </text>

                    {/* Ground truth reference curve */}
                    <path
                      d="M 10 95 Q 70 90, 120 55 T 200 22 T 280 75 T 350 95"
                      fill="none"
                      stroke="#D4D4D8"
                      strokeWidth="2"
                      strokeDasharray="3 3"
                    />

                    {/* Simulated ML forecast response curve */}
                    <path
                      d={current.forecastPath}
                      fill="none"
                      stroke={isEmerald ? '#059669' : '#2563EB'}
                      strokeWidth="2.5"
                      className="transition-all duration-500"
                    />
                  </svg>

                  <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-zinc-100 pt-3 text-xs">
                    <div className="flex items-center gap-2 text-zinc-600">
                      {scenario === 'underestimate' ? (
                        <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                      ) : scenario === 'shift' ? (
                        <Clock className="h-3.5 w-3.5 text-amber-600" />
                      ) : (
                        <Activity className="h-3.5 w-3.5 text-emerald-600" />
                      )}
                      <span>{current.description}</span>
                    </div>
                    <span
                      className={`shrink-0 font-mono text-[11px] font-semibold ${
                        isEmerald ? 'text-emerald-700' : 'text-blue-700'
                      }`}
                    >
                      {current.metricValue}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-6 flex flex-wrap gap-1.5">
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

          {/* Right: Interactive 3-Step Methodology */}
          <div className="divide-y divide-zinc-300 bg-white lg:col-span-5">
            {RESEARCH.methodology.map((item, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={item.step}
                  type="button"
                  onMouseEnter={() => setActiveStep(idx)}
                  onClick={() => setActiveStep(idx)}
                  className={`flex w-full flex-col p-7 text-left transition-colors sm:p-8 ${
                    isActive ? 'bg-zinc-50' : 'bg-white hover:bg-zinc-50/60'
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-condensed text-4xl leading-none transition-colors ${
                          isActive
                            ? isEmerald
                              ? 'text-emerald-600'
                              : 'text-blue-600'
                            : 'text-zinc-300'
                        }`}
                      >
                        {item.step}
                      </span>
                      <h4 className="font-display text-base font-bold text-zinc-950 sm:text-lg">
                        {item.title}
                      </h4>
                    </div>
                    <span
                      className={`h-2 w-2 rounded-full transition-opacity ${
                        isActive
                          ? isEmerald
                            ? 'bg-emerald-600 opacity-100'
                            : 'bg-blue-600 opacity-100'
                          : 'opacity-0'
                      }`}
                    />
                  </div>
                  <p className="mt-2.5 text-sm leading-relaxed text-zinc-600">
                    {item.detail}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
