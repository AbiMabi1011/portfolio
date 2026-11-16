import { useState } from 'react';
import { MessageCircle, Mail, Phone, FileText, X } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

interface FloatingConnectProps {
  accent: 'blue' | 'emerald';
  onOpenResume: () => void;
}

export function FloatingConnect({ accent, onOpenResume }: FloatingConnectProps) {
  const [open, setOpen] = useState(false);
  const isEmerald = accent === 'emerald';

  return (
    <div className="no-print fixed bottom-5 left-5 z-40 flex flex-col items-start gap-2.5">
      {open && (
        <div className="w-56 border border-zinc-200 bg-white p-2 shadow-2xl">
          <div className="border-b border-zinc-100 px-2.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
            Quick Connect
          </div>
          <div className="mt-1 space-y-1">
            <a
              href="https://wa.me/94711346376"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 px-2.5 py-2 font-mono text-xs font-medium text-zinc-800 transition-colors hover:bg-zinc-100"
            >
              <MessageCircle className="h-3.5 w-3.5 text-emerald-600" />
              WhatsApp Chat
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              className="flex items-center gap-2.5 px-2.5 py-2 font-mono text-xs font-medium text-zinc-800 transition-colors hover:bg-zinc-100"
            >
              <Mail className="h-3.5 w-3.5 text-blue-600" />
              Email Direct
            </a>
            <a
              href={PROFILE.phoneHref}
              className="flex items-center gap-2.5 px-2.5 py-2 font-mono text-xs font-medium text-zinc-800 transition-colors hover:bg-zinc-100"
            >
              <Phone className="h-3.5 w-3.5 text-zinc-600" />
              {PROFILE.phone}
            </a>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onOpenResume();
              }}
              className="flex w-full items-center gap-2.5 px-2.5 py-2 text-left font-mono text-xs font-medium text-zinc-800 transition-colors hover:bg-zinc-100"
            >
              <FileText className="h-3.5 w-3.5 text-zinc-600" />
              View / Save CV
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle quick connect menu"
        className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-105 ${
          isEmerald
            ? 'bg-emerald-600 hover:bg-emerald-700'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>
    </div>
  );
}
