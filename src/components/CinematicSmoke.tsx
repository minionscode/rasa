import { useEffect, useRef } from "react";

/**
 * CinematicSmoke — lightweight canvas 2D smoke system.
 * Soft radial puffs drift upward, gently follow cursor parallax,
 * additive blending for luxury depth. Caps frame work for 60fps.
 */
type Props = {
  className?: string;
  /** 0 – 1 intensity */
  intensity?: number;
  /** copper / silver tint */
  tone?: "copper" | "silver" | "ember";
};

type Puff = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  hue: number;
  alpha: number;
};

export function CinematicSmoke({ className = "", intensity = 0.6, tone = "copper" }: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0,
      h = 0,
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const tones = {
      copper: { h1: 28, h2: 18 },
      silver: { h1: 35, h2: 220 },
      ember: { h1: 18, h2: 8 },
    } as const;
    const T = tones[tone];

    const count = Math.round((reduced ? 8 : 22) * intensity);
    const puffs: Puff[] = [];

    const spawn = (initial = false): Puff => {
      const maxLife = 6 + Math.random() * 6;
      return {
        x: Math.random() * w,
        y: initial ? Math.random() * h : h + 40 + Math.random() * 80,
        r: 120 + Math.random() * 220,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -(0.1 + Math.random() * 0.25),
        life: initial ? Math.random() * maxLife : 0,
        maxLife,
        hue: Math.random() < 0.6 ? T.h1 : T.h2,
        alpha: 0.04 + Math.random() * 0.08,
      };
    };
    for (let i = 0; i < count; i++) puffs.push(spawn(true));

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = (e.clientX - rect.left) / rect.width;
      mouse.current.y = (e.clientY - rect.top) / rect.height;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let last = performance.now();
    let raf = 0;
    let running = true;

    const onVis = () => {
      running = document.visibilityState === "visible";
      if (running) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    const tick = (now: number) => {
      if (!running) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      const mx = (mouse.current.x - 0.5) * 30;
      const my = (mouse.current.y - 0.5) * 20;

      for (const p of puffs) {
        p.life += dt;
        p.x += (p.vx + mx * 0.0008) * 60 * dt;
        p.y += (p.vy + my * 0.0004) * 60 * dt;

        const t = p.life / p.maxLife;
        const fade = t < 0.2 ? t / 0.2 : t > 0.7 ? 1 - (t - 0.7) / 0.3 : 1;
        const a = p.alpha * fade;

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        g.addColorStop(0, `hsla(${p.hue}, 50%, 65%, ${a})`);
        g.addColorStop(0.5, `hsla(${p.hue}, 40%, 35%, ${a * 0.45})`);
        g.addColorStop(1, `hsla(${p.hue}, 30%, 10%, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        if (p.life > p.maxLife || p.y < -p.r) {
          Object.assign(p, spawn(false));
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      running = false;
    };
  }, [intensity, tone]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
