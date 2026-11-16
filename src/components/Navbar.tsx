import { useState, useEffect } from 'react';
import { Menu, X, Search, Terminal } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Credentials', href: '#credentials', id: 'credentials' },
  { label: 'Contact', href: '#contact', id: 'contact' },
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('about');
  const [mobileOpen, setMobileOpen] = useState(false);

  const isEmerald = accent === 'emerald';

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min(100, (y / docHeight) * 100) : 0);

      for (const item of [...NAV_ITEMS].reverse()) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= 140) {
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
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/85 backdrop-blur-md">
      <div className="h-[2px] w-full bg-zinc-100">
        <div
          className={`h-full transition-[width] duration-150 ${isEmerald ? 'bg-emerald-600' : 'bg-blue-600'
            }`}
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="mx-auto flex h-15 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#"
          className="flex items-center gap-2.5 font-mono text-sm font-semibold tracking-tight text-zinc-950"
        >
          <img
            src="/profile.jpg"
            alt="Abishanan Pathmarajah"
            className="h-7 w-7 rounded-full border border-zinc-200 object-cover object-top"
          />
          <span>abishanan.tech</span>
        </a>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`relative py-1 text-[13px] font-medium transition-colors ${isActive
                  ? isEmerald
                    ? 'text-emerald-700 font-semibold'
                    : 'text-blue-700 font-semibold'
                  : 'text-zinc-500 hover:text-zinc-950'
                  }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className={`absolute right-0 -bottom-[19px] left-0 h-[2px] ${isEmerald ? 'bg-emerald-600' : 'bg-blue-600'
                      }`}
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2.5 md:flex">
          <button
            type="button"
            onClick={onToggleAccent}
            title="Switch accent color"
            className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 font-mono text-[11px] font-medium text-zinc-700 transition-colors hover:border-zinc-300 hover:bg-zinc-100"
          >
            <span
              className={`h-2 w-2 rounded-full ${isEmerald ? 'bg-emerald-600' : 'bg-blue-600'
                }`}
            />
            {isEmerald ? 'Emerald' : 'Cobalt'}
          </button>

          <button
            type="button"
            onClick={onOpenTerminal}
            title="Open interactive CLI"
            className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 font-mono text-[11px] text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-950"
            aria-label="Open interactive terminal"
          >
            <Terminal className="h-3 w-3" />
            <span>CLI</span>
          </button>

          <button
            type="button"
            onClick={onOpenCommand}
            className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 font-mono text-[11px] text-zinc-500 transition-colors hover:border-zinc-300 hover:text-zinc-900"
            aria-label="Open command palette"
          >
            <Search className="h-3 w-3" />
            <span>⌘K</span>
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={onOpenCommand}
            className="rounded-md border border-zinc-200 p-2 text-zinc-600"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="rounded-md p-2 text-zinc-700 hover:bg-zinc-100"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-zinc-200 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-md px-3 py-2 text-sm font-medium ${activeSection === item.id
                  ? isEmerald
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-blue-50 text-blue-700'
                  : 'text-zinc-600 hover:bg-zinc-50'
                  }`}
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={onToggleAccent}
              className="mt-2 flex items-center gap-2 rounded-md border border-zinc-200 px-3 py-2 font-mono text-xs font-medium text-zinc-700"
            >
              <span
                className={`h-2 w-2 rounded-full ${isEmerald ? 'bg-emerald-600' : 'bg-blue-600'
                  }`}
              />
              Accent: {isEmerald ? 'Emerald Green' : 'Cobalt Blue'}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
