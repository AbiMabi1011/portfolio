import { useRef, useState, type ReactNode, type MouseEvent } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  accent?: 'blue' | 'emerald';
}

export function TiltCard({
  children,
  className = '',
  accent = 'blue',
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
    glowX: 50,
    glowY: 50,
    glowOpacity: 0,
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 6;
    const rotateX = ((y / rect.height) - 0.5) * -6;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`,
      glowX: x,
      glowY: y,
      glowOpacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setStyle((prev) => ({
      ...prev,
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
      glowOpacity: 0,
    }));
  };

  const glowColor =
    accent === 'emerald'
      ? 'rgba(16, 185, 129, 0.12)'
      : 'rgba(37, 99, 235, 0.11)';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: style.transform }}
      className={`relative overflow-hidden transition-transform duration-200 ease-out will-change-transform ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: style.glowOpacity,
          background: `radial-gradient(380px circle at ${style.glowX}px ${style.glowY}px, ${glowColor}, transparent 65%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
