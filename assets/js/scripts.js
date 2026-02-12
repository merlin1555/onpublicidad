// modales de los formularios
(() => {
  let currentModal = null;

  const lockScroll = () => {
    // ancho de la scrollbar (si no hay, da 0)
    const sbw = window.innerWidth - document.documentElement.clientWidth;

    document.documentElement.style.setProperty("--sbw", `${sbw}px`);
    document.documentElement.classList.add("modal-open");
  };

  const unlockScroll = () => {
    document.documentElement.classList.remove("modal-open");
    document.documentElement.style.removeProperty("--sbw");
  };

  const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    currentModal = modal;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");

    lockScroll();
  };

  const closeModal = (modal) => {
    if (!modal) return;

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");

    if (currentModal === modal) currentModal = null;

    // ⏱ esperar que termine la animación antes de liberar scrollbar
    setTimeout(() => {
      if (!document.querySelector(".modal.is-open")) {
        unlockScroll();
      }
    }, 220); // mismo tiempo que el CSS
  };

  // Abrir (botón puede estar en cualquier parte del DOM)
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".js-open-modal");
    if (!btn) return;
    openModal(btn.dataset.modal);
  });

  // Cerrar (overlay o botón X)
  document.addEventListener("click", (e) => {
    const closeEl = e.target.closest(".js-close-modal");
    if (!closeEl) return;
    closeModal(closeEl.closest(".modal"));
  });

  // ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && currentModal) closeModal(currentModal);
  });
})();

document.addEventListener("DOMContentLoaded", function () {

    const triggerSection = document.querySelector("#servicios");
    const floatingBox = document.querySelector(".floating-box");
    const cloneNav = document.querySelector("#site_nav_clone");

    if (!triggerSection || !floatingBox || !cloneNav) return;

    function updateFloatingPosition() {
        const navHeight = cloneNav.offsetHeight;
        floatingBox.style.top = navHeight + "px";
    }

    updateFloatingPosition();
    window.addEventListener("resize", updateFloatingPosition);

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
                floatingBox.classList.add("active");
            } else {
                floatingBox.classList.remove("active");
            }

        });

    }, { threshold: 0 });

    observer.observe(triggerSection);

});

document.addEventListener("DOMContentLoaded", () => {

  const links = document.querySelectorAll(".floating-box_nav a");

  const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if(entry.isIntersecting){

        const id = entry.target.id;

        links.forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${id}`
          );
        });

      }

    });

  }, {
    rootMargin: "-40% 0px -40% 0px"
  });

  document.querySelectorAll("section[id]").forEach(section => {
    observer.observe(section);
  });

});
