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

  // === ADD TO CALENDAR ===
  (function () {
    // "20260530" → "20260531"
    function nextCalDay(dateStr) {
      const y = +dateStr.slice(0, 4);
      const m = +dateStr.slice(4, 6) - 1;
      const d = +dateStr.slice(6, 8);
      const next = new Date(y, m, d + 1);
      return next.getFullYear().toString() +
        String(next.getMonth() + 1).padStart(2, '0') +
        String(next.getDate()).padStart(2, '0');
    }

    // "20260530" → "2026-05-30"
    function isoDate(dateStr) {
      return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`;
    }

    document.querySelectorAll('.cal-dropdown').forEach(details => {
      const title    = details.dataset.calTitle    || '';
      const date     = details.dataset.calDate     || '';
      const desc     = details.dataset.calDetails  || '';
      const location = details.dataset.calLocation || '';
      const ics      = details.dataset.calIcs      || '';
      const nextDay  = nextCalDay(date);

      // Google Calendar — dates param uses YYYYMMDD/YYYYMMDD, slash must not be encoded
      const googleUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE' +
        `&text=${encodeURIComponent(title)}` +
        `&dates=${date}/${nextDay}` +
        `&details=${encodeURIComponent(desc)}` +
        (location ? `&location=${encodeURIComponent(location)}` : '');

      // Outlook.com — all-day uses ISO date strings + allday=true
      const outlookParams = new URLSearchParams({
        subject: title,
        startdt: isoDate(date),
        enddt:   isoDate(date),
        allday:  'true',
        body:    desc,
      });
      if (location) outlookParams.set('location', location);
      const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?${outlookParams}`;

      const googleLink  = details.querySelector('.cal-dropdown__option--google');
      const outlookLink = details.querySelector('.cal-dropdown__option--outlook');
      const icsLink     = details.querySelector('.cal-dropdown__option--ics');

      if (googleLink)  googleLink.href  = googleUrl;
      if (outlookLink) outlookLink.href = outlookUrl;
      if (icsLink && ics) {
        icsLink.href = ics;
        icsLink.download = ics.split('/').pop();
      }

      // Close the dropdown after the user picks an option
      details.querySelectorAll('.cal-dropdown__option').forEach(opt => {
        opt.addEventListener('click', () => details.removeAttribute('open'));
      });
    });

    // Close any open calendar dropdown when clicking outside it
    document.addEventListener('click', e => {
      document.querySelectorAll('.cal-dropdown[open]').forEach(details => {
        if (!details.contains(e.target)) details.removeAttribute('open');
      });
    });
  })();

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
