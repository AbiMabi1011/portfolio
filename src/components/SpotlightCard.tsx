import { useRef, useState, type ReactNode, type MouseEvent } from 'react';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  accent?: 'blue' | 'emerald';
}

export function SpotlightCard({
  children,
  className = '',
  accent = 'blue',
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const glowColor =
    accent === 'emerald'
      ? 'rgba(16, 185, 129, 0.12)'
      : 'rgba(37, 99, 235, 0.11)';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(420px circle at ${pos.x}px ${pos.y}px, ${glowColor}, transparent 65%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
