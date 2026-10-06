/**
 * Om Kushwaha Portfolio — Cinematic Split-Typing Intro Screen
 * Characters reveal from both sides toward the center simultaneously.
 */
(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Build the intro overlay DOM
  const overlay = document.createElement('div');
  overlay.id = 'introOverlay';
  overlay.setAttribute('role', 'presentation');
  overlay.setAttribute('aria-hidden', 'true');

  overlay.innerHTML = '<canvas id="introCanvas"></canvas><div class="intro-content"><div class="intro-line intro-name" id="introName"><div class="intro-name-line" id="introNameLine1"></div><div class="intro-name-line" id="introNameLine2"></div></div><div class="intro-line intro-role" id="introRole"></div><div class="intro-line intro-welcome" id="introWelcome"></div><div class="intro-line intro-sub hero-subtitle" id="introSub"></div><div class="intro-cta" id="introCta"><span class="intro-cta-dot"></span><span class="intro-cta-text">Tap anywhere to enter</span><span class="intro-cta-arrow">&#x2192;</span></div></div>';

  document.body.insertBefore(overlay, document.body.firstChild);
  document.body.classList.add('intro-active');

  // Particle canvas
  const canvas = overlay.querySelector('#introCanvas');
  const ctx = canvas.getContext('2d');
  let W = 0, H = 0;
  let particles = [];
  let rafId = null;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function makeParticle() {
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      alpha: Math.random() * 0.45 + 0.15,
      cyan: Math.random() < 0.45
    };
  }

  for (var i = 0; i < 80; i++) particles.push(makeParticle());

  function drawParticles() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(function(p) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.cyan ? 'rgba(56,189,248,' + p.alpha + ')' : 'rgba(0,112,243,' + p.alpha + ')';
      ctx.fill();
      p.x += p.vx; p.y += p.vy;
      if (p.x < -5) p.x = W + 5;
      if (p.x > W + 5) p.x = -5;
      if (p.y < -5) p.y = H + 5;
      if (p.y > H + 5) p.y = -5;
    });
  }

  function loop() { drawParticles(); rafId = requestAnimationFrame(loop); }
  if (!prefersReduced) loop();

  // Split-typing engine
  function splitType(el, text, durationMs) {
    return new Promise(function(resolve) {
      el.innerHTML = '';
      var chars = text.split('');
      var total = chars.length;
      var mid = Math.floor(total / 2);
      var leftSpans = [], rightSpans = [];

      var currentWord = null;

      chars.forEach(function(ch, i) {
        if (ch === ' ') {
          currentWord = null;
          var spaceSpan = document.createElement('span');
          spaceSpan.className = 'intro-space';
          spaceSpan.innerHTML = ' ';
          el.appendChild(spaceSpan);
        } else {
          if (!currentWord) {
            currentWord = document.createElement('span');
            currentWord.className = 'intro-word';
            el.appendChild(currentWord);
          }
          var span = document.createElement('span');
          span.className = 'intro-char';
          span.textContent = ch;
          span.style.opacity = '0';
          span.style.display = 'inline-block';
          span.style.transform = i < mid ? 'translateX(-10px)' : 'translateX(10px)';
          currentWord.appendChild(span);
          if (i < mid) leftSpans.push(span);
          else rightSpans.push(span);
        }
      });

      if (total === 0) { resolve(); return; }

      var intervalMs = durationMs / (mid + 1);

      leftSpans.forEach(function(span, idx) {
        setTimeout(function() {
          span.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          span.style.opacity = '1';
          span.style.transform = 'translateX(0)';
        }, idx * intervalMs);
      });

      var reversedRight = rightSpans.slice().reverse();
      reversedRight.forEach(function(span, idx) {
        setTimeout(function() {
          span.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          span.style.opacity = '1';
          span.style.transform = 'translateX(0)';
        }, idx * intervalMs);
      });

      setTimeout(resolve, mid * intervalMs + 500);
    });
  }

  function revealInstant(el, text) {
    el.innerHTML = '';
    var words = text.split(' ');
    words.forEach(function(word, idx) {
      var wordSpan = document.createElement('span');
      wordSpan.className = 'intro-word';
      wordSpan.textContent = word;
      el.appendChild(wordSpan);
      if (idx < words.length - 1) {
        var spaceSpan = document.createElement('span');
        spaceSpan.className = 'intro-space';
        spaceSpan.innerHTML = ' ';
        el.appendChild(spaceSpan);
      }
    });
    return Promise.resolve();
  }
  function delay(ms) { return new Promise(function(r) { setTimeout(r, ms); }); }

  var type = prefersReduced
    ? function(el, text) { return revealInstant(el, text); }
    : splitType;

  var elName     = overlay.querySelector('#introName');
  var elName1    = overlay.querySelector('#introNameLine1');
  var elName2    = overlay.querySelector('#introNameLine2');
  var elRole     = overlay.querySelector('#introRole');
  var elWelcome  = overlay.querySelector('#introWelcome');
  var elSub      = overlay.querySelector('#introSub');
  var elCta      = overlay.querySelector('#introCta');

  async function runSequence() {
    await delay(prefersReduced ? 150 : 620);
    await Promise.all([
      type(elName1, 'OM', prefersReduced ? 0 : 350),
      type(elName2, 'KUSHWAHA', prefersReduced ? 0 : 500)
    ]);
    await delay(prefersReduced ? 40 : 150);
    await type(elRole, 'SOFTWARE DEVELOPER \u2022 AI ENTHUSIAST', prefersReduced ? 0 : 600);
    await delay(prefersReduced ? 40 : 150);
    await type(elWelcome, 'Welcome to my digital workspace.', prefersReduced ? 0 : 1050);
    await delay(prefersReduced ? 40 : 150);
    await type(elSub, 'Building software, exploring AI, and turning ideas into real products.', prefersReduced ? 0 : 1450);
    await delay(prefersReduced ? 40 : 150);
    elCta.classList.add('visible');
  }

  runSequence();

  var exiting = false;
  function exitIntro() {
    if (exiting) return;
    exiting = true;
    cancelAnimationFrame(rafId);
    overlay.classList.add('intro-exit');
    var done = function() {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      document.body.classList.remove('intro-active');
      document.body.style.overflow = '';
    };
    if (prefersReduced) { done(); return; }
    overlay.addEventListener('transitionend', done, { once: true });
    setTimeout(done, 1300);
  }

  overlay.addEventListener('click', exitIntro);
  overlay.addEventListener('touchstart', exitIntro, { passive: true });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') exitIntro();
  });

})();
