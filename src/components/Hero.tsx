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
  const [panelTab, setPanelTab] = useState<'spec' | 'code'>('spec');

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
      className="relative overflow-hidden border-b border-zinc-200 bg-white pt-14 pb-20 sm:pt-22 sm:pb-26"
    >
      <AmbientCanvas accent={accent} />

      <div
        className={`pointer-events-none absolute -top-24 right-0 h-[420px] w-[420px] rounded-full blur-3xl opacity-25 ${
          isEmerald ? 'bg-emerald-200' : 'bg-blue-200'
        }`}
      />

      <div className="pointer-events-none relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Editorial Block */}
          <div className="pointer-events-auto animate-reveal lg:col-span-7">
            <div className="mb-5 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-widest text-zinc-500">
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
                Available for Work
              </span>
              <span className="text-zinc-300">/</span>
              <span>{PROFILE.location}</span>
              {localTime && (
                <>
                  <span className="text-zinc-300">/</span>
                  <span className="text-zinc-700">{localTime}</span>
                </>
              )}
            </div>

            <h1 className="font-display text-4xl font-extrabold tracking-tight text-zinc-950 sm:text-5xl lg:text-[3.75rem] lg:leading-[1.05]">
              {PROFILE.name}
            </h1>

            <div className="mt-4 flex h-8 items-center font-mono text-sm font-semibold sm:text-lg">
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
              {PROFILE.summary}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className={`inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition-all hover:shadow-md ${
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
                className="inline-flex items-center gap-2 rounded-md border border-zinc-300 bg-white/90 px-4 py-2.5 font-mono text-xs font-medium text-zinc-800 backdrop-blur-xs transition-colors hover:border-zinc-400 hover:bg-zinc-50"
              >
                <FileText className="h-3.5 w-3.5 text-zinc-600" />
                View CV
              </button>

              <button
                type="button"
                onClick={onOpenTerminal}
                className="inline-flex items-center gap-2 rounded-md border border-zinc-900 bg-zinc-950 px-4 py-2.5 font-mono text-xs font-medium text-white transition-colors hover:bg-zinc-800"
              >
                <Terminal className="h-3.5 w-3.5" />
                Open CLI
              </button>

              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-2 rounded-md border border-zinc-300 bg-white/90 px-4 py-2.5 font-mono text-xs font-medium text-zinc-800 backdrop-blur-xs transition-colors hover:border-zinc-400 hover:bg-zinc-50"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-zinc-500" />
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
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-200 bg-white/90 text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-950"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href={PROFILE.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-200 bg-white/90 text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-950"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={PROFILE.links.portfolio}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Portfolio"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-200 bg-white/90 text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-950"
                >
                  <Globe className="h-4 w-4" />
                </a>
                <a
                  href={`mailto:${PROFILE.email}`}
                  aria-label="Email"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-200 bg-white/90 text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-950"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right 3D Tilt Interactive Spec / Code Panel */}
          <div className="pointer-events-auto animate-reveal lg:col-span-5">
            <TiltCard
              accent={accent}
              className="border border-zinc-200 bg-white/95 shadow-xl shadow-zinc-200/60 backdrop-blur-md"
            >
              <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50/80 px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setPanelTab('spec')}
                    className={`rounded px-2.5 py-1 font-mono text-[11px] font-semibold transition-colors ${
                      panelTab === 'spec'
                        ? isEmerald
                          ? 'bg-emerald-600 text-white'
                          : 'bg-blue-600 text-white'
                        : 'text-zinc-500 hover:text-zinc-900'
                    }`}
                  >
                    profile.spec
                  </button>
                  <button
                    type="button"
                    onClick={() => setPanelTab('code')}
                    className={`rounded px-2.5 py-1 font-mono text-[11px] font-semibold transition-colors ${
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

              {panelTab === 'spec' ? (
                <div className="divide-y divide-zinc-200">
                  <div className="flex items-center gap-4 p-4">
                    <div className="relative shrink-0">
                      <img
                        src="/profile.jpg"
                        alt={PROFILE.name}
                        className="h-20 w-20 rounded-md border border-zinc-200 object-cover object-top shadow-xs"
                      />
                      <span
                        className={`absolute -right-1 -bottom-1 h-3.5 w-3.5 rounded-full border-2 border-white ${
                          isEmerald ? 'bg-emerald-600' : 'bg-blue-600'
                        }`}
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="font-display text-base font-bold text-zinc-950 truncate">
                        {PROFILE.name}
                      </div>
                      <div
                        className={`font-mono text-xs font-medium ${
                          isEmerald ? 'text-emerald-700' : 'text-blue-700'
                        }`}
                      >
                        Full-Stack Software Engineer
                      </div>
                      <div className="mt-1 font-mono text-[11px] text-zinc-500">
                        Jaffna, Sri Lanka · Remote / Hybrid
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 divide-x divide-zinc-200">
                    <div className="p-5">
                      <div className="font-display text-3xl font-extrabold text-zinc-950">
                        <CountUp target={12} suffix="+ Mo" />
                      </div>
                      <div className="mt-1 font-mono text-[11px] text-zinc-500">
                        Industry Experience
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="font-display text-3xl font-extrabold text-zinc-950">
                        <CountUp target={3} suffix="+" />
                      </div>
                      <div className="mt-1 font-mono text-[11px] text-zinc-500">
                        Production Platforms
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 divide-x divide-zinc-200">
                    <div className="p-5">
                      <div className="font-display text-3xl font-extrabold text-zinc-950">
                        <CountUp target={6} />
                      </div>
                      <div className="mt-1 font-mono text-[11px] text-zinc-500">
                        Verified Certifications
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="font-display text-3xl font-extrabold text-zinc-950">
                        2027
                      </div>
                      <div className="mt-1 font-mono text-[11px] text-zinc-500">
                        Expected Graduation
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2.5 bg-zinc-50/50 p-4 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Frontend</span>
                      <span className="font-medium text-zinc-900">React · Tailwind · JS</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Backend</span>
                      <span className="font-medium text-zinc-900">Laravel · Node · .NET</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Databases</span>
                      <span className="font-medium text-zinc-900">MySQL · MongoDB · SQL</span>
                    </div>
                  </div>
                </div>
              ) : (
                <pre className="overflow-x-auto bg-zinc-50/60 p-5 font-mono text-xs leading-relaxed text-zinc-800">
                  <code>
                    {`export const engineer = {\n`}
                    {`  name: "Abishanan Pathmarajah",\n`}
                    {`  location: "Jaffna, Sri Lanka",\n`}
                    {`  degree: "B.Sc. (Hons) CS (2027)",\n`}
                    {`  experience: [\n`}
                    {`    "UltraKerb (Startup)",\n`}
                    {`    "CodeVita — Offero.lk"\n`}
                    {`  ],\n`}
                    {`  core: ["React", "Laravel", "Node.js", ".NET"],\n`}
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
