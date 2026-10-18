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

  // Playable browser demo: X is the person, O is the minimax opponent.
  const cells = [...document.querySelectorAll('[data-cell]')];
  const status = document.getElementById('game-status');
  const reset = document.getElementById('reset-game');
  const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  let board = Array(9).fill('');
  let finished = false;
  const won = (state, mark) => wins.some(line => line.every(i => state[i] === mark));
  const empty = state => state.reduce((list, mark, i) => mark ? list : [...list, i], []);
  const evaluate = (state, depth) => won(state,'O') ? 10-depth : won(state,'X') ? depth-10 : 0;

  function minimax(state, depth, maximizing) {
    if (won(state,'O') || won(state,'X')) return evaluate(state,depth);
    const spaces = empty(state);
    if (!spaces.length) return 0;
    let best = maximizing ? -Infinity : Infinity;
    for (const i of spaces) {
      state[i] = maximizing ? 'O' : 'X';
      const value = minimax(state,depth+1,!maximizing);
      state[i] = '';
      best = maximizing ? Math.max(best,value) : Math.min(best,value);
    }
    return best;
  }
  function chooseMove() {
    let bestValue = -Infinity;
    let bestIndex = -1;
    for (const i of empty(board)) {
      board[i] = 'O';
      const value = minimax(board,0,false);
      board[i] = '';
      if (value > bestValue) { bestValue = value; bestIndex = i; }
    }
    return bestIndex;
  }
  function render(message) {
    cells.forEach((cell,i) => {
      cell.textContent = board[i];
      cell.classList.toggle('mark-x',board[i] === 'X');
      cell.classList.toggle('mark-o',board[i] === 'O');
      cell.disabled = finished || Boolean(board[i]);
    });
    if (status) status.textContent = message;
  }
  function finishIfNeeded() {
    if (won(board,'X')) { finished = true; render('You win — nice play.'); return true; }
    if (won(board,'O')) { finished = true; render('Minimax wins this round.'); return true; }
    if (!empty(board).length) { finished = true; render('Draw. Try another round.'); return true; }
    return false;
  }
  function playAI() {
    if (finished) return;
    const index = chooseMove();
    if (index >= 0) board[index] = 'O';
    if (!finishIfNeeded()) render('Minimax played O. Your move.');
  }
  cells.forEach(cell => listen(cell,'click',() => {
    const i = Number(cell.dataset.cell);
    if (finished || board[i]) return;
    board[i] = 'X';
    if (finishIfNeeded()) return;
    render('Minimax is choosing…');
    playAI();
  }));
  listen(reset,'click',() => { board = Array(9).fill(''); finished = false; render('Your move — you are X.'); });
  render('Your move — you are X.');

  return () => cleanups.forEach(cleanup => cleanup());
}
