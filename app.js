  const menu = document.getElementById('mobileMenu');
  document.getElementById('openMenu').addEventListener('click', () => menu.classList.add('active'));
  document.getElementById('closeMenu').addEventListener('click', () => menu.classList.remove('active'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('active')));

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));