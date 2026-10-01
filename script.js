(() => {
  const body = document.body;
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('.site-nav');
  const navLinks = [...document.querySelectorAll('.site-nav a')];
  const mobileQuery = window.matchMedia('(max-width: 820px)');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const setMenu = (open) => {
    const shouldOpen = mobileQuery.matches && open;
    menuButton.setAttribute('aria-expanded', String(shouldOpen));
    menuButton.setAttribute('aria-label', shouldOpen ? 'Menu sluiten' : 'Menu openen');
    siteNav.classList.toggle('is-open', shouldOpen);
    siteNav.inert = mobileQuery.matches && !shouldOpen;
    body.classList.toggle('menu-open', shouldOpen);
  };

  setMenu(false);
  menuButton.addEventListener('click', () => {
    setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
  });
  navLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)));
  mobileQuery.addEventListener('change', () => setMenu(false));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
  });

  const hero = document.querySelector('.hero');
  if (header && hero) {
    const headerObserver = new IntersectionObserver(
      ([entry]) => header.classList.toggle('is-scrolled', !entry.isIntersecting),
      { rootMargin: '-72px 0px 0px', threshold: 0.9 }
    );
    headerObserver.observe(hero);
  }

  document.querySelectorAll('.price-toggle').forEach((toggle, index) => {
    const group = toggle.closest('.price-group');
    const content = group.querySelector('.price-content');
    const panelId = `price-panel-${index + 1}`;
    const expanded = toggle.getAttribute('aria-expanded') === 'true';

    content.id = panelId;
    content.setAttribute('aria-hidden', String(!expanded));
    toggle.setAttribute('aria-controls', panelId);

    toggle.addEventListener('click', () => {
      const isOpen = group.classList.contains('is-open');

      document.querySelectorAll('.price-group').forEach((item) => {
        item.classList.remove('is-open');
        item.querySelector('.price-toggle').setAttribute('aria-expanded', 'false');
        item.querySelector('.price-content').setAttribute('aria-hidden', 'true');
      });

      if (!isOpen) {
        group.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
        content.setAttribute('aria-hidden', 'false');
      }
    });
  });

  const revealItems = document.querySelectorAll('.reveal');
  if (reduceMotion) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    body.classList.add('motion-ready');
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  }

  const sections = [...document.querySelectorAll('main section[id]')];
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: '-34% 0px -58% 0px', threshold: 0 }
  );

  sections.forEach((section) => sectionObserver.observe(section));
})();
