import { useEffect, useRef } from 'react';

interface AmbientCanvasProps {
  accent: 'blue' | 'emerald';
}

interface NodePoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

export function AmbientCanvas({ accent }: AmbientCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const mouse = { x: -9999, y: -9999 };
    const nodeCount = Math.min(48, Math.max(24, Math.floor((width * height) / 22000)));
    const nodes: NodePoint[] = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 1.8 + 1.2,
    }));

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener('resize', onResize);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    const dotRgb = accent === 'emerald' ? '5, 150, 105' : '37, 99, 235';
    const lineRgb = accent === 'emerald' ? '13, 148, 136' : '59, 130, 246';

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        // Gentle mouse repulsion
        const dxMouse = n.x - mouse.x;
        const dyMouse = n.y - mouse.y;
        const distMouse = Math.hypot(dxMouse, dyMouse);
        if (distMouse < 110 && distMouse > 0) {
          n.x += (dxMouse / distMouse) * 0.9;
          n.y += (dyMouse / distMouse) * 0.9;
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dotRgb}, 0.35)`;
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dist = Math.hypot(n.x - m.x, n.y - m.y);
          if (dist < 135) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = `rgba(${lineRgb}, ${(1 - dist / 135) * 0.16})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [accent]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-auto absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
