/**
 * Om Kushwaha Portfolio — Premium Animated Background
 * Canvas-based: particles + network lines + drifting gradient orbs
 * Performance: requestAnimationFrame, off-screen canvas, throttled resize
 * Accessibility: fully respects prefers-reduced-motion
 */

(function () {
  'use strict';

  /* ── Respect prefers-reduced-motion ────────────────────────────── */
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Canvas setup ───────────────────────────────────────────────── */
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  /* ── Design tokens (match CSS variables) ───────────────────────── */
  const COLORS = {
    particlePrimary:  'rgba(0, 112, 243,',   // electric blue
    particleCyan:     'rgba(56, 189, 248,',  // electric cyan
    linePrimary:      'rgba(0, 112, 243,',
    orb1:             [0, 80, 200],
    orb2:             [30, 130, 255],
    orb3:             [56, 189, 248],
  };

  /* ── Config ─────────────────────────────────────────────────────── */
  const CFG = {
    particleCount:    68,     // number of floating dots
    minRadius:        1.0,    // dot min radius
    maxRadius:        2.5,    // dot max radius
    maxSpeed:         0.28,   // px/frame max drift speed
    lineDistance:     155,    // max px to draw a connection line
    lineMaxOpacity:   0.18,   // max line opacity
    particleOpacity:  0.55,   // dot opacity
    orbCount:         3,      // large gradient orbs
    orbSize:          520,    // orb radius
    orbOpacity:       0.055,  // how subtle the orbs are
    orbSpeed:         0.18,   // orb drift speed (px/frame)
  };

  /* ── State ──────────────────────────────────────────────────────── */
  let W = 0, H = 0;
  let particles = [];
  let orbs = [];
  let rafId = null;
  let resizeTimer = null;

  /* ── Helpers ─────────────────────────────────────────────────────*/
  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  /* ── Particle class ──────────────────────────────────────────────*/
  function Particle() {
    this.reset(true);
  }

  Particle.prototype.reset = function (initial) {
    this.x  = rand(0, W);
    this.y  = initial ? rand(0, H) : rand(-20, H + 20);
    this.r  = rand(CFG.minRadius, CFG.maxRadius);
    // slow, random velocity
    const angle = rand(0, Math.PI * 2);
    const speed = rand(CFG.maxSpeed * 0.2, CFG.maxSpeed);
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    // alternate between blue shades
    this.color = Math.random() > 0.5 ? COLORS.particlePrimary : COLORS.particleCyan;
    this.opacity = rand(0.25, CFG.particleOpacity);
    // gentle pulse
    this.pulseSpeed = rand(0.005, 0.015);
    this.pulseOffset = rand(0, Math.PI * 2);
    this.baseOpacity = this.opacity;
  };

  Particle.prototype.update = function (t) {
    this.x += this.vx;
    this.y += this.vy;

    // very gentle pulse
    this.opacity = this.baseOpacity * (0.7 + 0.3 * Math.sin(t * this.pulseSpeed + this.pulseOffset));

    // wrap edges softly
    const pad = 30;
    if (this.x < -pad) this.x = W + pad;
    if (this.x > W + pad) this.x = -pad;
    if (this.y < -pad) this.y = H + pad;
    if (this.y > H + pad) this.y = -pad;
  };

  Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color + this.opacity + ')';
    ctx.fill();
  };

  /* ── Orb class (large blurred gradient) ─────────────────────────*/
  function Orb(index) {
    const col = COLORS['orb' + (index + 1)];
    this.col = col;
    this.x = rand(W * 0.1, W * 0.9);
    this.y = rand(H * 0.1, H * 0.9);
    const angle = rand(0, Math.PI * 2);
    const speed = rand(CFG.orbSpeed * 0.3, CFG.orbSpeed);
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.radius = CFG.orbSize * rand(0.7, 1.3);
  }

  Orb.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;

    // gentle bounce off edges
    const pad = this.radius;
    if (this.x < -pad || this.x > W + pad) this.vx *= -1;
    if (this.y < -pad || this.y > H + pad) this.vy *= -1;
    this.x = Math.max(-pad, Math.min(W + pad, this.x));
    this.y = Math.max(-pad, Math.min(H + pad, this.y));
  };

  Orb.prototype.draw = function () {
    const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
    const [r, g, b] = this.col;
    grad.addColorStop(0,   `rgba(${r},${g},${b},${CFG.orbOpacity})`);
    grad.addColorStop(0.5, `rgba(${r},${g},${b},${CFG.orbOpacity * 0.4})`);
    grad.addColorStop(1,   `rgba(${r},${g},${b},0)`);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  };

  /* ── Draw network lines ──────────────────────────────────────────*/
  function drawLines() {
    const len = particles.length;
    const distSq = CFG.lineDistance * CFG.lineDistance;

    for (let i = 0; i < len; i++) {
      for (let j = i + 1; j < len; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d2 = dx * dx + dy * dy;

        if (d2 < distSq) {
          const ratio = 1 - Math.sqrt(d2) / CFG.lineDistance;
          const opacity = ratio * CFG.lineMaxOpacity;

          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = COLORS.linePrimary + opacity + ')';
          ctx.lineWidth = ratio * 1.1;
          ctx.stroke();
        }
      }
    }
  }

  /* ── Initialise scene ────────────────────────────────────────────*/
  function init() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;

    // Adjust particle count for small screens
    const count = W < 600 ? Math.floor(CFG.particleCount * 0.55) : CFG.particleCount;

    particles = Array.from({ length: count }, () => new Particle());
    orbs = Array.from({ length: CFG.orbCount }, (_, i) => new Orb(i));
  }

  /* ── Main render loop ────────────────────────────────────────────*/
  let frameCount = 0;
  function render() {
    rafId = requestAnimationFrame(render);
    frameCount++;

    // clear
    ctx.clearRect(0, 0, W, H);

    // 1. Orbs (large soft blobs)
    orbs.forEach(o => { o.update(); o.draw(); });

    // 2. Network lines (every frame — cheap at 68 particles)
    drawLines();

    // 3. Particles
    particles.forEach(p => { p.update(frameCount); p.draw(); });
  }

  /* ── Static render (reduced-motion) ─────────────────────────────*/
  function renderStatic() {
    ctx.clearRect(0, 0, W, H);
    orbs.forEach(o => o.draw());
    drawLines();
    particles.forEach(p => p.draw());
  }

  /* ── Resize handler (throttled) ─────────────────────────────────*/
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (rafId) cancelAnimationFrame(rafId);
      init();
      if (prefersReduced) {
        renderStatic();
      } else {
        render();
      }
    }, 200);
  }

  /* ── Boot ────────────────────────────────────────────────────────*/
  init();

  if (prefersReduced) {
    renderStatic();
  } else {
    render();
  }

  window.addEventListener('resize', onResize, { passive: true });

  /* ── Pause when tab is hidden (saves CPU/battery) ────────────────*/
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    } else if (!prefersReduced) {
      render();
    }
  });

})();
