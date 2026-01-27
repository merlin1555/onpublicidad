<div id="modal-contacto" class="modal" aria-hidden="true">
  <div class="modal__overlay js-close-modal" aria-hidden="true"></div>

  <div class="modal__panel" role="dialog" aria-modal="true" aria-labelledby="modal-marcas-title">
    <button class="modal__close js-close-modal" type="button" aria-label="Cerrar">×</button>

    <div class="contacto" id="contacto">
			<div class="section_header">
				<h2>Contacto</h2>
			</div>
			<form action="mailto:contacto@onpublicidad.cl" method="post" enctype="text/plain" class="contacto_form">
				
				<label for="nombre">Nombre</label>
				<input type="text" id="nombre" name="Nombre" required>

				<label for="email">Correo electrónico</label>
				<input type="email" id="email" name="Email" required>

				<label for="telefono">Teléfono</label>
				<input type="tel" id="telefono" name="Teléfono">

				<label for="mensaje">Mensaje</label>
				<textarea id="mensaje" name="Mensaje" rows="5" required></textarea>

				<button class="btn_ btn__primary" type="submit"><span>Enviar</span></button>

			</form>
	  </div>
  </div>
</div>