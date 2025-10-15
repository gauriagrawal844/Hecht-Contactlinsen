(() => {
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('drawer-overlay');
  const openBtn = document.querySelector('.hamburger-btn');
  const closeBtn = document.querySelector('.drawer-close');
  const focusableSelectors = 'a[href], button:not([disabled])';
  let lastFocused = null;

  if (!drawer || !overlay || !openBtn || !closeBtn) return;

  const setAria = (open) => {
    openBtn.setAttribute('aria-expanded', String(open));
    drawer.setAttribute('aria-hidden', String(!open));
  };

  const openDrawer = () => {
    lastFocused = document.activeElement;
    drawer.classList.add('open');
    overlay.hidden = false;
    document.body.classList.add('no-scroll');
    setAria(true);
    const firstLink = drawer.querySelector(focusableSelectors);
    if (firstLink) firstLink.focus();
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    overlay.hidden = true;
    document.body.classList.remove('no-scroll');
    setAria(false);
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    } else {
      openBtn.focus();
    }
  };

  openBtn.addEventListener('click', openDrawer);
  closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  // Close on Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      e.preventDefault();
      closeDrawer();
    }
  });

  // Optional: close after navigating within drawer
  drawer.addEventListener('click', (e) => {
    const target = e.target;
    if (target.matches('a[href]')) {
      closeDrawer();
    }
  });
})();
