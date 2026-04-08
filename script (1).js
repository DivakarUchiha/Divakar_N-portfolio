/* ============================================
   DIVAKAR NATARAJAN — PORTFOLIO JAVASCRIPT
   ============================================ */

// ── CUSTOM CURSOR ──
const cursor = document.getElementById('cursor');
const trail  = document.getElementById('cursorTrail');
let mx = 0, my = 0, tx = 0, ty = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
});

// Smooth trailing cursor
function animateTrail() {
  tx += (mx - tx) * 0.12;
  ty += (my - ty) * 0.12;
  trail.style.transform = `translate(${tx}px, ${ty}px) translate(-50%,-50%)`;
  requestAnimationFrame(animateTrail);
}
animateTrail();

// Cursor scale on interactive elements
document.querySelectorAll('a, button, input, textarea').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('active'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

// ── NAVBAR SCROLL EFFECT ──
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Scrolled state
  navbar.classList.toggle('scrolled', window.scrollY > 60);

  // Active link highlighting
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});

// ── MOBILE NAV TOGGLE ──
const navToggle = document.getElementById('navToggle');
const navLinksEl = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinksEl.classList.toggle('open');
});

// Close nav on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinksEl.classList.remove('open');
  });
});

// ── TYPED TEXT ANIMATION ──
const phrases = [
  'Hybrid Cloud Infrastructure Engineer',
  'Azure IaaS Specialist',
  'Windows Server Administrator',
  'VMware vSphere Engineer',
  'Disaster Recovery Expert',
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typedText');

function type() {
  const phrase = phrases[phraseIdx];
  if (!deleting) {
    typedEl.textContent = phrase.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === phrase.length) {
      setTimeout(() => { deleting = true; type(); }, 2000);
      return;
    }
  } else {
    typedEl.textContent = phrase.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 40 : 65);
}
setTimeout(type, 1000);

// ── COUNTER ANIMATION ──
function animateCounter(el, target, duration = 1600) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = Math.round(start);
    if (start >= target) clearInterval(timer);
  }, 16);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      animateCounter(el, parseInt(el.dataset.target));
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

// ── SKILL BARS ANIMATION ──
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach((bar, i) => {
        setTimeout(() => {
          bar.style.width = bar.dataset.w + '%';
        }, i * 120);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-category').forEach(el => skillObserver.observe(el));

// ── SCROLL REVEAL ──
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = (i % 3) * 0.1 + 's';
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// Add reveal class to key elements and observe
const revealTargets = [
  '.about-card', '.skill-category', '.project-card',
  '.cert-card', '.timeline-content', '.contact-card',
  '.contact-form', '.achievements-banner'
];
revealTargets.forEach(sel => {
  document.querySelectorAll(sel).forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });
});

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── CONTACT FORM ──
const form = document.getElementById('contactForm');
form?.addEventListener('submit', e => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  const original = btn.textContent;
  btn.textContent = '✓ Message Sent!';
  btn.style.background = 'var(--accent-2)';
  btn.style.color = 'var(--bg)';
  btn.style.borderColor = 'var(--accent-2)';
  form.reset();
  setTimeout(() => {
    btn.textContent = original;
    btn.style.background = '';
    btn.style.color = '';
    btn.style.borderColor = '';
  }, 3000);
});

// ── HERO GRID PARALLAX ──
document.addEventListener('mousemove', e => {
  const grid = document.querySelector('.hero-grid-lines');
  if (!grid) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  grid.style.transform = `translate(${x}px, ${y}px)`;
});

// ── AVATAR RING SPEED VARIATION ──
// Subtle hover speed-up on hero visual
const heroVisual = document.querySelector('.hero-visual');
if (heroVisual) {
  heroVisual.addEventListener('mouseenter', () => {
    document.querySelectorAll('.avatar-ring').forEach(ring => {
      ring.style.animationDuration = parseFloat(getComputedStyle(ring).animationDuration) / 2 + 's';
    });
  });
  heroVisual.addEventListener('mouseleave', () => {
    const durations = ['12s', '20s', '30s'];
    document.querySelectorAll('.avatar-ring').forEach((ring, i) => {
      ring.style.animationDuration = durations[i];
    });
  });
}

// ── PAGE LOAD ANIMATION ──
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});
