const SmoothScroll = (seletor) => {
  const linksInternos = document.querySelectorAll(seletor);

  const scrollToSection = (event) => {
    event.preventDefault();
    const href = event.currentTarget.getAttribute('href');
    const section = document.querySelector(
      href.includes('/') ? href.replace('/', '').trim() : href
    );

    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  linksInternos.forEach((link) => {
    link.addEventListener('click', scrollToSection);
  });
};

SmoothScroll("a[href^='/#']");
