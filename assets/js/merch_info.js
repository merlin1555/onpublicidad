(function () {
  const cards = document.querySelectorAll(".merchinfo_card");

  function closeDropdown(dropdown, btn) {
    dropdown.style.height = dropdown.scrollHeight + "px";
    // Forzamos reflow para que tome el height anterior antes de colapsar
    dropdown.offsetHeight;
    dropdown.style.height = "0px";
    dropdown.setAttribute("aria-hidden", "true");
    btn.setAttribute("aria-expanded", "false");
  }

  function openDropdown(dropdown, btn) {
    dropdown.style.height = dropdown.scrollHeight + "px";
    dropdown.setAttribute("aria-hidden", "false");
    btn.setAttribute("aria-expanded", "true");

    // Al terminar la animación, dejamos height en auto para que crezca si el contenido cambia
    const onEnd = (e) => {
      if (e.propertyName !== "height") return;
      if (btn.getAttribute("aria-expanded") === "true") {
        dropdown.style.height = "auto";
      }
      dropdown.removeEventListener("transitionend", onEnd);
    };
    dropdown.addEventListener("transitionend", onEnd);
  }

  cards.forEach((card, index) => {
    const btn = card.querySelector(".js-dropdown-toggle");
    const dropdown = card.querySelector(".merchinfocard_dropdown");
    if (!btn || !dropdown) return;

    // IDs opcionales para accesibilidad (recomendado)
    const dropdownId = dropdown.id || `dropdown-${index + 1}`;
    dropdown.id = dropdownId;
    btn.setAttribute("aria-controls", dropdownId);

    // Inicial: cerrado
    dropdown.style.height = "0px";
    dropdown.setAttribute("aria-hidden", "true");
    btn.setAttribute("aria-expanded", "false");

    btn.addEventListener("click", () => {
      const isOpen = btn.getAttribute("aria-expanded") === "true";

      // Si estaba en auto, lo fijamos a px antes de colapsar para animar bien
      if (dropdown.style.height === "auto") {
        dropdown.style.height = dropdown.scrollHeight + "px";
        dropdown.offsetHeight;
      }

      if (isOpen) closeDropdown(dropdown, btn);
      else openDropdown(dropdown, btn);
    });
  });

  // Extra útil: si cambia el tamaño (responsive) y hay dropdowns abiertos,
  // recalcula alturas para que no queden cortados.
  window.addEventListener("resize", () => {
    document.querySelectorAll(".js-dropdown-toggle[aria-expanded='true']").forEach((btn) => {
      const card = btn.closest(".merchinfo_card");
      const dropdown = card?.querySelector(".merchinfocard_dropdown");
      if (!dropdown) return;

      dropdown.style.height = "auto";
      // Si quieres mantener animación y ajustar “justo”, usa:
      // dropdown.style.height = dropdown.scrollHeight + "px";
    });
  });
})();
