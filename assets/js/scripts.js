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
