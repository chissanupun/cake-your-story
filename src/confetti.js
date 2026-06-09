/* ============================================================
   Lightweight canvas confetti — cake-palette, no deps.
   window.CYSConfetti.burst({ x, y, count }) on a full-screen canvas.
   ============================================================ */
(function () {
  const COLORS = ['#D90429', '#F4A261', '#A2D2FF', '#84A98C', '#FF8FB1', '#FFE08A', '#FFFFFF'];
  const GLYPHS = ['🍒', '🍓', '✦', '⭐️', '🧁', '🎉'];

  function makeCanvas(host) {
    const c = document.createElement('canvas');
    c.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:60;';
    host.appendChild(c);
    return c;
  }

  class Confetti {
    constructor(host) {
      this.host = host;
      this.canvas = makeCanvas(host);
      this.ctx = this.canvas.getContext('2d');
      this.parts = [];
      this.raf = null;
      this.resize();
      this._onResize = () => this.resize();
      window.addEventListener('resize', this._onResize);
    }
    resize() {
      const r = this.host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.w = r.width; this.h = r.height;
      this.canvas.width = r.width * dpr;
      this.canvas.height = r.height * dpr;
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    burst(opts = {}) {
      const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const count = reduce ? 24 : (opts.count || 90);
      const x = opts.x != null ? opts.x : this.w / 2;
      const y = opts.y != null ? opts.y : this.h * 0.32;
      for (let i = 0; i < count; i++) {
        const ang = Math.random() * Math.PI * 2;
        const spd = 4 + Math.random() * 9;
        const glyph = Math.random() < 0.28;
        this.parts.push({
          x, y,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd - 6,
          g: 0.18 + Math.random() * 0.12,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.3,
          size: glyph ? 16 + Math.random() * 12 : 6 + Math.random() * 7,
          color: COLORS[(Math.random() * COLORS.length) | 0],
          glyph: glyph ? GLYPHS[(Math.random() * GLYPHS.length) | 0] : null,
          life: 0,
          ttl: 90 + Math.random() * 50,
          shape: Math.random() < 0.5 ? 'rect' : 'circ',
        });
      }
      if (!this.raf) this.loop();
    }
    rain(durationMs = 1400) {
      const start = performance.now();
      const tick = () => {
        if (performance.now() - start < durationMs) {
          for (let i = 0; i < 5; i++) {
            this.parts.push({
              x: Math.random() * this.w, y: -10,
              vx: (Math.random() - 0.5) * 1.5, vy: 2 + Math.random() * 3,
              g: 0.04, rot: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.2,
              size: 6 + Math.random() * 8, color: COLORS[(Math.random() * COLORS.length) | 0],
              glyph: Math.random() < 0.2 ? GLYPHS[(Math.random() * GLYPHS.length) | 0] : null,
              life: 0, ttl: 200, shape: Math.random() < 0.5 ? 'rect' : 'circ',
            });
          }
          requestAnimationFrame(tick);
        }
      };
      if (!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) tick();
      if (!this.raf) this.loop();
    }
    loop() {
      const ctx = this.ctx;
      ctx.clearRect(0, 0, this.w, this.h);
      this.parts = this.parts.filter((p) => p.life < p.ttl && p.y < this.h + 40);
      this.parts.forEach((p) => {
        p.life++;
        p.vy += p.g; p.x += p.vx; p.y += p.vy; p.rot += p.vr;
        p.vx *= 0.99;
        const alpha = Math.max(0, 1 - p.life / p.ttl);
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        if (p.glyph) {
          ctx.font = p.size + 'px serif';
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText(p.glyph, 0, 0);
        } else {
          ctx.fillStyle = p.color;
          if (p.shape === 'rect') ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          else { ctx.beginPath(); ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2); ctx.fill(); }
        }
        ctx.restore();
      });
      if (this.parts.length) {
        this.raf = requestAnimationFrame(() => this.loop());
      } else {
        cancelAnimationFrame(this.raf); this.raf = null;
        ctx.clearRect(0, 0, this.w, this.h);
      }
    }
    destroy() {
      window.removeEventListener('resize', this._onResize);
      cancelAnimationFrame(this.raf);
      if (this.canvas.parentNode) this.canvas.parentNode.removeChild(this.canvas);
    }
  }

  window.CYSConfetti = { create: (host) => new Confetti(host) };
})();
