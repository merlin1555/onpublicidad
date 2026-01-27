(() => {
  const viewer = document.querySelector('#visor-ventajas');
  const btnPrev = document.querySelector('.visor_prev');
  const btnNext = document.querySelector('.visor_next');

  if (!viewer || !btnPrev || !btnNext) return;

  const models = [
    {
      glb: 'assets/3d/togepi_smash_bros_ultimate.glb',
      usdz: 'assets/3d/togepi_smash_bros_ultimate.usdz',
      orbit: '25deg 75deg 150%'
    },
    {
      glb: 'assets/3d/peach_ssbb.glb',
      usdz: 'assets/3d/peach_ssbb.usdz',
      orbit: '25deg 75deg 150%'
    },
    {
      glb: 'assets/3d/book_of_Constellations.glb',
      usdz: 'assets/3d/book_of_Constellations.usdz',
      orbit: '110deg 35deg 100%'
    },
  ];

  let index = Math.max(
    0,
    models.findIndex(m => m.glb === viewer.getAttribute('src'))
  );

  let pendingCamera = null;

  function applyCamera(preset) {
    if (!preset) return;

    // IMPORTANTE: usar propiedades (más confiable que setAttribute)
    if (preset.orbit) viewer.cameraOrbit = preset.orbit;
    if (preset.target) viewer.cameraTarget = preset.target;

    // Fuerza a model-viewer a “saltar” a ese objetivo (evita que quede con la cámara anterior)
    if (typeof viewer.jumpCameraToGoal === 'function') {
      viewer.jumpCameraToGoal();
    }
  }

  function setModel(i) {
    index = (i + models.length) % models.length;
    const m = models[index];

    // Guarda el preset para aplicarlo cuando el modelo termine de cargar
    pendingCamera = { orbit: m.orbit, target: m.target };

    // Cambia modelo
    viewer.setAttribute('src', m.glb);

    // iOS
    if (m.usdz) viewer.setAttribute('ios-src', m.usdz);
    else viewer.removeAttribute('ios-src');

    // Reinicia anim (opcional)
    viewer.currentTime = 0;
    viewer.play?.();
  }

  // Cuando el modelo carga, aplicamos su cámara
  viewer.addEventListener('load', () => {
    applyCamera(pendingCamera);
  });

  // Botones
  btnPrev.addEventListener('click', () => setModel(index - 1));
  btnNext.addEventListener('click', () => setModel(index + 1));

  // Teclado (opcional)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') setModel(index - 1);
    if (e.key === 'ArrowRight') setModel(index + 1);
  });

  // Aplica cámara inicial (por si quitaste camera-orbit del HTML)
  pendingCamera = { orbit: models[index]?.orbit, target: models[index]?.target };
  // Si ya está cargado, fuerza igual:
  queueMicrotask(() => applyCamera(pendingCamera));
})();
