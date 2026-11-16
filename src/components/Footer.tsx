import { ArrowUp } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 font-mono text-xs text-zinc-500 sm:flex-row sm:px-6 lg:px-8">
        <p>
          &copy; {new Date().getFullYear()} {PROFILE.name} &mdash; Jaffna, Sri Lanka
        </p>
        <a
          href="#"
          className="inline-flex items-center gap-1.5 font-medium text-zinc-600 transition-colors hover:text-zinc-950"
        >
          TOP
          <ArrowUp className="h-3.5 w-3.5" />
        </a>
      </div>
    </footer>
  );
}
