import { useState, useEffect } from 'react';
import { Menu, X, Search, Terminal } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'ABOUT', href: '#about', id: 'about' },
  { label: 'WORK', href: '#experience', id: 'experience' },
  { label: 'PROJECTS', href: '#projects', id: 'projects' },
  { label: 'RESEARCH', href: '#research', id: 'research' },
  { label: 'SKILLS', href: '#skills', id: 'skills' },
  { label: 'CREDENTIALS', href: '#credentials', id: 'credentials' },
  { label: 'CONTACT', href: '#contact', id: 'contact' },
];

const TICKER_ITEMS = [
  'FULL-STACK SOFTWARE ENGINEER',
  'REACT · LARAVEL · NODE.JS · .NET · PYTHON',
  'ULTRAKERB (STARTUP)',
  'CODEVITA (OFFERO.LK)',
  'JAFFNA, SRI LANKA · REMOTE / HYBRID',
  'B.SC. (HONS) COMPUTER SCIENCE · SLIIT',
];

interface NavbarProps {
  accent: 'blue' | 'emerald';
  onToggleAccent: () => void;
  onOpenCommand: () => void;
  onOpenTerminal: () => void;
}

export function Navbar({
  accent,
  onToggleAccent,
  onOpenCommand,
  onOpenTerminal,
}: NavbarProps) {
  const [activeSection, setActiveSection] = useState('about');
  const [mobileOpen, setMobileOpen] = useState(false);

  const isEmerald = accent === 'emerald';

  useEffect(() => {
    const onScroll = () => {
      for (const item of [...NAV_ITEMS].reverse()) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Dark Editorial Header */}
      <div className="border-b border-zinc-800 bg-zinc-950 text-white">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <a
            href="#"
            className="flex items-center gap-2 font-condensed text-2xl tracking-wider text-white"
          >
            <span>ABP</span>
            <span
              className={`font-mono text-[10px] font-semibold tracking-widest ${
                isEmerald ? 'text-emerald-400' : 'text-blue-400'
              }`}
            >
              v2026
            </span>
          </a>

          {/* Boxed Monospace Nav */}
          <nav
            className="hidden items-center border border-zinc-800 bg-zinc-900/60 md:flex"
            aria-label="Primary"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`border-r border-zinc-800 px-3.5 py-2 font-mono text-[11px] font-medium tracking-wider transition-colors last:border-r-0 ${
                    isActive
                      ? isEmerald
                        ? 'bg-emerald-600/20 text-emerald-300'
                        : 'bg-blue-600/20 text-blue-300'
                      : 'text-zinc-400 hover:bg-zinc-800/70 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Status & Tools */}
          <div className="hidden items-center gap-2.5 md:flex">
            <button
              type="button"
              onClick={onToggleAccent}
              title="Switch Blue / Emerald accent"
              className="inline-flex items-center gap-1.5 border border-zinc-800 bg-zinc-900 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white"
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  isEmerald ? 'bg-emerald-500' : 'bg-blue-500'
                }`}
              />
              {isEmerald ? 'Emerald' : 'Blue'}
            </button>

            <button
              type="button"
              onClick={onOpenTerminal}
              className="inline-flex items-center gap-1.5 border border-zinc-800 bg-zinc-900 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white"
              aria-label="Open CLI"
            >
              <Terminal className="h-3 w-3" />
              CLI
            </button>

            <button
              type="button"
              onClick={onOpenCommand}
              className="inline-flex items-center gap-1.5 border border-zinc-800 bg-zinc-900 px-2.5 py-1.5 font-mono text-[10px] text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white"
              aria-label="Command palette"
            >
              <Search className="h-3 w-3" />
              ⌘K
            </button>

            <span className="ml-1 inline-flex items-center gap-2 font-mono text-[11px] font-semibold tracking-wider text-zinc-200">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              OPEN TO WORK
            </span>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={onOpenCommand}
              className="border border-zinc-800 p-2 text-zinc-300"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="p-2 text-zinc-200"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Accent Ticker Marquee Strip */}
      <div
        className={`overflow-hidden border-b border-zinc-900/20 py-1.5 text-white select-none ${
          isEmerald ? 'bg-emerald-700' : 'bg-blue-700'
        }`}
      >
        <div className="flex w-max animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
            <span
              key={`${item}-${idx}`}
              className="mx-5 flex items-center gap-5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em]"
            >
              <span>{item}</span>
              <span className="opacity-60">•</span>
            </span>
          ))}
        </div>
      </div>

      {mobileOpen && (
        <div className="border-b border-zinc-800 bg-zinc-950 px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 font-mono text-xs font-medium tracking-wider text-zinc-300 hover:bg-zinc-900 hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={onToggleAccent}
              className="mt-2 flex items-center gap-2 border border-zinc-800 px-3 py-2 font-mono text-xs text-zinc-300"
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  isEmerald ? 'bg-emerald-500' : 'bg-blue-500'
                }`}
              />
              Theme: {isEmerald ? 'Emerald Green' : 'Cobalt Blue'}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
