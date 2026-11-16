import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Copy,
  Check,
  Github,
  Linkedin,
  Globe,
  Mail,
  Terminal,
  FileText,
  MapPin,
} from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { CountUp } from './CountUp';
import { AmbientCanvas } from './AmbientCanvas';
import { TiltCard } from './TiltCard';

interface HeroProps {
  accent: 'blue' | 'emerald';
  onOpenTerminal: () => void;
  onOpenResume: () => void;
}

const ROLES = [
  'Full-Stack Software Engineer',
  'React & Node.js Developer',
  'Laravel & MySQL Architect',
  '.NET & Python Builder',
];

export function Hero({ accent, onOpenTerminal, onOpenResume }: HeroProps) {
  const [copied, setCopied] = useState(false);
  const [localTime, setLocalTime] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedRole, setTypedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [panelTab, setPanelTab] = useState<'overview' | 'code'>('overview');

  const isEmerald = accent === 'emerald';

  useEffect(() => {
    const updateClock = () => {
      try {
        const formatted = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Colombo',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(new Date());
        setLocalTime(`${formatted} IST`);
      } catch {
        setLocalTime('IST');
      }
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const current = ROLES[roleIndex];
    const speed = isDeleting ? 35 : 65;

    const timeout = setTimeout(() => {
      if (!isDeleting && typedRole.length < current.length) {
        setTypedRole(current.slice(0, typedRole.length + 1));
      } else if (!isDeleting && typedRole.length === current.length) {
        setTimeout(() => setIsDeleting(true), 1400);
      } else if (isDeleting && typedRole.length > 0) {
        setTypedRole(current.slice(0, typedRole.length - 1));
      } else if (isDeleting && typedRole.length === 0) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [typedRole, isDeleting, roleIndex]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <section
      id="about"
      className="relative overflow-hidden border-b border-zinc-200 bg-white pt-14 pb-20 sm:pt-20 sm:pb-24"
    >
      <AmbientCanvas accent={accent} />

      {/* Soft ambient corner glow */}
      <div
        className={`pointer-events-none absolute -top-28 right-0 h-[460px] w-[460px] rounded-full blur-3xl opacity-25 ${
          isEmerald ? 'bg-emerald-200' : 'bg-blue-200'
        }`}
      />
      <div
        className={`pointer-events-none absolute -bottom-24 -left-20 h-[320px] w-[320px] rounded-full blur-3xl opacity-20 ${
          isEmerald ? 'bg-teal-200' : 'bg-sky-200'
        }`}
      />

      <div className="pointer-events-none relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left Executive Column */}
          <div className="pointer-events-auto animate-reveal lg:col-span-7">
            {/* Status & Location Pill */}
            <div className="mb-6 inline-flex flex-wrap items-center gap-2.5 rounded-full border border-zinc-200 bg-white/90 px-3.5 py-1.5 font-mono text-[11px] text-zinc-600 shadow-2xs backdrop-blur-xs">
              <span className="inline-flex items-center gap-2 font-semibold text-zinc-900">
                <span className="relative flex h-2 w-2">
                  <span
                    className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
                      isEmerald ? 'bg-emerald-500' : 'bg-blue-500'
                    }`}
                  />
                  <span
                    className={`relative inline-flex h-2 w-2 rounded-full ${
                      isEmerald ? 'bg-emerald-600' : 'bg-blue-600'
                    }`}
                  />
                </span>
                Open to Roles
              </span>
              <span className="text-zinc-300">|</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3 w-3 text-zinc-400" />
                {PROFILE.location}
              </span>
              {localTime && (
                <>
                  <span className="text-zinc-300">|</span>
                  <span className="font-medium text-zinc-800">{localTime}</span>
                </>
              )}
            </div>

            <h1 className="font-display text-4xl font-extrabold tracking-tight text-zinc-950 sm:text-5xl lg:text-[3.75rem] lg:leading-[1.06]">
              Abishanan{' '}
              <span
                className={`bg-clip-text text-transparent ${
                  isEmerald
                    ? 'bg-linear-to-r from-emerald-600 to-teal-600'
                    : 'bg-linear-to-r from-blue-600 to-sky-600'
                }`}
              >
                Pathmarajah
              </span>
            </h1>

            {/* Typewriter Role */}
            <div className="mt-4 flex h-8 items-center font-mono text-sm font-semibold sm:text-lg">
              <span className="mr-2 text-zinc-400">&gt;</span>
              <span className={isEmerald ? 'text-emerald-700' : 'text-blue-700'}>
                {typedRole}
              </span>
              <span
                className={`ml-0.5 inline-block h-5 w-[2px] animate-pulse ${
                  isEmerald ? 'bg-emerald-600' : 'bg-blue-600'
                }`}
              />
            </div>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-[17px]">
              Computer Science undergraduate with{' '}
              <span className="font-semibold text-zinc-900">12+ months</span> of
              startup and internship experience building production platforms with{' '}
              <span className="font-semibold text-zinc-900">
                React, Laravel, Node.js, and .NET
              </span>
              . Focused on clean RESTful APIs, optimized databases, and reliable CI/CD delivery.
            </p>

            {/* Primary Action Row */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${
                  isEmerald
                    ? 'bg-emerald-600 hover:bg-emerald-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                Explore Work
                <ArrowUpRight className="h-4 w-4" />
              </a>

              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2.5 font-mono text-xs font-semibold text-zinc-800 shadow-2xs transition-all hover:-translate-y-0.5 hover:border-zinc-400 hover:bg-zinc-50"
              >
                <FileText className="h-3.5 w-3.5 text-zinc-600" />
                View / Save CV
              </button>

              <button
                type="button"
                onClick={onOpenTerminal}
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-900 bg-zinc-950 px-4 py-2.5 font-mono text-xs font-medium text-white shadow-2xs transition-all hover:-translate-y-0.5 hover:bg-zinc-800"
              >
                <Terminal className="h-3.5 w-3.5" />
                CLI
              </button>
            </div>

            {/* Secondary Contact & Social Strip */}
            <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-zinc-200/80 pt-5">
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-zinc-50 px-3 py-1.5 font-mono text-xs font-medium text-zinc-700 transition-colors hover:border-zinc-300 hover:bg-white"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    Copied {PROFILE.email}
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-zinc-400" />
                    {PROFILE.email}
                  </>
                )}
              </button>

              <div className="flex items-center gap-1.5">
                <a
                  href={PROFILE.links.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-950"
                >
                  <Github className="h-3.5 w-3.5" />
                </a>
                <a
                  href={PROFILE.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-950"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                </a>
                <a
                  href={PROFILE.links.portfolio}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Portfolio"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-950"
                >
                  <Globe className="h-3.5 w-3.5" />
                </a>
                <a
                  href={`mailto:${PROFILE.email}`}
                  aria-label="Email"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-950"
                >
                  <Mail className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Framed Portrait & Bento Spec Card */}
          <div className="pointer-events-auto animate-reveal lg:col-span-5">
            <TiltCard
              accent={accent}
              className="rounded-2xl border border-zinc-200/90 bg-white/95 shadow-2xl shadow-zinc-200/70 backdrop-blur-md"
            >
              {/* Card Top Switcher */}
              <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50/80 px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setPanelTab('overview')}
                    className={`rounded-md px-2.5 py-1 font-mono text-[11px] font-semibold transition-colors ${
                      panelTab === 'overview'
                        ? isEmerald
                          ? 'bg-emerald-600 text-white'
                          : 'bg-blue-600 text-white'
                        : 'text-zinc-500 hover:text-zinc-900'
                    }`}
                  >
                    profile.overview
                  </button>
                  <button
                    type="button"
                    onClick={() => setPanelTab('code')}
                    className={`rounded-md px-2.5 py-1 font-mono text-[11px] font-semibold transition-colors ${
                      panelTab === 'code'
                        ? isEmerald
                          ? 'bg-emerald-600 text-white'
                          : 'bg-blue-600 text-white'
                        : 'text-zinc-500 hover:text-zinc-900'
                    }`}
                  >
                    stack.ts
                  </button>
                </div>
                <span className="font-mono text-[11px] text-zinc-400">
                  SLIIT · B.Sc. (Hons)
                </span>
              </div>

              {panelTab === 'overview' ? (
                <div>
                  {/* Framed Portrait Banner */}
                  <div className="relative h-64 w-full overflow-hidden bg-zinc-100">
                    <img
                      src="/profile.jpg"
                      alt={PROFILE.name}
                      className="h-full w-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />
                    <div className="absolute right-4 bottom-3.5 left-4 flex items-end justify-between text-white">
                      <div>
                        <div className="font-display text-lg font-bold leading-tight">
                          {PROFILE.name}
                        </div>
                        <div className="font-mono text-[11px] text-zinc-200">
                          Software Engineer · Jaffna, LK
                        </div>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold text-white ${
                          isEmerald ? 'bg-emerald-600' : 'bg-blue-600'
                        }`}
                      >
                        2027 Grad
                      </span>
                    </div>
                  </div>

                  {/* 3-Column Bento KPI Strip */}
                  <div className="grid grid-cols-3 divide-x divide-zinc-200 border-t border-zinc-200">
                    <div className="p-4 text-center">
                      <div className="font-display text-xl font-extrabold text-zinc-950">
                        <CountUp target={12} suffix="+ Mo" />
                      </div>
                      <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                        Experience
                      </div>
                    </div>
                    <div className="p-4 text-center">
                      <div className="font-display text-xl font-extrabold text-zinc-950">
                        <CountUp target={3} suffix="+" />
                      </div>
                      <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                        Live Apps
                      </div>
                    </div>
                    <div className="p-4 text-center">
                      <div className="font-display text-xl font-extrabold text-zinc-950">
                        <CountUp target={6} />
                      </div>
                      <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                        Certs
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <pre className="min-h-[330px] overflow-x-auto bg-zinc-50/70 p-5 font-mono text-xs leading-relaxed text-zinc-800">
                  <code>
                    {`export const engineer = {\n`}
                    {`  name: "Abishanan Pathmarajah",\n`}
                    {`  role: "Full-Stack Software Engineer",\n`}
                    {`  location: "Jaffna, Sri Lanka",\n`}
                    {`  degree: "B.Sc. (Hons) CS (May 2027)",\n`}
                    {`  experience: [\n`}
                    {`    "UltraKerb (Startup)",\n`}
                    {`    "CodeVita — Offero.lk"\n`}
                    {`  ],\n`}
                    {`  core: ["React", "Laravel", "Node.js", ".NET"],\n`}
                    {`  databases: ["MySQL", "MongoDB", "SQL Server"],\n`}
                    {`  openToWork: true\n`}
                    {`};`}
                  </code>
                </pre>
              )}
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
