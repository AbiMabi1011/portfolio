import { useState, type FormEvent } from 'react';
import { Copy, Check, ArrowUpRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

interface ContactProps {
  accent: 'blue' | 'emerald';
}

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

export function Contact({ accent }: ContactProps) {
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);
  const [name, setName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const isEmerald = accent === 'emerald';

  const handleCopy = async (text: string, field: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // ignore
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${PROFILE.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name,
          email: senderEmail,
          message,
          _subject: `Portfolio Inquiry from ${name}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.success === 'false') {
        throw new Error(data.message || 'Unable to send message right now.');
      }

      setStatus('success');
      setName('');
      setSenderEmail('');
      setMessage('');
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Could not deliver message. Please email directly.'
      );
    }
  };

  return (
    <section id="contact" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-14">
        <div className="border-b border-zinc-300 pb-6">
          <span
            className={`font-mono text-xs font-semibold uppercase tracking-[0.2em] ${
              isEmerald ? 'text-emerald-700' : 'text-blue-700'
            }`}
          >
            [ 07 / CONTACT ]
          </span>
          <h2 className="mt-2 font-condensed text-5xl tracking-wide text-zinc-950 uppercase sm:text-6xl">
            Get in Touch
          </h2>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-base leading-relaxed text-zinc-600">
              {PROFILE.availability}. Reach out directly for software engineering roles, startup collaborations, or technical discussions.
            </p>

            <div className="mt-8 divide-y divide-zinc-200 border border-zinc-200 bg-white">
              <div className="flex items-center justify-between p-4">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                    Email
                  </div>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="mt-0.5 block font-mono text-sm font-medium text-zinc-900 hover:underline"
                  >
                    {PROFILE.email}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(PROFILE.email, 'email')}
                  className="rounded-md p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900"
                  aria-label="Copy email"
                >
                  {copiedField === 'email' ? (
                    <Check className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between p-4">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                    Phone
                  </div>
                  <a
                    href={PROFILE.phoneHref}
                    className="mt-0.5 block font-mono text-sm font-medium text-zinc-900 hover:underline"
                  >
                    {PROFILE.phone}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(PROFILE.phone, 'phone')}
                  className="rounded-md p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900"
                  aria-label="Copy phone"
                >
                  {copiedField === 'phone' ? (
                    <Check className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>

              <div className="p-4">
                <div className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                  Location
                </div>
                <div className="mt-0.5 font-mono text-sm font-medium text-zinc-900">
                  {PROFILE.location}
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="border border-zinc-200 bg-white p-6 sm:p-8 lg:col-span-7"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block font-mono text-xs font-semibold uppercase tracking-wider text-zinc-600"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  disabled={status === 'sending'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="mt-2 w-full border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-950 placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none disabled:opacity-60"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block font-mono text-xs font-semibold uppercase tracking-wider text-zinc-600"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  disabled={status === 'sending'}
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="jane@company.com"
                  className="mt-2 w-full border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-950 placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none disabled:opacity-60"
                />
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="contact-message"
                className="block font-mono text-xs font-semibold uppercase tracking-wider text-zinc-600"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                required
                disabled={status === 'sending'}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about the role or project..."
                className="mt-2 w-full resize-none border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-950 placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none disabled:opacity-60"
              />
            </div>

            {status === 'success' && (
              <div className="mt-4 flex items-center gap-2 border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 font-mono text-xs text-emerald-800">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>Message delivered to {PROFILE.email}. Thank you for reaching out!</span>
              </div>
            )}

            {status === 'error' && (
              <div className="mt-4 flex items-center justify-between gap-2 border border-red-200 bg-red-50 px-3.5 py-2.5 font-mono text-xs text-red-800">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                  <span>{errorMsg}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="shrink-0 font-semibold underline"
                >
                  Try Again
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className={`mt-6 inline-flex items-center gap-2 rounded-md px-5 py-2.5 font-mono text-xs font-semibold text-white transition-colors disabled:opacity-60 ${
                isEmerald
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {status === 'sending' ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
