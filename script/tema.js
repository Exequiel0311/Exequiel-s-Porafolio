// Sistema de tema oscuro/claro
class GestorTema {
    constructor() {
        this.temaActual = localStorage.getItem('tema') || 'claro';
        this.inicializar();
    }
    
    inicializar() {
        this.aplicarTema(this.temaActual);
        this.agregarEventos();
    }
    
    aplicarTema(tema) {
        this.temaActual = tema;
        localStorage.setItem('tema', tema);
        
        document.documentElement.setAttribute('data-tema', tema);
        
        // Actualizar icono
        const iconoTema = document.querySelector('#boton-tema i');
        iconoTema.className = tema === 'oscuro' ? 'bx bx-sun' : 'bx bx-moon';
    }
    
    alternarTema() {
        const nuevotema = this.temaActual === 'claro' ? 'oscuro' : 'claro';
        this.aplicarTema(nuevotema);
    }
    
    agregarEventos() {
        document.getElementById('boton-tema').addEventListener('click', () => {
            this.alternarTema();
        });
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    new GestorTema();
});