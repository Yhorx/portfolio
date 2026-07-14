"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let running = true;
    let diagonal = 0;
    let linkDist = 0;

    // Colores base rgb
    const BASE = isDark ? [64, 64, 64] : [166, 160, 155]; // gray-200 / blue-800
    const PULSE = isDark ? [15, 146, 247] : [15, 146, 247]; // blue-300 / blue-500

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      diagonal = Math.hypot(canvas.width, canvas.height);
      linkDist = 0.19 * diagonal;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Partícula ──────────────────────────────────────────────
    const BASE_SPEED = 2e-5;
    const SIZE_BASE = 0.002;
    let activeCount = 0;
    const MAX_NODES = 15;

    class Particle {
      x = 0; y = 0;
      vx = 0; vy = 0;
      size = 0;
      pulse = 0;
      deg = 0;       // aristas activas conectadas
      active = false;

      constructor(x?: number, y?: number) {
        if (x !== undefined && y !== undefined) {
          this.active = true;
          activeCount++;
          this.x = x;
          this.y = y;
          this.size = SIZE_BASE + 0.002 * Math.random();
          const speed = BASE_SPEED + 2e-5 * Math.random();
          const angle = 2 * Math.PI * Math.random();
          this.vx = speed * Math.cos(angle);
          this.vy = speed * Math.sin(angle);
        } else {
          this.respawn();
        }
      }

      respawn() {
        this.active = true;
        activeCount++;
        this.pulse = 0;
        this.size = SIZE_BASE + 0.002 * Math.random();
        const speed = BASE_SPEED + 2e-5 * Math.random();
        // Ángulo que apunta hacia adentro
        let angle = (1 / 6 + 2 * Math.random() / 3) * Math.PI;
        if (!canvas) return

        let pos = 2 * (canvas.width + canvas.height) * Math.random();

        if (pos < canvas.width) {
          this.x = pos; this.y = -linkDist;
        } else {
          pos -= canvas.width; angle += Math.PI / 2;
          if (pos < canvas.height) {
            this.y = pos; this.x = canvas.width + linkDist;
          } else {
            pos -= canvas.height; angle += Math.PI / 2;
            if (pos < canvas.width) {
              this.x = pos; this.y = canvas.height + linkDist;
            } else {
              pos -= canvas.width; angle += Math.PI / 2;
              this.y = pos; this.x = -linkDist;
            }
          }
        }
        this.vx = speed * Math.cos(angle);
        this.vy = speed * Math.sin(angle);
      }

      update(dt: number) {
        if (this.active && !this.deg) {
          if (!canvas) return
          const oob = this.x < -linkDist || this.x > canvas.width + linkDist
            || this.y < -linkDist || this.y > canvas.height + linkDist;
          if (oob) { this.active = false; activeCount--; }
        }
        if (!this.active && activeCount < MAX_NODES) this.respawn();
        if (this.active) {
          this.pulse = Math.min(this.pulse + 0.005 * dt, 1);
          this.x += this.vx * diagonal * dt;
          this.y += this.vy * diagonal * dt;
        }
      }

      draw() {
        if (!this.active) return;
        const t = Math.sin(Math.PI * Math.sqrt(this.pulse));
        let r = this.size;
        if (this.pulse < 1) r += 0.002 * t;

        const [br, bg, bb] = BASE;
        const [pr, pg, pb] = PULSE;
        const color = this.pulse < 1
          ? `rgb(${Math.round(br + (pr - br) * t)},${Math.round(bg + (pg - bg) * t)},${Math.round(bb + (pb - bb) * t)})`
          : `rgb(${br},${bg},${bb})`;

        ctx.beginPath();
        ctx.arc(this.x, this.y, r * diagonal, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
      }
    }

    // ── Propagación ────────────────────────────────────────────
    interface Edge {
      from: number;
      to: number;
      progress: number; // 0 → distancia entre nodos
    }

    class Propagation {
      vis: boolean[];
      edges: Edge[];

      constructor(startIdx: number) {
        this.vis = new Array(particles.length).fill(false);
        this.edges = [];
        this.visit(startIdx);
      }

      visit(idx: number) {
        if (this.vis[idx]) return;
        particles[idx].pulse = 0; // reinicia el pulso visual
        this.vis[idx] = true;

        for (let i = 0; i < particles.length; i++) {
          if (this.vis[i] || !particles[i].active) continue;
          const d = Math.hypot(
            particles[idx].x - particles[i].x,
            particles[idx].y - particles[i].y
          );
          if (d <= linkDist) {
            this.edges.push({ from: idx, to: i, progress: 0 });
            particles[idx].deg++;
            particles[i].deg++;
          }
        }
      }

      update(dt: number) {
        // Asegura que vis crezca si se añadieron partículas nuevas
        while (this.vis.length < particles.length) this.vis.push(false);

        const arrived: number[] = [];
        for (let i = this.edges.length - 1; i >= 0; i--) {
          const e = this.edges[i];
          const d = Math.hypot(
            particles[e.from].x - particles[e.to].x,
            particles[e.from].y - particles[e.to].y
          );
          // Velocidad proporcional a la diagonal (igual que el original)
          e.progress += 5e-4 * diagonal * dt;

          if (e.progress >= d) {
            this.edges.splice(i, 1);
            particles[e.from].deg--;
            particles[e.to].deg--;
            arrived.push(e.to);
          }
        }
        arrived.forEach(idx => this.visit(idx));
      }

      draw() {
        const [pr, pg, pb] = PULSE;
        this.edges.forEach(e => {
          const d = Math.hypot(
            particles[e.from].x - particles[e.to].x,
            particles[e.from].y - particles[e.to].y
          );
          const headR = 0.03 * diagonal;
          const t = e.progress / d;
          const tail = Math.max((e.progress - headR) / d, 0);
          const head = Math.min(t, 1);

          const fx = particles[e.from].x, fy = particles[e.from].y;
          const tx = particles[e.to].x, ty = particles[e.to].y;

          ctx.lineWidth = 0.0008 * diagonal;
          ctx.strokeStyle = `rgba(${pr},${pg},${pb},0.69)`;
          ctx.beginPath();
          ctx.moveTo(fx + (tx - fx) * tail, fy + (ty - fy) * tail);
          ctx.lineTo(fx + (tx - fx) * head, fy + (ty - fy) * head);
          ctx.stroke();
        });
      }
    }

    // ── Init ───────────────────────────────────────────────────
    const particles: Particle[] = [];
    const propagations: Propagation[] = [];

    for (let i = 0; i < MAX_NODES; i++) {
      particles.push(new Particle());
      // Warmup: avanza cada partícula para que no aparezcan todas en el borde
      particles[i].update(0.145 / 4e-5 * Math.random());
    }

    // ── Click ──────────────────────────────────────────────────
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | SVGElement;
      if (target.closest('img, p, h1, h2, h3, h4, h5, h6, span, a, button, input, textarea, form, label, svg, path')) return;

      const rect = canvas.getBoundingClientRect();
      if (
        e.clientX < rect.left || e.clientX > rect.right ||
        e.clientY < rect.top || e.clientY > rect.bottom
      ) return;

      const mx = (e.clientX - rect.left) * (canvas.width / rect.width);
      const my = (e.clientY - rect.top) * (canvas.height / rect.height);

      particles.push(new Particle(mx, my));
      propagations.push(new Propagation(particles.length - 1));
    };
    window.addEventListener("click", onClick);

    // ── Loop ───────────────────────────────────────────────────
    let lastTime: number | undefined;
    const loop = (now: number) => {
      if (!running) return;
      requestAnimationFrame(loop);
      if (!lastTime) { lastTime = now; return; }

      const dt = Math.min(now - lastTime, 999);
      lastTime = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Actualizar partículas
      particles.forEach(p => p.update(dt));

      // Limpiar propagaciones sin aristas
      for (let i = propagations.length - 1; i >= 0; i--) {
        if (!propagations[i].edges.length) propagations.splice(i, 1);
      }

      // Aristas base (red de fondo)
      const [br, bg, bb] = BASE;
      for (let i = 0; i < particles.length; i++) {
        if (!particles[i].active) continue;
        for (let j = 0; j < i; j++) {
          if (!particles[j].active) continue;
          const d = Math.hypot(
            particles[i].x - particles[j].x,
            particles[i].y - particles[j].y
          );
          if (d < linkDist) {
            ctx.lineWidth = 0.0008 * diagonal;
            ctx.strokeStyle = `rgba(${br},${bg},${bb},${1 - d / linkDist})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Actualizar y dibujar propagaciones
      propagations.forEach(p => { p.update(dt); p.draw(); });

      // Dibujar nodos
      particles.forEach(p => p.draw());
    };
    requestAnimationFrame(loop);

    return () => {
      running = false;
      window.removeEventListener("click", onClick);
      window.removeEventListener("resize", resize);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}