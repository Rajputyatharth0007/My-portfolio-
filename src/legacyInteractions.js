export function runLegacyInteractions() {
  const cleanups = [];
  const listen = (el, event, handler, options) => {
    if (!el) return;
    el.addEventListener(event, handler, options);
    cleanups.push(() => el.removeEventListener(event, handler, options));
  };

  const progress = document.getElementById('progress');
  const nav = document.getElementById('navlinks');
  const toggle = document.getElementById('toggle');
  const updateScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = (max > 0 ? window.scrollY / max * 100 : 0) + '%';
  };
  listen(window, 'scroll', updateScroll, { passive: true });
  updateScroll();
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  listen(toggle, 'click', () => {
    const open = nav?.classList.toggle('open') || false;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    toggle.textContent = open ? '×' : '☰';
  });
  nav?.querySelectorAll('a').forEach(a => listen(a, 'click', () => {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
    if (toggle) toggle.textContent = '☰';
  }));

  const reveals = [...document.querySelectorAll('.reveal')];
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
    reveals.forEach(el => observer.observe(el));
    cleanups.push(() => observer.disconnect());
  } else reveals.forEach(el => el.classList.add('in'));

  const filterButtons = [...document.querySelectorAll('.filter-btn')];
  const projects = [...document.querySelectorAll('.project')];
  filterButtons.forEach(button => listen(button, 'click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    projects.forEach(card => {
      card.hidden = filter !== 'all' && !card.dataset.category.split(' ').includes(filter);
      if (!card.hidden) card.classList.add('in');
    });
  }));

  const interestRows = [...document.querySelectorAll('.interest')];
  const toggleInterest = row => {
    const shouldOpen = row.getAttribute('aria-expanded') !== 'true';
    interestRows.forEach(item => item.setAttribute('aria-expanded', 'false'));
    row.setAttribute('aria-expanded', String(shouldOpen));
  };
  interestRows.forEach(row => {
    listen(row, 'click', () => toggleInterest(row));
    listen(row, 'keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleInterest(row);
      }
    });
  });

  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        nav?.querySelectorAll('a[href^="#"]').forEach(a => a.classList.toggle('active', a.hash === '#' + entry.target.id));
      }
    }), { rootMargin: '-28% 0px -60% 0px' });
    document.querySelectorAll('main section[id]').forEach(section => navObserver.observe(section));
    cleanups.push(() => navObserver.disconnect());
  }

  // Subtle pointer-following light is limited to project cards and disabled for reduced motion.
  const projectCards = [...document.querySelectorAll('#work .project')];
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    projectCards.forEach(card => {
      listen(card, 'pointermove', event => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--spot-x', (event.clientX - rect.left) + 'px');
        card.style.setProperty('--spot-y', (event.clientY - rect.top) + 'px');
      });
      listen(card, 'pointerleave', () => {
        card.style.removeProperty('--spot-x');
        card.style.removeProperty('--spot-y');
      });
    });
  }

  return () => cleanups.forEach(cleanup => cleanup());
}
