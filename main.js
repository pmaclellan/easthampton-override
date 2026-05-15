(function () {
  'use strict';

  const header = document.getElementById('site-header');
  const hero   = document.getElementById('hero');

  // === STICKY NAV: add shadow once hero scrolls out of view ===
  if (header && hero) {
    new IntersectionObserver(
      ([entry]) => header.classList.toggle('scrolled', !entry.isIntersecting),
      { threshold: 0.1 }
    ).observe(hero);
  }

  // === ACTIVE NAV LINK: highlight the link for the visible section ===
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          navLinks.forEach(l => l.classList.remove('active'));
          const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (active) active.classList.add('active');
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    sections.forEach(s => sectionObserver.observe(s));
  }

  // === MOBILE NAV TOGGLE ===
  const toggle     = document.querySelector('.nav-toggle');
  const navLinksEl = document.querySelector('.nav-links');

  if (toggle && navLinksEl) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      navLinksEl.classList.toggle('nav-links--open', !isOpen);
    });

    navLinksEl.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        navLinksEl.classList.remove('nav-links--open');
      });
    });

    document.addEventListener('click', (e) => {
      if (header && !header.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        navLinksEl.classList.remove('nav-links--open');
      }
    });
  }

  // === FAQ ACCORDION ===
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      const answer = btn.nextElementSibling;
      const icon   = btn.querySelector('.faq-icon');

      btn.setAttribute('aria-expanded', String(!isOpen));
      if (answer) answer.hidden = isOpen;
      if (icon)   icon.textContent = isOpen ? '+' : '−';
    });
  });

  // === MODAL TRIGGERS (department details + lawn sign) ===
  document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = document.getElementById(btn.dataset.modal);
      if (modal) modal.showModal();
    });
  });
  document.querySelectorAll('.dept-modal').forEach(modal => {
    modal.querySelector('.dept-modal__close')?.addEventListener('click', () => modal.close());
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.close(); });
  });

  // === COPY LINK BUTTON ===
  const copyBtn = document.querySelector('.btn-copy-link');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const original = copyBtn.textContent;
      try {
        await navigator.clipboard.writeText(window.location.href);
      } catch {
        const inp = document.createElement('input');
        inp.value = window.location.href;
        document.body.appendChild(inp);
        inp.select();
        document.execCommand('copy');
        document.body.removeChild(inp);
      }
      copyBtn.textContent = 'Copied!';
      setTimeout(() => { copyBtn.textContent = original; }, 2000);
    });
  }

})();
