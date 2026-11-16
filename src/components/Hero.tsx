import { ArrowUpRight, FileText } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { CountUp } from './CountUp';

interface HeroProps {
  accent: 'blue' | 'emerald';
  onOpenTerminal: () => void;
  onOpenResume: () => void;
}

export function Hero({ accent, onOpenResume }: HeroProps) {
  const isEmerald = accent === 'emerald';

  return (
    <section id="about" className="border-b border-zinc-300 bg-[#F7F8FA]">
      {/* Architectural Grid Split Area */}
      <div className="bg-arch-grid mx-auto grid max-w-[1400px] lg:grid-cols-12">
        {/* Left Hero Column */}
        <div className="flex flex-col justify-center border-b border-zinc-300/80 px-6 py-14 sm:px-10 lg:col-span-7 lg:border-r lg:border-b-0 lg:px-14 lg:py-20">
          <div className="animate-reveal">
            <div className="mb-6 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
              [ FULL-STACK SOFTWARE ENGINEER &middot; REACT · LARAVEL · NODE.JS ]
            </div>

            {/* Circular Portrait + Condensed Two-Tone Name */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
              <div
                className={`h-28 w-28 shrink-0 overflow-hidden rounded-full border-2 p-1 shadow-sm sm:h-32 sm:w-32 ${
                  isEmerald ? 'border-emerald-600' : 'border-blue-600'
                }`}
              >
                <img
                  src="/profile.jpg"
                  alt={PROFILE.name}
                  className="h-full w-full rounded-full object-cover object-top"
                />
              </div>

              <h1 className="font-condensed text-6xl leading-[0.88] tracking-wide uppercase sm:text-7xl lg:text-[5.5rem]">
                <span className="block text-zinc-950">ABISHANAN</span>
                <span
                  className={`block ${
                    isEmerald ? 'text-outline-emerald' : 'text-outline-blue'
                  }`}
                >
                  PATHMARAJAH
                </span>
              </h1>
            </div>

            <p className="mt-7 max-w-xl text-base italic leading-relaxed text-zinc-600 sm:text-[17px]">
              Computer Science undergraduate with 12+ months of startup and
              internship experience building production web platforms, POS
              systems, and RESTful APIs across React, Laravel, Node.js, and .NET.
            </p>

            {/* 3 Crisp Rectangular Action Buttons */}
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 bg-zinc-950 px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-zinc-800"
              >
                View Work
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 border border-zinc-400 bg-transparent px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-900 transition-colors hover:border-zinc-950 hover:bg-white"
              >
                Get in Touch
              </a>

              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 border border-zinc-400 bg-transparent px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-900 transition-colors hover:border-zinc-950 hover:bg-white"
              >
                <FileText className="h-3.5 w-3.5" />
                View CV
              </button>
            </div>
          </div>
        </div>

        {/* Right 2-Tier Editorial Stats Column */}
        <div className="grid divide-y divide-zinc-300/80 lg:col-span-5">
          {/* Top Stat Panel */}
          <div className="relative overflow-hidden px-8 py-10 sm:px-10 lg:py-12">
            <span className="pointer-events-none absolute right-4 -bottom-4 font-condensed text-8xl leading-none text-zinc-200/70 select-none">
              03
            </span>
            <div
              className={`font-condensed text-5xl font-bold tracking-tight ${
                isEmerald ? 'text-emerald-700' : 'text-blue-700'
              }`}
            >
              <CountUp target={3} suffix="+" />
            </div>
            <div className="mt-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Production Platforms
            </div>
            <div className="mt-0.5 text-sm italic text-zinc-700">
              From architecture to deployed apps
            </div>
            <div className="my-4 h-px w-full bg-zinc-300/80" />
            <p className="relative z-10 text-xs leading-relaxed text-zinc-600 sm:text-sm">
              Spanning a dual-access Learning Management System (LMS), Kalappai
              studio booking &amp; installment automation, and Wanlanka 50+ tour
              package platform.
            </p>
          </div>

          {/* Bottom Stat Panel */}
          <div className="relative overflow-hidden px-8 py-10 sm:px-10 lg:py-12">
            <span className="pointer-events-none absolute right-4 -bottom-4 font-condensed text-8xl leading-none text-zinc-200/70 select-none">
              12
            </span>
            <div
              className={`font-condensed text-5xl font-bold tracking-tight ${
                isEmerald ? 'text-emerald-700' : 'text-blue-700'
              }`}
            >
              <CountUp target={12} suffix="+ MO" />
            </div>
            <div className="mt-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Industry Experience
            </div>
            <div className="mt-0.5 text-sm italic text-zinc-700">
              UltraKerb &middot; CodeVita (Offero.lk)
            </div>
            <div className="my-4 h-px w-full bg-zinc-300/80" />
            <p className="relative z-10 text-xs leading-relaxed text-zinc-600 sm:text-sm">
              Hands-on startup and internship engineering across retail POS
              systems, multi-vertical deal platforms, RESTful APIs, and
              MySQL/MongoDB optimization.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Dark Metadata Strip */}
      <div className="border-t border-zinc-800 bg-zinc-950 text-white">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 divide-x divide-y divide-zinc-800 lg:grid-cols-4 lg:divide-y-0">
          <div className="px-6 py-4">
            <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
              Location
            </div>
            <div className="mt-1 font-mono text-xs font-semibold tracking-wider text-zinc-100">
              JAFFNA, SRI LANKA
            </div>
          </div>
          <div className="px-6 py-4">
            <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
              University
            </div>
            <div className="mt-1 font-mono text-xs font-semibold tracking-wider text-zinc-100">
              SLIIT &middot; B.SC. (HONS) CS
            </div>
          </div>
          <div className="px-6 py-4">
            <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
              Core Stack
            </div>
            <div className="mt-1 font-mono text-xs font-semibold tracking-wider text-zinc-100">
              REACT &middot; LARAVEL &middot; NODE &middot; .NET
            </div>
          </div>
          <div className="px-6 py-4">
            <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
              Graduation
            </div>
            <div className="mt-1 font-mono text-xs font-semibold tracking-wider text-zinc-100">
              EXPECTED MAY 2027
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
