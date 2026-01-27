<section class="call_action" id="contacto">
    <div class="section_container">
        <div class="call_action_card">
            <div class="call_action_info">
                <h2>¿Tienes un Pedido Especial?</h2>
                <p>¡Contáctanos, cuéntanos tu proyecto y hagámoslo realidad!</p>
                <button class="js-open-modal btn_ btn__primary" data-modal="modal-contacto" type="button"><span>Contacto</span></button>
            </div>
            <div class="call_action_visor">
                <model-viewer
                    id="visor-ventajas"
                    src="assets/3d/peach_ssbb.glb"
                    ios-src="assets/3d/peach_ssbb.usdz"
                    disable-zoom
                    camera-controls
                    autoplay
                    animation-loop
                    interaction-prompt="none"

                    camera-orbit="0deg 80deg 150%"
                    min-camera-orbit="-Infinity 80deg auto"
                    max-camera-orbit="Infinity 80deg auto"

                    style="width:100%;height:40vh">
                    <button slot="ar-button" aria-hidden="true" style="display:none"></button>
                </model-viewer>
            </div>
        </div>
    </div>
</section>