// SMOOTH SCROLL for internal anchor links (nav + brand)
document.addEventListener('DOMContentLoaded', function () {
  // existing nav toggle code (keeps what you already have)
  const navToggle = document.getElementById('navToggle');
  const primaryNav = document.getElementById('primaryNav');
  const navList = primaryNav?.querySelector('.nav-list');
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isExpanded));
      navList.classList.toggle('show');
    });
    navList.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navList.classList.remove('show');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Smooth-scroll handler for all internal links that start with '#'
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      // allow normal behavior for links that are only '#'
      const hash = this.getAttribute('href');
      if (!hash || hash === '#') return;

      // find target element
      const target = document.querySelector(hash);
      if (target) {
        e.preventDefault();
        // close mobile nav if open (optional)
        if (navList && navList.classList.contains('show')) {
          navList.classList.remove('show');
          navToggle?.setAttribute('aria-expanded', 'false');
        }
        // offset for sticky header: compute header height
        const header = document.querySelector('.site-header');
        const headerHeight = header ? header.getBoundingClientRect().height : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 8; // small gap

        window.scrollTo({
          top,
          behavior: 'smooth'
        });
      }
    });
  });

  // optional: make clicking brand scroll to top if href="#about" missing
  const homeBtn = document.getElementById('homeBtn');
  if (homeBtn && homeBtn.getAttribute('href') === '#') {
    homeBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // keep the year fill (if present)
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
