// FORMULARIO DE CONTACTO CON FORMSPREE
document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formulario-contacto');
    const botonEnviar = document.getElementById('boton-enviar');
    const mensajeEstado = document.getElementById('mensaje-estado');
    
    if (!formulario) return;
    
    // Obtener textos localizados
    function getTexto(clave) {
        const elementos = document.querySelectorAll(`[data-i18n="${clave}"]`);
        return elementos.length > 0 ? elementos[0].textContent : clave;
    }
    
    formulario.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Deshabilitar botón y mostrar "enviando"
        const textoOriginal = botonEnviar.textContent;
        botonEnviar.textContent = 'Enviando...';
        botonEnviar.disabled = true;
        mensajeEstado.style.display = 'none';
        
        try {
            const response = await fetch(formulario.action, {
                method: 'POST',
                body: new FormData(formulario),
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Éxito
                mostrarMensaje(getTexto('mensajeExito'), 'exito');
                formulario.reset();
            } else {
                // Error de Formspree
                const data = await response.json();
                throw new Error(data.error || 'Error en el envío');
            }
            
        } catch (error) {
            // Error de red o otro error
            console.error('Error:', error);
            mostrarMensaje(getTexto('mensajeError'), 'error');
        } finally {
            // Restaurar botón después de 3 segundos
            setTimeout(() => {
                botonEnviar.textContent = textoOriginal;
                botonEnviar.disabled = false;
            }, 3000);
        }
    });
    
    function mostrarMensaje(texto, tipo) {
        mensajeEstado.textContent = texto;
        mensajeEstado.style.display = 'block';
        mensajeEstado.style.color = tipo === 'exito' ? 'var(--color-secundario)' : '#ff6b6b';
        
        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
            mensajeEstado.style.display = 'none';
        }, 5000);
    }
});