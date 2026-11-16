import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Terminal, X } from 'lucide-react';
import { PROFILE, EXPERIENCES, PROJECTS } from '../data/portfolioData';

interface DevTerminalProps {
  open: boolean;
  onClose: () => void;
  accent: 'blue' | 'emerald';
  onSetAccent: (accent: 'blue' | 'emerald') => void;
}

interface LogEntry {
  cmd?: string;
  lines: string[];
}

export function DevTerminal({
  open,
  onClose,
  accent,
  onSetAccent,
}: DevTerminalProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<LogEntry[]>([
    {
      lines: [
        `Abishanan Pathmarajah — Interactive Portfolio CLI (v2.0)`,
        `Type 'help' to see available commands.`,
      ],
    },
  ]);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!open) return null;

  const runCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      setHistory([]);
      return;
    }

    let lines: string[] = [];

    switch (cmd) {
      case 'help':
        lines = [
          'Available commands:',
          '  whoami       - Profile summary & location',
          '  experience   - Work history (UltraKerb, CodeVita)',
          '  projects     - Featured projects (LMS, Kalappai, Wanlanka)',
          '  contact      - Email, phone & availability',
          '  theme blue   - Switch to Cobalt Blue accent',
          '  theme green  - Switch to Emerald Green accent',
          '  clear        - Clear terminal output',
        ];
        break;
      case 'whoami':
        lines = [
          `${PROFILE.name}`,
          `${PROFILE.subHeadline}`,
          `Location: ${PROFILE.location}`,
          `Status: ${PROFILE.availability}`,
        ];
        break;
      case 'experience':
        lines = EXPERIENCES.map(
          (e) => `• ${e.role} @ ${e.company} (${e.period})`
        );
        break;
      case 'projects':
        lines = PROJECTS.map(
          (p) =>
            `• ${p.title} [${p.category}]${p.liveLabel ? ` -> https://${p.liveLabel}` : ''}`
        );
        break;
      case 'contact':
        lines = [
          `Email: ${PROFILE.email}`,
          `Phone: ${PROFILE.phone}`,
          `Location: ${PROFILE.location}`,
        ];
        break;
      case 'theme blue':
        onSetAccent('blue');
        lines = ['Accent switched to Cobalt Blue.'];
        break;
      case 'theme green':
      case 'theme emerald':
        onSetAccent('emerald');
        lines = ['Accent switched to Emerald Green.'];
        break;
      default:
        lines = [`Command not found: '${raw}'. Type 'help' for commands.`];
    }

    setHistory((prev) => [...prev, { cmd: raw, lines }]);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    runCommand(input);
    setInput('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/45 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl overflow-hidden border border-zinc-300 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-100 px-4 py-2.5">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold text-zinc-700">
            <Terminal
              className={`h-3.5 w-3.5 ${
                accent === 'emerald' ? 'text-emerald-600' : 'text-blue-600'
              }`}
            />
            <span>abishanan@portfolio:~</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900"
            aria-label="Close terminal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="h-72 overflow-y-auto bg-zinc-50 p-4 font-mono text-xs leading-relaxed text-zinc-800">
          {history.map((entry, idx) => (
            <div key={idx} className="mb-3">
              {entry.cmd && (
                <div className="font-semibold text-zinc-950">
                  <span
                    className={
                      accent === 'emerald' ? 'text-emerald-600' : 'text-blue-600'
                    }
                  >
                    $&nbsp;
                  </span>
                  {entry.cmd}
                </div>
              )}
              {entry.lines.map((line, i) => (
                <div key={i} className="whitespace-pre-wrap text-zinc-600">
                  {line}
                </div>
              ))}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-zinc-200 bg-white px-4 py-2.5 font-mono text-xs"
        >
          <span
            className={`font-bold ${
              accent === 'emerald' ? 'text-emerald-600' : 'text-blue-600'
            }`}
          >
            $
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type 'help', 'whoami', 'projects', 'theme green'..."
            className="w-full bg-transparent text-zinc-950 placeholder:text-zinc-400 focus:outline-none"
          />
        </form>
      </div>
    </div>
  );
}
