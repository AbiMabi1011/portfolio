import { useEffect, useState } from 'react';
import {
  Search,
  X,
  ArrowRight,
  Copy,
  Check,
  Palette,
  Printer,
  Layers,
  Briefcase,
  Code2,
  Award,
  Mail,
} from 'lucide-react';
import { PROFILE, PROJECTS, type ProjectItem } from '../data/portfolioData';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  accent: 'blue' | 'emerald';
  onToggleAccent: () => void;
  onSelectProject: (project: ProjectItem) => void;
}

interface CommandItem {
  id: string;
  label: string;
  group: 'Navigation' | 'Projects' | 'Actions';
  keywords: string;
  icon: typeof ArrowRight;
  action: () => void;
}

export function CommandPalette({
  open,
  onClose,
  accent,
  onToggleAccent,
  onSelectProject,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) {
      setQuery('');
      return;
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const scrollTo = (id: string) => {
    onClose();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        onClose();
      }, 900);
    } catch {
      onClose();
    }
  };

  const items: CommandItem[] = [
    {
      id: 'nav-about',
      label: 'Jump to About & Spotlight',
      group: 'Navigation',
      keywords: 'about hero profile summary',
      icon: ArrowRight,
      action: () => scrollTo('about'),
    },
    {
      id: 'nav-experience',
      label: 'Jump to Professional Experience',
      group: 'Navigation',
      keywords: 'experience ultrakerb codevita career',
      icon: Briefcase,
      action: () => scrollTo('experience'),
    },
    {
      id: 'nav-projects',
      label: 'Jump to Key Projects',
      group: 'Navigation',
      keywords: 'projects lms kalappai wanlanka',
      icon: Layers,
      action: () => scrollTo('projects'),
    },
    {
      id: 'nav-skills',
      label: 'Jump to Skills & Stack',
      group: 'Navigation',
      keywords: 'skills react laravel node python net',
      icon: Code2,
      action: () => scrollTo('skills'),
    },
    {
      id: 'nav-credentials',
      label: 'Jump to Education & Certifications',
      group: 'Navigation',
      keywords: 'education sliit certifications references',
      icon: Award,
      action: () => scrollTo('credentials'),
    },
    {
      id: 'nav-contact',
      label: 'Jump to Contact Form',
      group: 'Navigation',
      keywords: 'contact email phone hire',
      icon: Mail,
      action: () => scrollTo('contact'),
    },
    ...PROJECTS.map((project) => ({
      id: `proj-${project.id}`,
      label: `Inspect Project: ${project.title}`,
      group: 'Projects' as const,
      keywords: `${project.title} ${project.stack.join(' ')} ${project.category}`,
      icon: Layers,
      action: () => {
        onClose();
        onSelectProject(project);
      },
    })),
    {
      id: 'act-copy-email',
      label: copied ? 'Email Copied!' : `Copy Email (${PROFILE.email})`,
      group: 'Actions',
      keywords: 'copy email contact',
      icon: copied ? Check : Copy,
      action: copyEmail,
    },
    {
      id: 'act-theme',
      label: `Switch Accent to ${accent === 'blue' ? 'Emerald Green' : 'Ocean Blue'}`,
      group: 'Actions',
      keywords: 'theme color blue green emerald',
      icon: Palette,
      action: () => {
        onToggleAccent();
        onClose();
      },
    },
    {
      id: 'act-print',
      label: 'Print / Save Portfolio as PDF',
      group: 'Actions',
      keywords: 'print pdf resume cv export',
      icon: Printer,
      action: () => {
        onClose();
        setTimeout(() => window.print(), 150);
      },
    },
  ];

  const q = query.trim().toLowerCase();
  const filtered = q
    ? items.filter(
        (item) =>
          item.label.toLowerCase().includes(q) ||
          item.keywords.toLowerCase().includes(q)
      )
    : items;

  const groups = ['Navigation', 'Projects', 'Actions'] as const;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/40 px-4 pt-20 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3.5">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, section, skill, or project..."
            className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close command palette"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">
              No matching commands found.
            </div>
          ) : (
            groups.map((group) => {
              const groupItems = filtered.filter((i) => i.group === group);
              if (groupItems.length === 0) return null;
              return (
                <div key={group} className="mb-2 last:mb-0">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {group}
                  </div>
                  {groupItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={item.action}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-700"
                      >
                        <Icon className="h-4 w-4 shrink-0 text-slate-400" />
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-2 text-[11px] text-slate-500">
          <span>Quick Navigation &amp; Actions</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
}
