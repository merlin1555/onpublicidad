  (function(){
    const main = document.getElementById('site_nav_main');
    const clone = document.getElementById('site_nav_clone');

    if (!main || !clone) return;

    const showClone = () => {
      clone.classList.add('is-visible');
      clone.setAttribute('aria-hidden', 'false');
    };

    const hideClone = () => {
      clone.classList.remove('is-visible');
      clone.setAttribute('aria-hidden', 'true');
    };

    // Si el menú principal está visible -> oculto clon
    // Si el menú principal deja de intersectar (sale de pantalla) -> muestro clon
    const io = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) hideClone();
      else showClone();
    }, {
      root: null,
      threshold: 0.01
    });

    io.observe(main);
  })();