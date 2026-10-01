(() => {
  const body = document.body;
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('.site-nav');
  const navLinks = [...document.querySelectorAll('.site-nav a')];
  const mobileQuery = window.matchMedia('(max-width: 820px)');
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const activeAnimations = new Set();
  const animate = (element, frames, options = {}) => {
    if (!element || motionQuery.matches || !element.animate) return;
    const animation = element.animate(frames, {
      duration: 650, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', ...options
    });
    activeAnimations.add(animation);
    animation.finished.catch(() => {}).finally(() => activeAnimations.delete(animation));
  };

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
    if (menuButton.getAttribute('aria-expanded') !== 'true') return;
    if (event.key === 'Escape') {
      setMenu(false);
      menuButton.focus();
    }
    if (event.key === 'Tab') {
      const focusable = [menuButton, ...navLinks];
      const current = focusable.indexOf(document.activeElement);
      event.preventDefault();
      focusable[(current + (event.shiftKey ? -1 : 1) + focusable.length) % focusable.length].focus();
    }
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

  // Content remains visible without JavaScript or when animations are cancelled.
  document.querySelectorAll('.hero h1 span').forEach((line, index) => {
    const rotation = line.classList.contains('hero-bar') ? ' rotate(-5deg)' : '';
    animate(line, [
      { transform: `translateX(-48px) skewX(-8deg)${rotation}`, opacity: 0.25 },
      { transform: `translateX(0) skewX(0)${rotation}`, opacity: 1 }
    ], { duration: 800, delay: index * 100 });
  });
  animate(document.querySelector('.hero-frame'), [
    { clipPath: 'inset(0 0 0 100%)', transform: 'scale(1.05)' },
    { clipPath: 'inset(0 0 0 0)', transform: 'scale(1)' }
  ], { duration: 900 });

  const entranceObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const target = entry.target;
      if (target.classList.contains('look') || target.matches('.nail-art-image, .manifesto-art, .social-visual')) {
        animate(target.querySelector('img'), [
          { clipPath: 'inset(0 0 100% 0)', transform: 'scale(1.1)' },
          { clipPath: 'inset(0 0 0 0)', transform: 'scale(1)' }
        ], { duration: 950 });
      } else if (target.matches('.manifesto h2')) {
        [...target.children].forEach((word, index) => animate(word, [
          { transform: `translateX(${index % 2 ? 45 : -45}px)`, opacity: 0.3 },
          { transform: 'translateX(0)', opacity: 1 }
        ], { duration: 800, delay: index * 110 }));
      } else {
        animate(target, [
          { transform: 'translateX(-24px)', opacity: 0.5 },
          { transform: 'translateX(0)', opacity: 1 }
        ]);
      }
      observer.unobserve(target);
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.look, .nail-art-image, .manifesto-art, .social-visual, .manifesto h2, .nail-art h2, .final-cta h2').forEach((el) => entranceObserver.observe(el));

  const bands = [...document.querySelectorAll('.attitude-band')];
  const pausedBands = new Set();
  const updateMotion = () => {
    bands.forEach((band) => {
      const paused = pausedBands.has(band);
      const toggle = band.querySelector('.motion-toggle');
      band.classList.toggle('is-paused', paused || motionQuery.matches);
      toggle.hidden = motionQuery.matches;
      toggle.textContent = paused ? 'Animatie afspelen' : 'Animatie pauzeren';
      toggle.setAttribute('aria-pressed', String(paused));
    });
    if (motionQuery.matches) activeAnimations.forEach((animation) => animation.cancel());
    document.querySelectorAll('.look-open').forEach((el) => {
      el.style.removeProperty('--tilt-x');
      el.style.removeProperty('--tilt-y');
    });
  };
  motionQuery.addEventListener('change', updateMotion);
  updateMotion();
  const bandObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
    entry.target.classList.toggle('is-running', entry.isIntersecting);
  }));
  bands.forEach((band) => {
    band.querySelector('.motion-toggle').addEventListener('click', () => {
      if (pausedBands.has(band)) pausedBands.delete(band);
      else pausedBands.add(band);
      updateMotion();
    });
    bandObserver.observe(band);
  });
  document.addEventListener('visibilitychange', () => {
    bands.forEach((band) => band.classList.toggle('is-background', document.hidden));
  });

  // Supplemental ring: keep the native cursor, disable all tracking on touch/reduced motion.
  const cursor = document.querySelector('.editorial-cursor');
  const cursorLabel = cursor.querySelector('span');
  let cursorFrame;
  const hideCursor = () => {
    cancelAnimationFrame(cursorFrame);
    cursor.classList.remove('is-visible', 'is-active');
  };
  document.addEventListener('pointermove', (event) => {
    if (!finePointer.matches || motionQuery.matches || mobileQuery.matches || event.pointerType === 'touch' || body.classList.contains('lookbook-open')) {
      hideCursor();
      return;
    }
    const link = event.target.closest?.('a, button');
    const { clientX, clientY } = event;
    cancelAnimationFrame(cursorFrame);
    cursorFrame = requestAnimationFrame(() => {
      cursor.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      cursor.classList.add('is-visible');
      cursor.classList.toggle('is-active', Boolean(link));
      cursorLabel.textContent = link ? (link.classList.contains('look-open') ? 'VIEW' : 'OPEN') : '';
    });
  }, { passive: true });
  document.documentElement.addEventListener('pointerleave', hideCursor);
  window.addEventListener('blur', hideCursor);
  document.addEventListener('keydown', hideCursor);

  // Only two decorative objects drift; no scroll hijacking or continuous render loop.
  const driftObjects = [...document.querySelectorAll('[data-drift]')];
  const visibleDrift = new Set();
  let driftFrame;
  const updateDrift = () => {
    driftFrame = undefined;
    if (motionQuery.matches || !finePointer.matches || mobileQuery.matches) return;
    const viewport = window.innerHeight;
    visibleDrift.forEach((object) => {
      const rect = object.parentElement.getBoundingClientRect();
      const offset = (viewport / 2 - rect.top - rect.height / 2) * Number(object.dataset.drift);
      object.style.setProperty('--drift', `${Math.max(-40, Math.min(40, offset)).toFixed(1)}px`);
    });
  };
  const queueDrift = () => { if (driftFrame === undefined) driftFrame = requestAnimationFrame(updateDrift); };
  const driftObserver = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) visibleDrift.add(target);
      else visibleDrift.delete(target);
    });
    queueDrift();
  }, { rootMargin: '80px' });
  driftObjects.forEach((object) => driftObserver.observe(object));
  window.addEventListener('scroll', queueDrift, { passive: true });
  const resetPointerMotion = () => {
    cancelAnimationFrame(cursorFrame);
    hideCursor();
    driftObjects.forEach((object) => object.style.removeProperty('--drift'));
    queueDrift();
  };
  [motionQuery, finePointer, mobileQuery].forEach((query) => query.addEventListener('change', resetPointerMotion));
  window.addEventListener('resize', queueDrift, { passive: true });

  // Load on demand and discard stale requests when moving quickly between rows.
  const preview = document.querySelector('[data-service-preview]');
  const previewCaption = preview.closest('figure').querySelector('figcaption');
  let previewRequest = 0;
  let previewAnimation;
  const selectService = async (item) => {
    const request = ++previewRequest;
    document.querySelectorAll('.service-item').forEach((row) => row.classList.toggle('is-selected', row === item));
    const src = `assets/images/${item.dataset.preview}`;
    if (preview.getAttribute('src') === src) return;
    const candidate = new Image();
    candidate.src = src;
    try { await candidate.decode(); } catch { return; }
    if (request !== previewRequest) return;
    previewAnimation?.cancel();
    preview.src = src;
    preview.alt = item.dataset.previewAlt;
    previewCaption.textContent = 'Nail art inspiratie by Fleeky Bar';
    if (!motionQuery.matches) {
      previewAnimation = preview.animate([
        { opacity: 0.35, transform: 'scale(1.06) translateX(12px)' },
        { opacity: 1, transform: 'scale(1) translateX(0)' }
      ], { duration: 400, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' });
      activeAnimations.add(previewAnimation);
      const current = previewAnimation;
      current.finished.catch(() => {}).finally(() => activeAnimations.delete(current));
    }
  };
  document.querySelectorAll('[data-preview]').forEach((item) => {
    item.addEventListener('pointerenter', () => { if (finePointer.matches) selectService(item); });
    item.addEventListener('focusin', () => selectService(item));
  });

  const looks = [...document.querySelectorAll('.look-open')];
  looks.forEach((link) => {
    let frame;
    link.addEventListener('pointermove', (event) => {
      if (motionQuery.matches || !finePointer.matches || mobileQuery.matches) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (motionQuery.matches || !finePointer.matches || mobileQuery.matches) return;
        const rect = link.getBoundingClientRect();
        link.style.setProperty('--tilt-x', `${((event.clientY - rect.top) / rect.height - 0.5) * -5}deg`);
        link.style.setProperty('--tilt-y', `${((event.clientX - rect.left) / rect.width - 0.5) * 5}deg`);
      });
    });
    const resetTilt = () => {
      cancelAnimationFrame(frame);
      link.style.removeProperty('--tilt-x');
      link.style.removeProperty('--tilt-y');
    };
    link.addEventListener('pointerleave', resetTilt);
    link.addEventListener('pointercancel', resetTilt);
  });

  const dialog = document.querySelector('.look-dialog');
  const fullImage = dialog.querySelector('.look-full');
  const caption = dialog.querySelector('.look-caption');
  let currentLook = 0;
  let opener;
  const showLook = (index) => {
    fullImage.getAnimations?.().forEach((animation) => animation.cancel());
    currentLook = (index + looks.length) % looks.length;
    const source = looks[currentLook].querySelector('img');
    fullImage.src = source.src;
    fullImage.alt = source.alt;
    caption.textContent = `${currentLook + 1} / ${looks.length} · ${source.alt}`;
    animate(fullImage, [{ opacity: 0.4, transform: 'translateX(12px)' }, { opacity: 1, transform: 'translateX(0)' }], { duration: 250 });
  };
  fullImage.addEventListener('error', () => { caption.textContent = 'Foto kon niet laden. Kies een andere foto.'; });
  looks.forEach((link, index) => link.addEventListener('click', (event) => {
    if (typeof dialog.showModal !== 'function' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    opener = link;
    showLook(index);
    dialog.showModal();
    body.classList.add('lookbook-open');
    hideCursor();
  }));
  dialog.querySelector('.look-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.look-prev').addEventListener('click', () => showLook(currentLook - 1));
  dialog.querySelector('.look-next').addEventListener('click', () => showLook(currentLook + 1));
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showLook(currentLook + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => {
    body.classList.remove('lookbook-open');
    opener?.focus({ preventScroll: true });
  });

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
