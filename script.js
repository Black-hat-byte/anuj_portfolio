/* ══════════════════════════════════════
   ANUJ PRATAP MAURYA — PORTFOLIO SCRIPTS
   ══════════════════════════════════════ */

/* ── Custom Cursor ── */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

function animCursor() {
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
  rx += (mx - rx) * 0.14;
  ry += (my - ry) * 0.14;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animCursor);
}
animCursor();

/* ── Navbar Scroll Effect ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── Typewriter Effect ── */
const roles = ['Full Stack Developer', 'AI/ML Enthusiast', 'TypeScript Developer', 'Always Learning, Always Building 🔥'];
let ri = 0, ci = 0, deleting = false;
const tw = document.getElementById('typewriter');

function type() {
  const role = roles[ri];
  if (!deleting) {
    tw.textContent = role.slice(0, ++ci);
    if (ci === role.length) {
      deleting = true;
      return setTimeout(type, 1800);
    }
    setTimeout(type, 68);
  } else {
    tw.textContent = role.slice(0, --ci);
    if (ci === 0) {
      deleting = false;
      ri = (ri + 1) % roles.length;
    }
    setTimeout(type, 38);
  }
}
type();

/* ── Scroll Reveal ── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ── Tilt Effect on Code Card ── */
const codeCard = document.querySelector('.code-card-inner');
if (codeCard) {
  codeCard.addEventListener('mousemove', e => {
    const rect = codeCard.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    codeCard.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
    codeCard.style.boxShadow = `${-x * 20}px ${-y * 20}px 60px rgba(251,146,60,0.12), 0 30px 60px rgba(0,0,0,0.5)`;
  });

  codeCard.addEventListener('mouseleave', () => {
    codeCard.style.transform = '';
    codeCard.style.boxShadow = '';
  });
}

/* ── Stat Counter Animation ── */
function animateCounter(el, target, suffix = '', decimals = 0) {
  let start = 0;
  const step = target / 50;
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = decimals ? start.toFixed(decimals) + suffix : Math.floor(start) + suffix;
    if (start >= target) clearInterval(timer);
  }, 30);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const statVals = e.target.querySelectorAll('.stat-val');
      const data = [
        { val: 1, suffix: '' },
        { val: 7.53, suffix: '', dec: 2 },
        { val: 7, suffix: '+' }
      ];
      statVals.forEach((el, i) => animateCounter(el, data[i].val, data[i].suffix, data[i].dec || 0));
      statsObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);
