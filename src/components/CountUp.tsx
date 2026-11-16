import { useEffect, useState } from 'react';

interface CountUpProps {
  target: number;
  suffix?: string;
  duration?: number;
}

export function CountUp({ target, suffix = '', duration = 900 }: CountUpProps) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let rafId = 0;

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration]);

  return (
    <span>
      {value}
      {suffix}
    </span>
  );
}
