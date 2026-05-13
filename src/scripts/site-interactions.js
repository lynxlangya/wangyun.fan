const root = document.documentElement;
const mq = window.matchMedia('(prefers-color-scheme: dark)');

const menuButton = document.getElementById('menuBtn');
const menuOverlay = document.getElementById('menuOverlay');
const menuLabel = document.getElementById('menuLabel');

function openMenu() {
  if (!menuButton || !menuLabel) return;
  root.classList.add('menu-open');
  menuButton.setAttribute('aria-expanded', 'true');
  menuLabel.textContent = 'close';
}

function closeMenu() {
  if (!menuButton || !menuLabel) return;
  root.classList.remove('menu-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuLabel.textContent = 'menu';
}

if (menuButton && menuOverlay) {
  menuButton.addEventListener('click', () => {
    root.classList.contains('menu-open') ? closeMenu() : openMenu();
  });

  menuOverlay.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const link = target.closest('a[data-close]');
    if (link) {
      closeMenu();
      return;
    }
    if (target === menuOverlay) closeMenu();
  });
}

const themeName = document.getElementById('themeName');
const themeLabels = { auto: 'AUTO', light: 'LIGHT', dark: 'DARK' };

function applyTheme(theme, persist = true) {
  if (!['auto', 'light', 'dark'].includes(theme)) theme = 'auto';
  root.setAttribute('data-theme', theme);

  const effective = theme === 'auto' ? (mq.matches ? 'dark' : 'light') : theme;
  root.setAttribute('data-effective', effective);

  if (themeName) themeName.textContent = themeLabels[theme];
  document.querySelectorAll('.sw').forEach((swatch) => {
    swatch.setAttribute('aria-pressed', swatch.dataset.themeBtn === theme ? 'true' : 'false');
  });

  if (persist) {
    try {
      localStorage.setItem('wf.theme', theme);
    } catch (error) {}
  }
}

applyTheme(root.getAttribute('data-theme') || 'auto', false);

document.querySelectorAll('.sw').forEach((swatch) => {
  swatch.addEventListener('click', () => applyTheme(swatch.dataset.themeBtn));
});

if (mq.addEventListener) {
  mq.addEventListener('change', () => {
    if ((root.getAttribute('data-theme') || 'auto') === 'auto') applyTheme('auto', false);
  });
}

const status = document.getElementById('status');
const statusText = document.getElementById('statusText');
const statusMessages = ['在杭州 · 欢迎喝茶', '回复邮件中 · 稍后回来', 'Building...'];
let statusIndex = 0;

if (status && statusText) {
  status.addEventListener('click', () => {
    statusIndex = (statusIndex + 1) % statusMessages.length;
    statusText.style.opacity = '0';
    setTimeout(() => {
      statusText.textContent = statusMessages[statusIndex];
      statusText.style.opacity = '';
    }, 160);
  });
  statusText.style.transition = 'opacity .2s ease';
}

document.addEventListener('keydown', (event) => {
  const target = event.target;
  if (target instanceof HTMLElement && target.matches('input,textarea,[contenteditable]')) return;

  if (event.key === 'Escape' && root.classList.contains('menu-open')) {
    closeMenu();
  } else if (event.key === 'm' || event.key === 'M') {
    root.classList.contains('menu-open') ? closeMenu() : openMenu();
  } else if (event.key === 't' || event.key === 'T') {
    const current = root.getAttribute('data-theme') || 'auto';
    const next = current === 'auto' ? 'light' : current === 'light' ? 'dark' : 'auto';
    applyTheme(next);
  }
});
