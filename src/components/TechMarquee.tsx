const STACK_ITEMS = [
  'React.js',
  'Laravel',
  'Node.js',
  'Express',
  '.NET (C#)',
  'Python',
  'Java',
  'PHP',
  'JavaScript (ES6+)',
  'MySQL',
  'MongoDB',
  'Microsoft SQL Server',
  'Tailwind CSS',
  'RESTful APIs',
  'GitHub & GitLab CI/CD',
];

export function TechMarquee() {
  return (
    <div className="relative overflow-hidden border-b border-zinc-200 bg-zinc-50 py-3.5 select-none">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-linear-to-r from-zinc-50 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-linear-to-l from-zinc-50 to-transparent" />

      <div className="flex w-max animate-[marquee_34s_linear_infinite] hover:[animation-play-state:paused]">
        {[...STACK_ITEMS, ...STACK_ITEMS].map((item, idx) => (
          <div
            key={`${item}-${idx}`}
            className="mx-5 flex items-center gap-5 font-mono text-xs font-medium text-zinc-600"
          >
            <span>{item}</span>
            <span className="text-zinc-300">/</span>
          </div>
        ))}
      </div>
    </div>
  );
}
